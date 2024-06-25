"use client";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { fetchMessages, createMessage, notifyTyping } from "../../lib/actions/message.actions";
import { useUser } from "@clerk/nextjs";
import { SendHorizontal } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import pusherClient from "@/pusher/pusherClient";
import { PulsatingCircle } from "@/components/PulsatingCircle";
import useActiveList from "@/hooks/useActiveList";
import { getAllUsers } from "@/lib/actions/user.actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Message {
  senderId: string;
  text: string;
  reaction?: string;
}

const Inbox: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [inboxUsers, setInboxUsers] = useState<any[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const { user: loggedInUser } = useUser();
  const User = useUser().user;

  const { members } = useActiveList();
  const [otherUserTyping, setOtherUserTyping] = useState<boolean>(false); 

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const typingIndicatorRef = useRef<HTMLDivElement | null>(null); 
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTypingIndicator = () => {
    if (typingIndicatorRef.current) {
      typingIndicatorRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(scrollToBottom, [messages]);
  useEffect(scrollToTypingIndicator, [otherUserTyping]); 

  const handleResize = (_event: Event, sizes: number[]) => {
    setIsCollapsed(sizes[0] <= 5);
  };

  useEffect(() => {
    const getYourInboxUsers = async () => {
      const users = await getAllUsers();
      setInboxUsers(users);
    };
    if (loggedInUser) {
      getYourInboxUsers();
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (selectedUser && loggedInUser) {
      const channelName = `conversation-${loggedInUser.id}-${selectedUser.clerkId}`;
      const channel = pusherClient.subscribe(channelName);

      const handleMessage = (message: Message) => {
        // Prevent duplicate messages for the sender
        if (message.senderId !== loggedInUser.id) {
          setMessages((prevMessages) => [...prevMessages, message]);
        }
      };

      const handleTypingEvent = (data: { senderId: string; status: string }) => {
        if (data.senderId !== loggedInUser?.id) {
          setOtherUserTyping(data.status === 'typing');
        }
      };

      channel.bind("new-message", handleMessage);
      channel.bind("typing", handleTypingEvent);

      return () => {
        channel.unbind("new-message", handleMessage);
        channel.unbind("typing", handleTypingEvent);
        pusherClient.unsubscribe(channelName);
      };
    }
  }, [selectedUser, loggedInUser]);

  const handleUserClick = async (user: any) => {
    setSelectedUser(user);
    if (loggedInUser && user) {
      const fetchedMessages = await fetchMessages(loggedInUser.id, user.clerkId);
      setMessages(fetchedMessages || []);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() !== "") {
      const senderId = loggedInUser?.id;
      const receiverId = selectedUser?.clerkId;

      if (senderId && receiverId) {
        const message = { senderId, text: newMessage.trim() };
        setMessages((prevMessages) => [...prevMessages, message]);
        setNewMessage("");

        await createMessage(senderId, receiverId, newMessage.trim());
        await notifyTyping(senderId, receiverId, 'stopped'); 
      }
    }
  };

  const triggerTypingEvent = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    if (loggedInUser && selectedUser) {
      const senderId = loggedInUser.id;
      const receiverId = selectedUser.clerkId;

      await notifyTyping(senderId, receiverId, 'typing');

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      typingTimeoutRef.current = setTimeout(async () => {
        await notifyTyping(senderId, receiverId, 'stopped'); 
      }, 3000);
    }
  };

  return (
    <>
      <ResizablePanelGroup
        direction="horizontal"
        className="h-screen"
        onResize={handleResize as any}
      >
        <ResizablePanel defaultSize={25} maxSize={50} minSize={0}>
          <div className={`flex flex-col h-full p-6 bg-white text-black ${isCollapsed ? "hidden" : "block"}`}>
            <h1>Available users within this course</h1>
            <div className="scroll-container w-full overflow-y-auto h-[calc(100vh-64px)] scrollbar-none">
              <ul className="flex flex-col items-start w-full">
                {inboxUsers.map((user) => {
                  const isUserActive = members.indexOf(user.clerkId) !== -1;
                  return (
                    <li
                      key={user.clerkId}
                      className={`py-4 cursor-pointer flex items-center w-full ${
                        selectedUser?.clerkId === user.clerkId ? "bg-gray-200" : ""
                      }`}
                      onClick={() => handleUserClick(user)}
                    >
                      <div className={`relative flex items-center w-full`}>
                        <div className={`flex-none w-10 h-10 rounded-full overflow-visible ${selectedUser?.clerkId === user.clerkId ? "shadow-lg" : ""}`}>
                          <img
                            src={user.photo}
                            alt={user.username}
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                        <div className="ml-4 flex flex-col flex-grow">
                          <span className="text-sm font-semibold">{user.firstName} {user.lastName}</span>
                          {loggedInUser?.id === user.clerkId && (
                            <span className="text-xs text-gray-500">(You)</span>
                          )}
                        </div>
                        {isUserActive && (
                          <div className="absolute -top-1 -right-2">
                            <PulsatingCircle />
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75} minSize={50} maxSize={100}>
          <div className="flex flex-col h-full p-6 bg-white text-black">
            {!selectedUser && (
              <p className="text-lg mb-4 font-serif text-center mt-[300px]">Select a chat to start messaging</p>
            )}
            {selectedUser && (
              <div className="scroll-container flex flex-col w-full overflow-y-auto h-[calc(100vh-64px)] scrollbar-none">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`message p-2.5 rounded-lg max-w-[70%] mb-2.5 flex flex-col relative cursor-pointer ${
                      message.senderId === loggedInUser?.id ? "bg-blue-500 text-white self-end" : "bg-gray-200 text-black self-start"
                    }`}
                  >
                    {message.senderId !== loggedInUser?.id && (
                      <span className="sender text-sm font-bold mb-1">{selectedUser?.username}</span>
                    )}
                    {message.text}
                    {message.reaction && (
                      <div className="emoji-icon">
                        {message.reaction}
                      </div>
                    )}
                  </div>
                ))}
                {otherUserTyping && (
                  <div className="typing-indicator flex items-center py-2.5" ref={typingIndicatorRef}>
                    <span className="w-2 h-2 bg-gray-400 rounded-full inline-block mx-0.5 animate-typing" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full inline-block mx-0.5 animate-typing animation-delay-200" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full inline-block mx-0.5 animate-typing animation-delay-400" />
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
            {selectedUser && (
              <form
                className="flex items-center mt-auto border-t border-gray-300 relative"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
              >
                <input
                  type="text"
                  value={newMessage}
                  onChange={triggerTypingEvent}
                  className="flex-1 px-4 py-2 bg-white text-black rounded-l-md"
                  placeholder="Send a message..."
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-black rounded-r-md bg-blue-500 hover:bg-blue-400"
                >
                  <SendHorizontal className="hover:text-gray-400" />
                </button>
              </form>
            )}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
      <div className="p-4 bg-white text-black">
        <Link href='/'>
          <Button>Back to dashboard</Button>
        </Link>
      </div>
    </>
  );
};

export default Inbox;

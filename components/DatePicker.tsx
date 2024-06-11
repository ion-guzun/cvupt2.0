import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";

type DatePickerProps = {
  onDateSelect: (date: Date | undefined) => void;
  type: 'start' | 'end' | 'deadline';
};

export const DatePicker = ({ onDateSelect, type }: DatePickerProps) => {
  const [date, setDate] = useState<Date | undefined>();

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    onDateSelect(newDate); // Call the callback to sync with the parent component
  };

  const getPlaceholderText = () => {
    switch (type) {
      case 'start':
        return 'Pick start date';
      case 'end':
        return 'Pick end date';
      case 'deadline':
        return 'Pick the deadline';
      default:
        return 'Pick date';
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{getPlaceholderText()}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={handleDateSelect} initialFocus />
      </PopoverContent>
    </Popover>
  );
};

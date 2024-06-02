import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { faculties } from "@/real_data";
import Image from "next/image";

type DropdownProps = {
  value?: string;
  onChangeHandler?: (value: string) => void;
  type: "faculty" | "speciality" | "year" | "semester";
  disabled?: boolean;
  selectedFaculty?: string;
  selectedSpeciality?: string;
};

export const Dropdown = ({
  onChangeHandler,
  value,
  type,
  disabled = false,
  selectedFaculty,
  selectedSpeciality,
}: DropdownProps) => {
  switch (type) {
    case "faculty":
      return (
        <Select onValueChange={onChangeHandler} defaultValue={value} disabled={disabled}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Faculty" />
          </SelectTrigger>
          <SelectContent>
            {faculties.map((faculty) => (
              <SelectItem key={faculty.name} value={faculty.name}>
                <div className="flex items-center">
                  <Image
                    src={`/${faculty.name.toLocaleLowerCase()}.png`}
                    alt=""
                    width={25}
                    height={25}
                  />
                  <p className="px-3">{faculty.name}</p>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    case "speciality":
      const specialities = faculties.find(faculty => faculty.name === selectedFaculty)?.specialities || [];
      return (
        <Select onValueChange={onChangeHandler} defaultValue={value} disabled={disabled}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Speciality" />
          </SelectTrigger>
          <SelectContent>
            {specialities.map((speciality) => (
              <SelectItem key={speciality} value={speciality}>
                {speciality}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    case "year":
      let years: number[] = [];
      if (selectedSpeciality) {
        if (selectedSpeciality === "Informatica") {
          years = [1, 2, 3];
        } else if (selectedSpeciality === "Arhitectura") {
          years = [1, 2, 3, 4, 5, 6];
        } else {
          years = [1, 2, 3, 4];
        }
      }
      return (
        <Select onValueChange={onChangeHandler} defaultValue={value} disabled={disabled}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    case "semester":
      return (
        <Select onValueChange={onChangeHandler} defaultValue={value} disabled={disabled}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Semester" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
          </SelectContent>
        </Select>
      );

    default:
      return null; // Return null for unknown types or types you haven't implemented yet
  }
};

export default Dropdown;

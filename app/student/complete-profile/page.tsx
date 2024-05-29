'use client'

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { faculties } from '@/real_data';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const CompleteProfile = () => {
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [specialities, setSpecialities] = useState<string[]>([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState('');
  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const r = useRouter();

  const handleFacultyChange = (value: string) => {
    setSelectedFaculty(value);
    const faculty = faculties.find(f => f.name === value);
    setSpecialities(faculty ? faculty.specialities : []);
    setSelectedSpeciality('');
    setYears([]);
    setSelectedYear(null);
  };

  const handleSpecialityChange = (value: string) => {
    setSelectedSpeciality(value);
    let yearOptions;
    if (value === 'INFO') {
      yearOptions = [1, 2, 3];
    } else if (value === 'ARH') {
      yearOptions = [1, 2, 3, 4, 5, 6];
    } else {
      yearOptions = [1, 2, 3, 4];
    }
    setYears(yearOptions);
    setSelectedYear(null);
  };

  const handleYearChange = (value: string) => {
    setSelectedYear(parseInt(value, 10));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({
      faculty: selectedFaculty,
      major: selectedSpeciality,
      year: selectedYear
    });
    r.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded shadow-md w-full max-w-lg">
        <div className="mb-6">
          <Select onValueChange={handleFacultyChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Faculty" />
            </SelectTrigger>
            <SelectContent>
              {faculties.map(faculty => (
                <SelectItem key={faculty.name} value={faculty.name}>
                  <div className="flex items-center">
                    <Image
                      src={`/${faculty.name.toLocaleLowerCase()}.png`}
                      alt={faculty.name}
                      width={25}
                      height={25}
                      className="mr-2"
                    />
                    {faculty.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mb-6">
          <Select
            disabled={!selectedFaculty}
            onValueChange={handleSpecialityChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Speciality" />
            </SelectTrigger>
            <SelectContent>
              {specialities.map(speciality => (
                <SelectItem key={speciality} value={speciality}>
                  {speciality}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mb-6">
          <Select
            disabled={!selectedSpeciality}
            onValueChange={handleYearChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map(year => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
      <p className="text-xs mt-4 text-center">Enter your data once, and you'll be automatically enrolled in next semester's courses.</p>
    </div>
  );
};

export default CompleteProfile;

export type UPTFaculty = {
    name: string
    specialities: string[]
    url: string
}

export const faculties: UPTFaculty[] = [
    {
        name: 'AC',
        specialities: ['INFO', 'CTI', 'IS'],
        url: 'http://www.ac.upt.ro'
    },
    {
        name: 'ETcTI',
        specialities: ['EA', 'COM', 'MEO'],
        url: 'https://www.etc.upt.ro'
    },
    {
        name: 'MEC',
        specialities: ['MRM', 'MR', 'IMF', 'MUT', 'ME'],
        url: 'http://www.mec.upt.ro'
    },
    {
        name: 'IEE',
        specialities: ['EE', 'IE', 'BFI'],
        url: 'https://iee.upt.ro'
    },
    {
        name: 'CT',
        specialities: ['CCI', 'CCTFC', 'CMMC', 'HIDRO'],
        url: 'http://www.ct.upt.ro'
    },
    {
        name: 'SC',
        specialities: ['CRP', 'TI'],
        url: 'https://sc.upt.ro'
    },
    {
        name: 'MTP',
        specialities: ['IEI', 'IEEEE', 'IEC', 'IEICM'],
        url: 'http://www.mpt.upt.ro'
    },
]
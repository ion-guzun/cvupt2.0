export type UPTFaculty = {
    name: string
    specialities: string[]
    url: string
}

export const faculties: UPTFaculty[] = [
    {
        name: 'AC',
        specialities: ['Informatica', 'Calculatoare si Tehnologia Informatiei', 'Ingineria Sistemelor'],
        url: 'http://www.ac.upt.ro'
    },
    {
        name: 'ETcTI',
        specialities: ['Electronica Aplicata', 'Comunicatii', 'Masurari Electrice si Optice'],
        url: 'https://www.etc.upt.ro'
    },
    {
        name: 'MEC',
        specialities: ['Mecatronica', 'Mecanica si Robotica', 'Inginerie Mecanica in Fabricatie', 'Managementul si Tehnologia Constructiilor', 'Materiale Electroizolante'],
        url: 'http://www.mec.upt.ro'
    },
    {
        name: 'IEE',
        specialities: ['Electrotehnica', 'Ingineria Electrica', 'Bazele Fizicii Ingineresti'],
        url: 'https://iee.upt.ro'
    },
    {
        name: 'CT',
        specialities: ['Constructii Civile si Industriale', 'Constructii, Cai de Comunicatii si Transporturi Feroviare si Cai Rutiere', 'Constructii Metalice si Mecanica de Constructii', 'Hidrotehnica'],
        url: 'http://www.ct.upt.ro'
    },
    {
        name: 'SC',
        specialities: ['Construirea si Reabilitarea Pamantului', 'Tehnologia Informatiei'],
        url: 'https://sc.upt.ro'
    },
    {
        name: 'MTP',
        specialities: ['Inginerie Economica Industriala', 'Ingineria si Economia Energiei Electrice', 'Ingineria Economica in Constructii de Masini', 'Ingineria Economica in Industria Chimica si Alimentara'],
        url: 'http://www.mpt.upt.ro'
    },
    {
        name: 'ARH',
        specialities: ['Arhitectura', 'Materiale si Aparate de Iluminat', 'Fizica Inginereasca'],
        url: 'http://www.arh.upt.ro'
    }
]

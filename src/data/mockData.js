import { tokens } from "../theme";
import {useEffect,useState} from 'react'
 export let mocDataU="hello";








export const mockDataUSER = [
  {
    id: 1,
    name: "Jackson Ngabonziza",
    email: "jackson@gmail.com",

    phone: "+250788445849",
    access: "admin",
  },
  {
    id: 2,
    name: "Uwitonze Claudette",
    email: "Claudette@gmail.com",

    phone: "+25078855563",
    access: "manager",
  },
  {
    id: 3,
    name: "Uwamahoro Angelique",
    email: "Angel@gmail.com",
    phone: "+2507883553636",
    access: "user",
  }
];

export const mockDataContacts = [
  {
    id: 1,
    name: "Jon Snow",
    email: "jonsnow@gmail.com",
    age: 35,
    phone: "(665)121-5454",
    address: "0912 Won Street, Alabama, SY 10001",
    city: "New York",
    zipCode: "10001",
    registrarId: 123512,
  },
  {
    id: 2,
    name: "Cersei Lannister",
    email: "cerseilannister@gmail.com",
    age: 42,
    phone: "(421)314-2288",
    address: "1234 Main Street, New York, NY 10001",
    city: "New York",
    zipCode: "13151",
    registrarId: 123512,
  },
  {
    id: 3,
    name: "Jaime Lannister",
    email: "jaimelannister@gmail.com",
    age: 45,
    phone: "(422)982-6739",
    address: "3333 Want Blvd, Estanza, NAY 42125",
    city: "New York",
    zipCode: "87281",
    registrarId: 4132513,
  },
  {
    id: 4,
    name: "Anya Stark",
    email: "anyastark@gmail.com",
    age: 16,
    phone: "(921)425-6742",
    address: "1514 Main Street, New York, NY 22298",
    city: "New York",
    zipCode: "15551",
    registrarId: 123512,
  },
  {
    id: 5,
    name: "Daenerys Targaryen",
    email: "daenerystargaryen@gmail.com",
    age: 31,
    phone: "(421)445-1189",
    address: "11122 Welping Ave, Tenting, CD 21321",
    city: "Tenting",
    zipCode: "14215",
    registrarId: 123512,
  },
  {
    id: 6,
    name: "Ever Melisandre",
    email: "evermelisandre@gmail.com",
    age: 150,
    phone: "(232)545-6483",
    address: "1234 Canvile Street, Esvazark, NY 10001",
    city: "Esvazark",
    zipCode: "10001",
    registrarId: 123512,
  },
  {
    id: 7,
    name: "Ferrara Clifford",
    email: "ferraraclifford@gmail.com",
    age: 44,
    phone: "(543)124-0123",
    address: "22215 Super Street, Everting, ZO 515234",
    city: "Evertin",
    zipCode: "51523",
    registrarId: 123512,
  },
  {
    id: 8,
    name: "Rossini Temperatures",
    email: "rossiniTemperatures@gmail.com",
    age: 36,
    phone: "(222)444-5555",
    address: "4123 Ever Blvd, Wentington, AD 142213",
    city: "Esteras",
    zipCode: "44215",
    registrarId: 512315,
  },
  {
    id: 9,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "(444)555-6239",
    address: "51234 Avery Street, Cantory, ND 212412",
    city: "Colunza",
    zipCode: "111234",
    registrarId: 928397,
  },
  {
    id: 10,
    name: "Enteri Redack",
    email: "enteriredack@gmail.com",
    age: 42,
    phone: "(222)444-5555",
    address: "4123 Easer Blvd, Wentington, AD 142213",
    city: "Esteras",
    zipCode: "44215",
    registrarId: 533215,
  },
  {
    id: 11,
    name: "Steve Goodman",
    email: "stevegoodmane@gmail.com",
    age: 11,
    phone: "(444)555-6239",
    address: "51234 Fiveton Street, CunFory, ND 212412",
    city: "Colunza",
    zipCode: "1234",
    registrarId: 92197,
  },
];

export const mockDataInvoices = [
  {
    id: 1,
    name: "Jackson Ngabonziza",
    email: "jackson@gmail.com",
    cost: "21.24",
    phone: "(665)121-5454",
    date: "03/12/2022",
  },
  {
    id: 2,
    name: "Cersei Lannister",
    email: "cerseilannister@gmail.com",
    cost: "1.24",
    phone: "(421)314-2288",
    date: "06/15/2021",
  },
  
    
];

export const mockTransactions = [
  {
    txId: "RainFall",
    user: "",
    date: "2023-05-01",
    cost: "60mm",
  },
  {
    txId: "Temperature",
    user: "",
    date: "2023-05-01",
    cost: "26 c",
  },
  {
    txId: "Humidity",
    user: "",
    date: "2023-05-01",
    cost: "27% RH",
  },

];



// "11": "185.382",
//     "1": "72.76",
//     "12": "126.336",
//     "2": "56.331",
//     "3": "106.231",
//     "4": "131.148",
//     "5": "112.081",
//     "6": "124.595",
//     "7": "93.574",
//     "8": "37.661",
//     "9": "185.705",
//     "10": "220.644"


// fetch("http://sensordatacenter.herokuapp.com/api/v1/rainyear/2019")
//   .then(response => response.json())
//   .then(result => {
//     console.log(result)}
//     )

export const mockBarData = [
  {
    country: "JAN",
    "JAN": 72.76,
    "hot dogColor": "hsl(229, 70%, 50%)",
    Cyuve: 96,
    Gacaca: "hsl(296, 70%, 50%)",
    Gashaki: 72,
    Gataraga: "hsl(97, 70%, 50%)",
    Kinigi: 140,
    Muhoza: "hsl(340, 70%, 50%)",
  },
  {
    country: "FEB",
    "JAN": 56.331,
    "hot dogColor": "hsl(307, 70%, 50%)",
    Cyuve: 28,
    Gacaca: "hsl(111, 70%, 50%)",
    Gashaki: 58,
    Muhoza: "hsl(273, 70%, 50%)",
    Gataraga: 29,
    Kinigi: "hsl(275, 70%, 50%)",
  },
  {
    country: "MARCH",
    "JAN": 106.231,
    "hot dogColor": "hsl(72, 70%, 50%)",
    Cyuve: 23,
    Gacaca: "hsl(96, 70%, 50%)",
    Gashaki: 34,
    Gataraga: "hsl(106, 70%, 50%)",
    Kinigi: 152,
    Muhoza: "hsl(256, 70%, 50%)",
  },
  {
    country: "APRIL",
    "JAN": 131.148,
    "hot dogColor": "hsl(257, 70%, 50%)",
    Cyuve: 52,
    Gacaca: "hsl(326, 70%, 50%)",
    Gashaki: 43,
    Gataraga: "hsl(110, 70%, 50%)",
    Kinigi: 83,
    Muhoza: "hsl(9, 70%, 50%)",
  },
  {
    country: "MAY",
    "JAN": 112.081,
    "hot dogColor": "hsl(190, 70%, 50%)",
    Cyuve: 80,
    CyuveColor: "hsl(325, 70%, 50%)",
    Gacaca: 112,
    GacacaColor: "hsl(54, 70%, 50%)",
    Gashaki: 35,
    GashakiColor: "hsl(285, 70%, 50%)",
  },
  {
    country: "JUN",
    "JAN": 124.595,
    "hot dogColor": "hsl(208, 70%, 50%)",
    Cyuve: 111,
    CyuveColor: "hsl(334, 70%, 50%)",
    Gacaca: 167,
    GacacaColor: "hsl(182, 70%, 50%)",
    Gashaki: 18,
    GashakiColor: "hsl(76, 70%, 50%)",
  },
  {
    country: "JULY",
    "JAN": 93.574,
    "hot dogColor": "hsl(87, 70%, 50%)",
    Cyuve: 47,
    CyuveColor: "hsl(141, 70%, 50%)",
    Gacaca: 158,
    GacacaColor: "hsl(224, 70%, 50%)",
    Gashaki: 49,
    GashakiColor: "hsl(274, 70%, 50%)",
  },

  {
    country: "AUG",
    "JAN": 37.661,
    "hot dogColor": "hsl(87, 70%, 50%)",
    Cyuve: 47,
    CyuveColor: "hsl(141, 70%, 50%)",
    Gacaca: 158,
    GacacaColor: "hsl(224, 70%, 50%)",
    Gashaki: 49,
    GashakiColor: "hsl(274, 70%, 50%)",
  },

  {
    country: "SEPT",
    "JAN": 185.705,
    "hot dogColor": "hsl(87, 70%, 50%)",
    Cyuve: 47,
    CyuveColor: "hsl(141, 70%, 50%)",
    Gacaca: 158,
    GacacaColor: "hsl(224, 70%, 50%)",
    Gashaki: 49,
    GashakiColor: "hsl(274, 70%, 50%)",
  },
  {
    country: "OCT",
    "JAN": 220.644,
    "hot dogColor": "hsl(87, 70%, 50%)",
    Cyuve: 47,
    CyuveColor: "hsl(141, 70%, 50%)",
    Gacaca: 158,
    GacacaColor: "hsl(224, 70%, 50%)",
    Gashaki: 49,
    GashakiColor: "hsl(274, 70%, 50%)",
  },

  {
    country: "NOV",
    "JAN": 185.382,
    "hot dogColor": "hsl(87, 70%, 50%)",
    Cyuve: 47,
    CyuveColor: "hsl(141, 70%, 50%)",
    Gacaca: 158,
    GacacaColor: "hsl(224, 70%, 50%)",
    Gashaki: 49,
    GashakiColor: "hsl(274, 70%, 50%)",
  },

  {
    country: "DEC",
    "JAN": 185.382,
    "hot dogColor": "hsl(87, 70%, 50%)",
    Cyuve: 47,
    CyuveColor: "hsl(141, 70%, 50%)",
    Gacaca: 158,
    GacacaColor: "hsl(224, 70%, 50%)",
    Gashaki: 49,
    GashakiColor: "hsl(274, 70%, 50%)",
  },
];



export const mockharvestData = [
  {
    country: "2005",
    "JAN": 23787,
    "hot dogColor": "hsl(229, 70%, 50%)",
    Cyuve: 23787,
    Gacaca: "hsl(296, 70%, 50%)",
    Gashaki: 23787,
    Gataraga: "hsl(97, 70%, 50%)",
    Kinigi: 23787,
    Muhoza: "hsl(340, 70%, 50%)",
  },
  {
    country: "2006",
    "JAN": 21863,
    "hot dogColor": "hsl(307, 70%, 50%)",
    Cyuve: 28,
    Gacaca: "hsl(111, 70%, 50%)",
    Gashaki: 58,
    Muhoza: "hsl(273, 70%, 50%)",
    Gataraga: 29,
    Kinigi: "hsl(275, 70%, 50%)",
  },
  {
    country: "2007",
    "JAN": 22896,
    "hot dogColor": "hsl(72, 70%, 50%)",
    Cyuve: 23,
    Gacaca: "hsl(96, 70%, 50%)",
    Gashaki: 34,
    Gataraga: "hsl(106, 70%, 50%)",
    Kinigi: 152,
    Muhoza: "hsl(256, 70%, 50%)",
  },
  {
    country: "2008",
    "JAN": 20387,
    "hot dogColor": "hsl(257, 70%, 50%)",
    Cyuve: 52,
    Gacaca: "hsl(326, 70%, 50%)",
    Gashaki: 43,
    Gataraga: "hsl(110, 70%, 50%)",
    Kinigi: 83,
    Muhoza: "hsl(9, 70%, 50%)",
  },
  {
    country: "2009",
    "JAN": 21393,
    "hot dogColor": "hsl(190, 70%, 50%)",
    Cyuve: 80,
    CyuveColor: "hsl(325, 70%, 50%)",
    Gacaca: 112,
    GacacaColor: "hsl(54, 70%, 50%)",
    Gashaki: 35,
    GashakiColor: "hsl(285, 70%, 50%)",
  },
  {
    country: "2010",
    "JAN": 25371,
    "hot dogColor": "hsl(208, 70%, 50%)",
    Cyuve: 111,
    CyuveColor: "hsl(334, 70%, 50%)",
    Gacaca: 167,
    GacacaColor: "hsl(182, 70%, 50%)",
    Gashaki: 18,
    GashakiColor: "hsl(76, 70%, 50%)",
  },
  {
    country: "2011",
    "JAN": 21981,
    "hot dogColor": "hsl(87, 70%, 50%)",
    Cyuve: 47,
    CyuveColor: "hsl(141, 70%, 50%)",
    Gacaca: 158,
    GacacaColor: "hsl(224, 70%, 50%)",
    Gashaki: 49,
    GashakiColor: "hsl(274, 70%, 50%)",
  },

  {
    country: "2012",
    "JAN": 19732,
    "hot dogColor": "hsl(87, 70%, 50%)",
    Cyuve: 47,
    CyuveColor: "hsl(141, 70%, 50%)",
    Gacaca: 158,
    GacacaColor: "hsl(224, 70%, 50%)",
    Gashaki: 49,
    GashakiColor: "hsl(274, 70%, 50%)",
  },

  {
    country: "2013",
    "JAN": 21669,
    "hot dogColor": "hsl(87, 70%, 50%)",
    Cyuve: 47,
    CyuveColor: "hsl(141, 70%, 50%)",
    Gacaca: 158,
    GacacaColor: "hsl(224, 70%, 50%)",
    Gashaki: 49,
    GashakiColor: "hsl(274, 70%, 50%)",
  },
  {
    country: "2014",
    "JAN": 20644,
    "hot dogColor": "hsl(87, 70%, 50%)",
    Cyuve: 47,
    CyuveColor: "hsl(141, 70%, 50%)",
    Gacaca: 158,
    GacacaColor: "hsl(224, 70%, 50%)",
    Gashaki: 49,
    GashakiColor: "hsl(274, 70%, 50%)",
  },

  {
    country: "2015",
    "JAN": 22860,
    "hot dogColor": "hsl(87, 70%, 50%)",
    Cyuve: 47,
    CyuveColor: "hsl(141, 70%, 50%)",
    Gacaca: 158,
    GacacaColor: "hsl(224, 70%, 50%)",
    Gashaki: 49,
    GashakiColor: "hsl(274, 70%, 50%)",
  },

  {
    country: "2016",
    "JAN": 23366,
    "hot dogColor": "hsl(87, 70%, 50%)",
    Cyuve: 47,
    CyuveColor: "hsl(141, 70%, 50%)",
    Gacaca: 158,
    GacacaColor: "hsl(224, 70%, 50%)",
    Gashaki: 49,
    GashakiColor: "hsl(274, 70%, 50%)",
  },
  // {
  //   country: "2017",
  //   "JAN": 185.382,
  //   "hot dogColor": "hsl(87, 70%, 50%)",
  //   Cyuve: 47,
  //   CyuveColor: "hsl(141, 70%, 50%)",
  //   Gacaca: 158,
  //   GacacaColor: "hsl(224, 70%, 50%)",
  //   Gashaki: 49,
  //   GashakiColor: "hsl(274, 70%, 50%)",
  // },
  // {
  //   country: "2018",
  //   "JAN": 185.382,
  //   "hot dogColor": "hsl(87, 70%, 50%)",
  //   Cyuve: 47,
  //   CyuveColor: "hsl(141, 70%, 50%)",
  //   Gacaca: 158,
  //   GacacaColor: "hsl(224, 70%, 50%)",
  //   Gashaki: 49,
  //   GashakiColor: "hsl(274, 70%, 50%)",
  // },
  // {
  //   country: "2019",
  //   "JAN": 185.382,
  //   "hot dogColor": "hsl(87, 70%, 50%)",
  //   Cyuve: 47,
  //   CyuveColor: "hsl(141, 70%, 50%)",
  //   Gacaca: 158,
  //   GacacaColor: "hsl(224, 70%, 50%)",
  //   Gashaki: 49,
  //   GashakiColor: "hsl(274, 70%, 50%)",
  // },
];












export const mockPieData = [
  {
    id: "hack",
    label: "hack",
    value: 239,
    color: "hsl(104, 70%, 50%)",
  },
  {
    id: "make",
    label: "make",
    value: 170,
    color: "hsl(162, 70%, 50%)",
  },
  {
    id: "go",
    label: "go",
    value: 322,
    color: "hsl(291, 70%, 50%)",
  },
  {
    id: "lisp",
    label: "lisp",
    value: 503,
    color: "hsl(229, 70%, 50%)",
  },
  {
    id: "scala",
    label: "scala",
    value: 584,
    color: "hsl(344, 70%, 50%)",
  },
];

export const mockLineData = [
  {
    id: "Rainfall",
    color: tokens("dark").greenAccent[500],
    data: [
      {
        x: "Jan",
        y: 101,
      },
      {
        x: "feb",
        y: 75,
      },
      {
        x: "march",
        y: 36,
      },
      {
        x: "April",
        y: 216,
      },
      {
        x: "May",
        y: 35,
      },
      {
        x: "June",
        y: 236,
      },
      {
        x: "July",
        y: 88,
      },
      {
        x: "Aug",
        y: 232,
      },
      {
        x: "Sept",
        y: 281,
      },
      {
        x: "Oct",
        y: 1,
      },
      {
        x: "Nov",
        y: 35,
      },
      {
        x: "Dec",
        y: 14,
      },
    ],
  },


  {
    id: "Temperature",
    color: tokens("dark").blueAccent[300],
    data: [
      {
        x: "Jan",
        y: 212,
      },
      {
        x: "feb",
        y: 190,
      },
      {
        x: "march",
        y: 270,
      },
      {
        x: "April",
        y: 9,
      },
      {
        x: "May",
        y: 75,
      },
      {
        x: "June",
        y: 175,
      },
      {
        x: "July",
        y: 33,
      },
      {
        x: "Aug",
        y: 189,
      },
      {
        x: "Sept",
        y: 97,
      },
      {
        x: "Oct",
        y: 87,
      },
      {
        x: "Nov",
        y: 299,
      },
      {
        x: "Dec",
        y: 251,
      },
    ],
  },
  {
    id: "Humidity",
    color: tokens("dark").redAccent[200],
    data: [
      {
        x: "Jan",
        y: 191,
      },
      {
        x: "feb",
        y: 136,
      },
      {
        x: "march",
        y: 91,
      },
      {
        x: "April",
        y: 190,
      },
      {
        x: "May",
        y: 211,
      },
      {
        x: "June",
        y: 152,
      },
      {
        x: "July",
        y: 189,
      },
      {
        x: "Aug",
        y: 152,
      },
      {
        x: "Sept",
        y: 8,
      },
      {
        x: "Oct",
        y: 197,
      },
      {
        x: "Nov",
        y: 107,
      },
      {
        x: "Dec",
        y: 170,
      },
    ],
  },
];

export const mockGeographyData = [
  {
    id: "AFG",
    value: 520600,
  },
  {
    id: "AGO",
    value: 949905,
  },
  {
    id: "ALB",
    value: 329910,
  },
  {
    id: "ARE",
    value: 675484,
  },
  {
    id: "ARG",
    value: 432239,
  },
  {
    id: "ARM",
    value: 288305,
  },
  {
    id: "ATA",
    value: 415648,
  },
  {
    id: "ATF",
    value: 665159,
  },
  {
    id: "AUT",
    value: 798526,
  },
  {
    id: "AZE",
    value: 481678,
  },
  {
    id: "BDI",
    value: 496457,
  },
  {
    id: "BEL",
    value: 252276,
  },
  {
    id: "BEN",
    value: 440315,
  },
  {
    id: "BFA",
    value: 343752,
  },
  {
    id: "BGD",
    value: 920203,
  },
  {
    id: "BGR",
    value: 261196,
  },
  {
    id: "BHS",
    value: 421551,
  },
  {
    id: "BIH",
    value: 974745,
  },
  {
    id: "BLR",
    value: 349288,
  },
  {
    id: "BLZ",
    value: 305983,
  },
  {
    id: "BOL",
    value: 430840,
  },
  {
    id: "BRN",
    value: 345666,
  },
  {
    id: "BTN",
    value: 649678,
  },
  {
    id: "BWA",
    value: 319392,
  },
  {
    id: "CAF",
    value: 722549,
  },
  {
    id: "CAN",
    value: 332843,
  },
  {
    id: "CHE",
    value: 122159,
  },
  {
    id: "CHL",
    value: 811736,
  },
  {
    id: "CHN",
    value: 593604,
  },
  {
    id: "CIV",
    value: 143219,
  },
  {
    id: "CMR",
    value: 630627,
  },
  {
    id: "COG",
    value: 498556,
  },
  {
    id: "COL",
    value: 660527,
  },
  {
    id: "CRI",
    value: 60262,
  },
  {
    id: "CUB",
    value: 177870,
  },
  {
    id: "-99",
    value: 463208,
  },
  {
    id: "CYP",
    value: 945909,
  },
  {
    id: "CZE",
    value: 500109,
  },
  {
    id: "DEU",
    value: 63345,
  },
  {
    id: "DJI",
    value: 634523,
  },
  {
    id: "DNK",
    value: 731068,
  },
  {
    id: "DOM",
    value: 262538,
  },
  {
    id: "DZA",
    value: 760695,
  },
  {
    id: "ECU",
    value: 301263,
  },
  {
    id: "EGY",
    value: 148475,
  },
  {
    id: "ERI",
    value: 939504,
  },
  {
    id: "ESP",
    value: 706050,
  },
  {
    id: "EST",
    value: 977015,
  },
  {
    id: "ETH",
    value: 461734,
  },
  {
    id: "FIN",
    value: 22800,
  },
  {
    id: "FJI",
    value: 18985,
  },
  {
    id: "FLK",
    value: 64986,
  },
  {
    id: "FRA",
    value: 447457,
  },
  {
    id: "GAB",
    value: 669675,
  },
  {
    id: "GBR",
    value: 757120,
  },
  {
    id: "GEO",
    value: 158702,
  },
  {
    id: "GHA",
    value: 893180,
  },
  {
    id: "GIN",
    value: 877288,
  },
  {
    id: "GMB",
    value: 724530,
  },
  {
    id: "GNB",
    value: 387753,
  },
  {
    id: "GNQ",
    value: 706118,
  },
  {
    id: "GRC",
    value: 377796,
  },
  {
    id: "GTM",
    value: 66890,
  },
  {
    id: "GUY",
    value: 719300,
  },
  {
    id: "HND",
    value: 739590,
  },
  {
    id: "HRV",
    value: 929467,
  },
  {
    id: "HTI",
    value: 538961,
  },
  {
    id: "HUN",
    value: 146095,
  },
  {
    id: "IDN",
    value: 490681,
  },
  {
    id: "IND",
    value: 549818,
  },
  {
    id: "IRL",
    value: 630163,
  },
  {
    id: "IRN",
    value: 596921,
  },
  {
    id: "IRQ",
    value: 767023,
  },
  {
    id: "ISL",
    value: 478682,
  },
  {
    id: "ISR",
    value: 963688,
  },
  {
    id: "ITA",
    value: 393089,
  },
  {
    id: "JAM",
    value: 83173,
  },
  {
    id: "JOR",
    value: 52005,
  },
  {
    id: "JPN",
    value: 199174,
  },
  {
    id: "KAZ",
    value: 181424,
  },
  {
    id: "KEN",
    value: 60946,
  },
  {
    id: "KGZ",
    value: 432478,
  },
  {
    id: "KHM",
    value: 254461,
  },
  {
    id: "OSA",
    value: 942447,
  },
  {
    id: "KWT",
    value: 414413,
  },
  {
    id: "LAO",
    value: 448339,
  },
  {
    id: "LBN",
    value: 620090,
  },
  {
    id: "LBR",
    value: 435950,
  },
  {
    id: "LBY",
    value: 75091,
  },
  {
    id: "LKA",
    value: 595124,
  },
  {
    id: "LSO",
    value: 483524,
  },
  {
    id: "LTU",
    value: 867357,
  },
  {
    id: "LUX",
    value: 689172,
  },
  {
    id: "LVA",
    value: 742980,
  },
  {
    id: "MAR",
    value: 236538,
  },
  {
    id: "MDA",
    value: 926836,
  },
  {
    id: "MDG",
    value: 840840,
  },
  {
    id: "MEX",
    value: 353910,
  },
  {
    id: "MKD",
    value: 505842,
  },
  {
    id: "MLI",
    value: 286082,
  },
  {
    id: "MMR",
    value: 915544,
  },
  {
    id: "MNE",
    value: 609500,
  },
  {
    id: "MNG",
    value: 410428,
  },
  {
    id: "MOZ",
    value: 32868,
  },
  {
    id: "MRT",
    value: 375671,
  },
  {
    id: "MWI",
    value: 591935,
  },
  {
    id: "MYS",
    value: 991644,
  },
  {
    id: "NAM",
    value: 701897,
  },
  {
    id: "NCL",
    value: 144098,
  },
  {
    id: "NER",
    value: 312944,
  },
  {
    id: "NGA",
    value: 862877,
  },
  {
    id: "NIC",
    value: 90831,
  },
  {
    id: "NLD",
    value: 281879,
  },
  {
    id: "NOR",
    value: 224537,
  },
  {
    id: "NPL",
    value: 322331,
  },
  {
    id: "NZL",
    value: 86615,
  },
  {
    id: "OMN",
    value: 707881,
  },
  {
    id: "PAK",
    value: 158577,
  },
  {
    id: "PAN",
    value: 738579,
  },
  {
    id: "PER",
    value: 248751,
  },
  {
    id: "PHL",
    value: 557292,
  },
  {
    id: "PNG",
    value: 516874,
  },
  {
    id: "POL",
    value: 682137,
  },
  {
    id: "PRI",
    value: 957399,
  },
  {
    id: "PRT",
    value: 846430,
  },
  {
    id: "PRY",
    value: 720555,
  },
  {
    id: "QAT",
    value: 478726,
  },
  {
    id: "ROU",
    value: 259318,
  },
  {
    id: "RUS",
    value: 268735,
  },
  {
    id: "RWA",
    value: 136781,
  },
  {
    id: "ESH",
    value: 151957,
  },
  {
    id: "SAU",
    value: 111821,
  },
  {
    id: "SDN",
    value: 927112,
  },
  {
    id: "SDS",
    value: 966473,
  },
  {
    id: "SEN",
    value: 158085,
  },
  {
    id: "SLB",
    value: 178389,
  },
  {
    id: "SLE",
    value: 528433,
  },
  {
    id: "SLV",
    value: 353467,
  },
  {
    id: "ABV",
    value: 251,
  },
  {
    id: "SOM",
    value: 445243,
  },
  {
    id: "SRB",
    value: 202402,
  },
  {
    id: "SUR",
    value: 972121,
  },
  {
    id: "SVK",
    value: 319923,
  },
  {
    id: "SVN",
    value: 728766,
  },
  {
    id: "SWZ",
    value: 379669,
  },
  {
    id: "SYR",
    value: 16221,
  },
  {
    id: "TCD",
    value: 101273,
  },
  {
    id: "TGO",
    value: 498411,
  },
  {
    id: "THA",
    value: 506906,
  },
  {
    id: "TJK",
    value: 613093,
  },
  {
    id: "TKM",
    value: 327016,
  },
  {
    id: "TLS",
    value: 607972,
  },
  {
    id: "TTO",
    value: 936365,
  },
  {
    id: "TUN",
    value: 898416,
  },
  {
    id: "TUR",
    value: 237783,
  },
  {
    id: "TWN",
    value: 878213,
  },
  {
    id: "TZA",
    value: 442174,
  },
  {
    id: "UGA",
    value: 720710,
  },
  {
    id: "UKR",
    value: 74172,
  },
  {
    id: "URY",
    value: 753177,
  },
  {
    id: "USA",
    value: 658725,
  },
  {
    id: "UZB",
    value: 550313,
  },
  {
    id: "VEN",
    value: 707492,
  },
  {
    id: "VNM",
    value: 538907,
  },
  {
    id: "VUT",
    value: 650646,
  },
  {
    id: "PSE",
    value: 476078,
  },
  {
    id: "YEM",
    value: 957751,
  },
  {
    id: "ZAF",
    value: 836949,
  },
  {
    id: "ZMB",
    value: 714503,
  },
  {
    id: "ZWE",
    value: 405217,
  },
  {
    id: "KOR",
    value: 171135,
  },
];

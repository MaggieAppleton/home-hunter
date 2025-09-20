export interface TrainStation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  lines: string[];
  type: 'tube' | 'overground' | 'national_rail' | 'tram';
  zone?: number;
  networks?: string[];
  allTypes?: string[]; // For multi-type stations
}

// Fixed South London train stations with proper multi-type support
export const southLondonStations: TrainStation[] = [
  {
    "id": "station-780856",
    "name": "Shepherd's Bush Market",
    "lat": 51.50607,
    "lng": -0.2263134,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-13893359",
    "name": "Catford",
    "lat": 51.4444696,
    "lng": -0.0261521,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-15026054",
    "name": "Sloane Square",
    "lat": 51.4922264,
    "lng": -0.1558767,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-18049583",
    "name": "Cyprus",
    "lat": 51.5084776,
    "lng": 0.0639692,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "Docklands Light Railway"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-18089211",
    "name": "Wimbledon",
    "lat": 51.4220721,
    "lng": -0.2052902,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail",
      "London Underground",
      "London Trams"
    ],
    "allTypes": [
      "national_rail",
      "tube",
      "tram"
    ]
  },
  {
    "id": "station-18395696",
    "name": "Mansion House",
    "lat": 51.5118924,
    "lng": -0.0952228,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-21442171",
    "name": "Tooting Bec",
    "lat": 51.4356228,
    "lng": -0.1597188,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-21507731",
    "name": "Clapham North",
    "lat": 51.4653034,
    "lng": -0.1296388,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-21507733",
    "name": "Oval",
    "lat": 51.4818339,
    "lng": -0.1123953,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-21507827",
    "name": "Kennington",
    "lat": 51.4882861,
    "lng": -0.1058829,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-21596119",
    "name": "Dalston Junction",
    "lat": 51.5452841,
    "lng": -0.074968,
    "lines": [],
    "type": "overground",
    "networks": [
      "London Overground"
    ],
    "allTypes": [
      "overground"
    ]
  },
  {
    "id": "station-21669593",
    "name": "North Dulwich",
    "lat": 51.4541783,
    "lng": -0.0883292,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-25524263",
    "name": "St. James's Park",
    "lat": 51.4992816,
    "lng": -0.1345942,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-25534427",
    "name": "Westminster",
    "lat": 51.5013562,
    "lng": -0.1249302,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-26652919",
    "name": "Brixton",
    "lat": 51.4626818,
    "lng": -0.1147325,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-27020525",
    "name": "St. Helier",
    "lat": 51.389451,
    "lng": -0.1988601,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-27021082",
    "name": "Sutton Common",
    "lat": 51.3754313,
    "lng": -0.1961049,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-34006946",
    "name": "Clapham South",
    "lat": 51.4528372,
    "lng": -0.1475523,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-34007928",
    "name": "Balham",
    "lat": 51.4433857,
    "lng": -0.1528977,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-34037748",
    "name": "Tooting Broadway",
    "lat": 51.4277387,
    "lng": -0.1682905,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-34037750",
    "name": "Colliers Wood",
    "lat": 51.4182747,
    "lng": -0.1778626,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-34037860",
    "name": "South Wimbledon",
    "lat": 51.4151759,
    "lng": -0.1926457,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-36931223",
    "name": "Motspur Park",
    "lat": 51.3948747,
    "lng": -0.2396076,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-37984741",
    "name": "South Merton",
    "lat": 51.4033264,
    "lng": -0.2055176,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-70804547",
    "name": "Old Street",
    "lat": 51.5256284,
    "lng": -0.0876094,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail",
      "London Underground"
    ],
    "allTypes": [
      "national_rail",
      "tube"
    ]
  },
  {
    "id": "station-82620018",
    "name": "Bromley North",
    "lat": 51.409198,
    "lng": 0.0177978,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-119274464",
    "name": "King's Cross St Pancras",
    "lat": 51.530609,
    "lng": -0.1239491,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-154555335",
    "name": "Waddon",
    "lat": 51.3673338,
    "lng": -0.1174351,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-181662604",
    "name": "Stockwell",
    "lat": 51.472211,
    "lng": -0.1225014,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-270091541",
    "name": "West Croydon",
    "lat": 51.378808,
    "lng": -0.1020387,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail",
      "London Overground"
    ],
    "allTypes": [
      "national_rail",
      "overground"
    ]
  },
  {
    "id": "station-273210309",
    "name": "Pimlico",
    "lat": 51.4891579,
    "lng": -0.1353308,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-290511221",
    "name": "Beckton Park",
    "lat": 51.5087601,
    "lng": 0.0549426,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "Docklands Light Railway"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-302042289",
    "name": "East Croydon",
    "lat": 51.3758448,
    "lng": -0.0927317,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-441947584",
    "name": "Victoria",
    "lat": 51.4963688,
    "lng": -0.1431522,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-1264468143",
    "name": "Baker Street",
    "lat": 51.5225862,
    "lng": -0.1567349,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-1264482797",
    "name": "Paddington",
    "lat": 51.5154795,
    "lng": -0.175365,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-1525365505",
    "name": "East Acton",
    "lat": 51.5173451,
    "lng": -0.248137,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-1583662829",
    "name": "Streatham Hill",
    "lat": 51.4383281,
    "lng": -0.1277852,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-1637578440",
    "name": "Bank",
    "lat": 51.5131048,
    "lng": -0.0893749,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground",
      "Docklands Light Railway"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-1651498764",
    "name": "Barons Court",
    "lat": 51.4903477,
    "lng": -0.2144055,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-1670707904",
    "name": "Angel",
    "lat": 51.5324874,
    "lng": -0.1060356,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-1670707917",
    "name": "Camden Town",
    "lat": 51.5394397,
    "lng": -0.1426957,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-2314512860",
    "name": "Edgware Road",
    "lat": 51.5201935,
    "lng": -0.1667636,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-2324453845",
    "name": "Battersea Park",
    "lat": 51.47761,
    "lng": -0.1475846,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail",
      "London Overground"
    ],
    "allTypes": [
      "national_rail",
      "overground"
    ]
  },
  {
    "id": "station-2397308060",
    "name": "Kidbrooke",
    "lat": 51.4620317,
    "lng": 0.0279002,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-2426825788",
    "name": "Whitechapel",
    "lat": 51.5197615,
    "lng": -0.0600874,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground",
      "London Overground",
      "Elizabeth line"
    ],
    "allTypes": [
      "tube",
      "overground"
    ]
  },
  {
    "id": "station-2438234411",
    "name": "Haggerston",
    "lat": 51.5386574,
    "lng": -0.0755835,
    "lines": [],
    "type": "overground",
    "networks": [
      "London Overground"
    ],
    "allTypes": [
      "overground"
    ]
  },
  {
    "id": "station-2438248384",
    "name": "Rotherhithe",
    "lat": 51.5008237,
    "lng": -0.0519666,
    "lines": [],
    "type": "overground",
    "networks": [
      "London Overground"
    ],
    "allTypes": [
      "overground"
    ]
  },
  {
    "id": "station-2438262362",
    "name": "Surrey Quays",
    "lat": 51.4934207,
    "lng": -0.0478319,
    "lines": [],
    "type": "overground",
    "networks": [
      "London Overground"
    ],
    "allTypes": [
      "overground"
    ]
  },
  {
    "id": "station-2438276350",
    "name": "Wapping",
    "lat": 51.5044344,
    "lng": -0.0560206,
    "lines": [],
    "type": "overground",
    "networks": [
      "London Overground"
    ],
    "allTypes": [
      "overground"
    ]
  },
  {
    "id": "station-2438280276",
    "name": "Denmark Hill",
    "lat": 51.468043,
    "lng": -0.0896031,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail",
      "London Overground"
    ],
    "allTypes": [
      "national_rail",
      "overground"
    ]
  },
  {
    "id": "station-2438286491",
    "name": "Wandsworth Road",
    "lat": 51.4699602,
    "lng": -0.1384355,
    "lines": [],
    "type": "overground",
    "networks": [
      "London Overground"
    ],
    "allTypes": [
      "overground"
    ]
  },
  {
    "id": "station-2438288086",
    "name": "Clapham High Street",
    "lat": 51.4654853,
    "lng": -0.1323141,
    "lines": [],
    "type": "overground",
    "networks": [
      "London Overground"
    ],
    "allTypes": [
      "overground"
    ]
  },
  {
    "id": "station-2441957067",
    "name": "Hoxton",
    "lat": 51.5315917,
    "lng": -0.0756539,
    "lines": [],
    "type": "overground",
    "networks": [
      "London Overground"
    ],
    "allTypes": [
      "overground"
    ]
  },
  {
    "id": "station-2446751285",
    "name": "Queens Road Peckham",
    "lat": 51.4741117,
    "lng": -0.0570532,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail",
      "London Overground"
    ],
    "allTypes": [
      "national_rail",
      "overground"
    ]
  },
  {
    "id": "station-2961311554",
    "name": "Brixton",
    "lat": 51.4628953,
    "lng": -0.1133473,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "zbb",
    "name": "Barbican",
    "lat": 51.5201797,
    "lng": -0.0986342,
    "lines": [
      "ZBB"
    ],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-3076573913",
    "name": "Bond Street",
    "lat": 51.5139808,
    "lng": -0.1494231,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-3076573915",
    "name": "Chancery Lane",
    "lat": 51.5181738,
    "lng": -0.1117642,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-3076574236",
    "name": "Mile End",
    "lat": 51.5253378,
    "lng": -0.033435,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-3076574237",
    "name": "Monument",
    "lat": 51.5106328,
    "lng": -0.0861271,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-3284103165",
    "name": "Farringdon",
    "lat": 51.519964,
    "lng": -0.104555,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail",
      "London Underground",
      "Elizabeth line"
    ],
    "allTypes": [
      "national_rail",
      "tube"
    ]
  },
  {
    "id": "station-3370671078",
    "name": "Leicester Square",
    "lat": 51.5114642,
    "lng": -0.1282641,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-3446641270",
    "name": "Queenstown Road",
    "lat": 51.4752161,
    "lng": -0.1462935,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-3446663141",
    "name": "Vauxhall",
    "lat": 51.4858478,
    "lng": -0.1227502,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-3572247866",
    "name": "Penge West",
    "lat": 51.4175147,
    "lng": -0.0607007,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail",
      "London Overground"
    ],
    "allTypes": [
      "national_rail",
      "overground"
    ]
  },
  {
    "id": "station-3627131075",
    "name": "Eltham",
    "lat": 51.4555936,
    "lng": 0.0522692,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-3627170668",
    "name": "Wandsworth Town",
    "lat": 51.4609627,
    "lng": -0.1882512,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-3637195703",
    "name": "City Thameslink",
    "lat": 51.515126,
    "lng": -0.103564,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-3637436407",
    "name": "Liverpool Street",
    "lat": 51.5176777,
    "lng": -0.0825205,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-3637436408",
    "name": "London Liverpool Street",
    "lat": 51.5182105,
    "lng": -0.0814269,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail",
      "London Overground",
      "Elizabeth line"
    ],
    "allTypes": [
      "national_rail",
      "overground"
    ]
  },
  {
    "id": "station-3637449659",
    "name": "Cannon Street",
    "lat": 51.5113812,
    "lng": -0.0903632,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-3637449660",
    "name": "London Cannon Street",
    "lat": 51.5106685,
    "lng": -0.0906046,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-3638779316",
    "name": "Piccadilly Circus",
    "lat": 51.5098192,
    "lng": -0.1345484,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-3638795617",
    "name": "London Waterloo",
    "lat": 51.5028379,
    "lng": -0.112801,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-3638795618",
    "name": "Waterloo",
    "lat": 51.5030015,
    "lng": -0.1139812,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-3655237096",
    "name": "Streatham",
    "lat": 51.4259609,
    "lng": -0.1313131,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-3660442172",
    "name": "Charing Cross",
    "lat": 51.5079664,
    "lng": -0.1263945,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-3660623412",
    "name": "Elephant & Castle",
    "lat": 51.4940431,
    "lng": -0.0987169,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "zel",
    "name": "Elephant & Castle",
    "lat": 51.4948884,
    "lng": -0.1005731,
    "lines": [
      "ZEL"
    ],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-3661349170",
    "name": "Sutton",
    "lat": 51.3596769,
    "lng": -0.1908861,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-3662847634",
    "name": "London St. Pancras International",
    "lat": 51.5327196,
    "lng": -0.1270027,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-3663368460",
    "name": "London Euston",
    "lat": 51.5288526,
    "lng": -0.1341909,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail",
      "London Overground"
    ],
    "allTypes": [
      "national_rail",
      "overground"
    ]
  },
  {
    "id": "station-3663368461",
    "name": "Euston",
    "lat": 51.5282865,
    "lng": -0.1338745,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-3671417635",
    "name": "Barnes",
    "lat": 51.466783,
    "lng": -0.2411817,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-3691424209",
    "name": "Cheam",
    "lat": 51.3556609,
    "lng": -0.2145128,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-3693265703",
    "name": "Holborn",
    "lat": 51.5171149,
    "lng": -0.1200657,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-3729401291",
    "name": "Shadwell",
    "lat": 51.51125,
    "lng": -0.0569241,
    "lines": [],
    "type": "overground",
    "networks": [
      "London Overground"
    ],
    "allTypes": [
      "overground"
    ]
  },
  {
    "id": "station-3735044726",
    "name": "Wimbledon Chase",
    "lat": 51.410247,
    "lng": -0.2147881,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-3748134854",
    "name": "Wimbledon Park",
    "lat": 51.4340563,
    "lng": -0.1990432,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-3749079080",
    "name": "Ravenscourt Park",
    "lat": 51.4941293,
    "lng": -0.2357932,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-3749159483",
    "name": "Imperial Wharf",
    "lat": 51.475103,
    "lng": -0.1829268,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail",
      "London Overground"
    ],
    "allTypes": [
      "national_rail",
      "overground"
    ]
  },
  {
    "id": "station-3749254091",
    "name": "Earlsfield",
    "lat": 51.4424033,
    "lng": -0.1876937,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-3752975773",
    "name": "Tooting",
    "lat": 51.4198463,
    "lng": -0.1613225,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-3752975780",
    "name": "Haydons Road",
    "lat": 51.4253627,
    "lng": -0.1883425,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-3757075887",
    "name": "Wandsworth Common",
    "lat": 51.4461242,
    "lng": -0.1635168,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-3763522921",
    "name": "Blackfriars",
    "lat": 51.5115854,
    "lng": -0.1037671,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-3768010552",
    "name": "London Victoria",
    "lat": 51.4947328,
    "lng": -0.1445802,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-3773122118",
    "name": "Lambeth North",
    "lat": 51.4989328,
    "lng": -0.1120142,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-3788735981",
    "name": "Aldgate",
    "lat": 51.5142477,
    "lng": -0.0757186,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-3808897466",
    "name": "Southfields",
    "lat": 51.4457751,
    "lng": -0.2066142,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-3817850257",
    "name": "Vauxhall",
    "lat": 51.4860091,
    "lng": -0.1248604,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-3825936573",
    "name": "Orpington",
    "lat": 51.3736037,
    "lng": 0.0887195,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-3831844357",
    "name": "Herne Hill",
    "lat": 51.4534691,
    "lng": -0.1022835,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-3941256583",
    "name": "Balham",
    "lat": 51.4428285,
    "lng": -0.1514426,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-4290857012",
    "name": "London Bridge",
    "lat": 51.5048764,
    "lng": -0.0851473,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-4337677777",
    "name": "West Sutton",
    "lat": 51.3662613,
    "lng": -0.2044835,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-4422624749",
    "name": "Woolwich",
    "lat": 51.4918947,
    "lng": 0.0705576,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "Elizabeth line"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-4451063672",
    "name": "Upton Park",
    "lat": 51.5351062,
    "lng": 0.0339842,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-4503057074",
    "name": "Clapham Common",
    "lat": 51.4620748,
    "lng": -0.1373589,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-4514968602",
    "name": "White City",
    "lat": 51.5119347,
    "lng": -0.2242361,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-4571439709",
    "name": "Lewisham DLR",
    "lat": 51.4649887,
    "lng": -0.0130109,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "Docklands Light Railway"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-4635572117",
    "name": "Paddington",
    "lat": 51.5185075,
    "lng": -0.1787546,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-4984999298",
    "name": "Aldgate East",
    "lat": 51.5156185,
    "lng": -0.070839,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-5107248193",
    "name": "Parsons Green",
    "lat": 51.4750837,
    "lng": -0.201549,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-5114697934",
    "name": "London Fenchurch Street",
    "lat": 51.5113281,
    "lng": -0.0774191,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-5142610270",
    "name": "Fulham Broadway",
    "lat": 51.4808834,
    "lng": -0.1943493,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-5178413114",
    "name": "Plaistow",
    "lat": 51.5311544,
    "lng": 0.0166833,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-5178413115",
    "name": "Bow Road",
    "lat": 51.5268535,
    "lng": -0.024789,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-5178413116",
    "name": "Stepney Green",
    "lat": 51.5217026,
    "lng": -0.0467147,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-5182384968",
    "name": "West Kensington",
    "lat": 51.4907023,
    "lng": -0.2059442,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-5182384969",
    "name": "West Brompton",
    "lat": 51.4869765,
    "lng": -0.1951854,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground",
      "London Overground"
    ],
    "allTypes": [
      "tube",
      "overground"
    ]
  },
  {
    "id": "station-5182384973",
    "name": "Knightsbridge",
    "lat": 51.5015961,
    "lng": -0.160937,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-5182424563",
    "name": "Mornington Crescent",
    "lat": 51.5340608,
    "lng": -0.1380918,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-5182424569",
    "name": "Putney Bridge",
    "lat": 51.4682995,
    "lng": -0.2087947,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-5182456569",
    "name": "London Bridge",
    "lat": 51.5054118,
    "lng": -0.0886993,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-5182456574",
    "name": "Hyde Park Corner",
    "lat": 51.5027264,
    "lng": -0.1543249,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-5183350488",
    "name": "Lancaster Gate",
    "lat": 51.5118458,
    "lng": -0.175108,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-5183760375",
    "name": "Finchley Road",
    "lat": 51.5472307,
    "lng": -0.1806964,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-5183897519",
    "name": "South Kensington",
    "lat": 51.4940799,
    "lng": -0.1729072,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-5206774617",
    "name": "Edgware Road",
    "lat": 51.5204575,
    "lng": -0.1702993,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-5206785234",
    "name": "Marylebone",
    "lat": 51.5222363,
    "lng": -0.1635046,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-5207123395",
    "name": "Embankment",
    "lat": 51.5072143,
    "lng": -0.1222409,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-5207201516",
    "name": "Notting Hill Gate",
    "lat": 51.5089252,
    "lng": -0.1961978,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-5252083983",
    "name": "West Ham",
    "lat": 51.5280966,
    "lng": 0.0045685,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail",
      "London Underground",
      "Docklands Light Railway"
    ],
    "allTypes": [
      "national_rail",
      "tube"
    ]
  },
  {
    "id": "station-5257403774",
    "name": "Stratford",
    "lat": 51.541289,
    "lng": -0.0035472,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail",
      "London Underground",
      "London Overground",
      "Docklands Light Railway",
      "Elizabeth line"
    ],
    "allTypes": [
      "national_rail",
      "tube",
      "overground"
    ]
  },
  {
    "id": "station-5320449851",
    "name": "Mudchute",
    "lat": 51.4915188,
    "lng": -0.0149135,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "Docklands Light Railway"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-5350830014",
    "name": "Southwark",
    "lat": 51.503925,
    "lng": -0.1049663,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-5457046602",
    "name": "Warwick Avenue",
    "lat": 51.5229834,
    "lng": -0.1833083,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-5462552522",
    "name": "Tottenham Court Road",
    "lat": 51.5159715,
    "lng": -0.1305125,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-5469508777",
    "name": "Canary Wharf",
    "lat": 51.5051073,
    "lng": -0.0209849,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "Docklands Light Railway"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-5469512667",
    "name": "Greenwich",
    "lat": 51.4781086,
    "lng": -0.0154152,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail",
      "Docklands Light Railway"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-5469532954",
    "name": "West India Quay",
    "lat": 51.5067417,
    "lng": -0.0204833,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "Docklands Light Railway"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-5469562564",
    "name": "All Saints",
    "lat": 51.5108398,
    "lng": -0.0130551,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "Docklands Light Railway"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-5469584669",
    "name": "Abbey Road",
    "lat": 51.5325414,
    "lng": 0.0036092,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "Docklands Light Railway"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-5469588771",
    "name": "Stratford High Street",
    "lat": 51.5376469,
    "lng": -0.0001288,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "Docklands Light Railway"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-5469603372",
    "name": "Bow Church",
    "lat": 51.5274411,
    "lng": -0.0206424,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "Docklands Light Railway"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-5469620129",
    "name": "Limehouse",
    "lat": 51.5123504,
    "lng": -0.0394662,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "Docklands Light Railway"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-5469622521",
    "name": "Limehouse",
    "lat": 51.5128705,
    "lng": -0.0390456,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-5474926328",
    "name": "Hammersmith",
    "lat": 51.494109,
    "lng": -0.2250607,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-5475675298",
    "name": "St. Paul's",
    "lat": 51.5149144,
    "lng": -0.0975883,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-5483374935",
    "name": "Stratford International DLR",
    "lat": 51.5457077,
    "lng": -0.009359,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "Docklands Light Railway"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-5489114067",
    "name": "Swiss Cottage",
    "lat": 51.543722,
    "lng": -0.174982,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-5504917479",
    "name": "Wood Lane",
    "lat": 51.5101068,
    "lng": -0.2237557,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-5564994509",
    "name": "Mitcham Eastfields",
    "lat": 51.4073954,
    "lng": -0.154872,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-5571724044",
    "name": "Morden",
    "lat": 51.4027615,
    "lng": -0.1947552,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-5571737425",
    "name": "Morden South",
    "lat": 51.395678,
    "lng": -0.1992399,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-5574104460",
    "name": "Blackheath",
    "lat": 51.4657989,
    "lng": 0.0089218,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-5575342411",
    "name": "Deptford",
    "lat": 51.4789824,
    "lng": -0.0266353,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-5585799426",
    "name": "Canning Town",
    "lat": 51.5139887,
    "lng": 0.0082987,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground",
      "Docklands Light Railway"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-5585825335",
    "name": "Russell Square",
    "lat": 51.5230529,
    "lng": -0.1242529,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-5585825355",
    "name": "Caledonian Road",
    "lat": 51.548482,
    "lng": -0.1183585,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-5585857405",
    "name": "Chalk Farm",
    "lat": 51.5441141,
    "lng": -0.1534811,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-5614077964",
    "name": "Oxford Circus",
    "lat": 51.5154418,
    "lng": -0.1419563,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-5700001161",
    "name": "North Greenwich",
    "lat": 51.500574,
    "lng": 0.0043201,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-5700149213",
    "name": "Canada Water",
    "lat": 51.4979299,
    "lng": -0.0498405,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground",
      "London Overground"
    ],
    "allTypes": [
      "tube",
      "overground"
    ]
  },
  {
    "id": "station-5702714876",
    "name": "Moorgate",
    "lat": 51.5182516,
    "lng": -0.0890625,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail",
      "London Underground"
    ],
    "allTypes": [
      "national_rail",
      "tube"
    ]
  },
  {
    "id": "station-5735001231",
    "name": "Clapham Junction",
    "lat": 51.4644589,
    "lng": -0.1705184,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail",
      "London Overground"
    ],
    "allTypes": [
      "national_rail",
      "overground"
    ]
  },
  {
    "id": "station-5766054217",
    "name": "London Marylebone",
    "lat": 51.5243712,
    "lng": -0.163592,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-5790633431",
    "name": "Crystal Palace",
    "lat": 51.4176595,
    "lng": -0.0712666,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail",
      "London Overground"
    ],
    "allTypes": [
      "national_rail",
      "overground"
    ]
  },
  {
    "id": "station-5863634789",
    "name": "Raynes Park",
    "lat": 51.408966,
    "lng": -0.23054,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-5863634790",
    "name": "Worcester Park",
    "lat": 51.3814192,
    "lng": -0.244985,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-5863634791",
    "name": "Stoneleigh",
    "lat": 51.3638988,
    "lng": -0.2479641,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-5863723750",
    "name": "Carshalton",
    "lat": 51.3685771,
    "lng": -0.1663814,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-5871218006",
    "name": "Sydenham",
    "lat": 51.427742,
    "lng": -0.0542215,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail",
      "London Overground"
    ],
    "allTypes": [
      "national_rail",
      "overground"
    ]
  },
  {
    "id": "station-5871218007",
    "name": "Forest Hill",
    "lat": 51.4392419,
    "lng": -0.0530903,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail",
      "London Overground"
    ],
    "allTypes": [
      "national_rail",
      "overground"
    ]
  },
  {
    "id": "station-5871218008",
    "name": "Honor Oak Park",
    "lat": 51.4504605,
    "lng": -0.0450199,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail",
      "London Overground"
    ],
    "allTypes": [
      "national_rail",
      "overground"
    ]
  },
  {
    "id": "station-5871218009",
    "name": "New Cross Gate",
    "lat": 51.4752983,
    "lng": -0.0404289,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail",
      "London Overground"
    ],
    "allTypes": [
      "national_rail",
      "overground"
    ]
  },
  {
    "id": "station-5871218010",
    "name": "New Cross",
    "lat": 51.4763706,
    "lng": -0.0326237,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail",
      "London Overground"
    ],
    "allTypes": [
      "national_rail",
      "overground"
    ]
  },
  {
    "id": "station-5871218011",
    "name": "St Johns",
    "lat": 51.4690905,
    "lng": -0.0221846,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-5871218012",
    "name": "Westcombe Park",
    "lat": 51.4842403,
    "lng": 0.0186204,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-5871218014",
    "name": "Woolwich Dockyard",
    "lat": 51.4910924,
    "lng": 0.0548824,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-5871218015",
    "name": "Woolwich Arsenal",
    "lat": 51.4896184,
    "lng": 0.0703782,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-5871218016",
    "name": "Plumstead",
    "lat": 51.4897681,
    "lng": 0.0840176,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-5872906104",
    "name": "Grove Park",
    "lat": 51.4307645,
    "lng": 0.0220245,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-5872906105",
    "name": "Hither Green",
    "lat": 51.4515872,
    "lng": -0.0006473,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-5872906106",
    "name": "Elmstead Woods",
    "lat": 51.4167981,
    "lng": 0.0446574,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-5872906107",
    "name": "Chislehurst",
    "lat": 51.4051626,
    "lng": 0.0578673,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-5872906108",
    "name": "Petts Wood",
    "lat": 51.388626,
    "lng": 0.0745614,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-5882165493",
    "name": "Norwood Junction",
    "lat": 51.3971695,
    "lng": -0.0746988,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail",
      "London Overground"
    ],
    "allTypes": [
      "national_rail",
      "overground"
    ]
  },
  {
    "id": "station-5882282269",
    "name": "South Croydon",
    "lat": 51.3629173,
    "lng": -0.0933556,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-5883033865",
    "name": "Ladywell",
    "lat": 51.4560257,
    "lng": -0.0191917,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-5883033866",
    "name": "Catford Bridge",
    "lat": 51.4445909,
    "lng": -0.0249226,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-5883033867",
    "name": "Lower Sydenham",
    "lat": 51.4247446,
    "lng": -0.0332998,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-5883033868",
    "name": "New Beckenham",
    "lat": 51.4169395,
    "lng": -0.0352069,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-5883033869",
    "name": "Clock House",
    "lat": 51.4083449,
    "lng": -0.0408182,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-5883033870",
    "name": "West Wickham",
    "lat": 51.3815143,
    "lng": -0.0147334,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-5883033871",
    "name": "Eden Park",
    "lat": 51.3901801,
    "lng": -0.0263691,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-5883033872",
    "name": "Elmers End",
    "lat": 51.398012,
    "lng": -0.0497025,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6090336257",
    "name": "Hackbridge",
    "lat": 51.3780278,
    "lng": -0.1537197,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6091112768",
    "name": "Kensington (Olympia)",
    "lat": 51.497437,
    "lng": -0.2094954,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail",
      "London Underground",
      "London Overground"
    ],
    "allTypes": [
      "national_rail",
      "tube",
      "overground"
    ]
  },
  {
    "id": "station-6143744007",
    "name": "Elverson Road",
    "lat": 51.4685232,
    "lng": -0.0162072,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "Docklands Light Railway"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6143744008",
    "name": "Deptford Bridge",
    "lat": 51.4741638,
    "lng": -0.0223933,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "Docklands Light Railway"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6143744009",
    "name": "Crossharbour",
    "lat": 51.4959022,
    "lng": -0.0144418,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "Docklands Light Railway"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6143744010",
    "name": "South Quay",
    "lat": 51.5000357,
    "lng": -0.0162525,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "Docklands Light Railway"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6143849772",
    "name": "King George V",
    "lat": 51.502006,
    "lng": 0.0623526,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "Docklands Light Railway"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6143889602",
    "name": "Royal Victoria",
    "lat": 51.5091026,
    "lng": 0.0175953,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "Docklands Light Railway"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6143889603",
    "name": "Custom House",
    "lat": 51.5096341,
    "lng": 0.0259614,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "Docklands Light Railway"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6143889604",
    "name": "Prince Regent",
    "lat": 51.5094778,
    "lng": 0.0331521,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "Docklands Light Railway"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6143889605",
    "name": "Royal Albert",
    "lat": 51.5083952,
    "lng": 0.0458839,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "Docklands Light Railway"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6143889606",
    "name": "Gallions Reach",
    "lat": 51.5089622,
    "lng": 0.0717937,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "Docklands Light Railway"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6143889609",
    "name": "Beckton",
    "lat": 51.5143713,
    "lng": 0.061373,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "Docklands Light Railway"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6143889611",
    "name": "Blackwall",
    "lat": 51.5079378,
    "lng": -0.0071843,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "Docklands Light Railway"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6143889612",
    "name": "East India",
    "lat": 51.5093835,
    "lng": -0.0021873,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "Docklands Light Railway"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6143889613",
    "name": "London City Airport",
    "lat": 51.5035322,
    "lng": 0.048542,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "Docklands Light Railway"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6143889614",
    "name": "West Silvertown",
    "lat": 51.5028811,
    "lng": 0.0223323,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "Docklands Light Railway"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6143889615",
    "name": "Pontoon Dock",
    "lat": 51.5022501,
    "lng": 0.0332232,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "Docklands Light Railway"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6195731433",
    "name": "Hammersmith",
    "lat": 51.4921398,
    "lng": -0.2233005,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-6207523037",
    "name": "Mitcham Junction",
    "lat": 51.392945,
    "lng": -0.1577774,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6260922569",
    "name": "Tower Hill",
    "lat": 51.5098481,
    "lng": -0.0766986,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-6312813705",
    "name": "Stamford Brook",
    "lat": 51.4949692,
    "lng": -0.2458881,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-6340616347",
    "name": "Earl's Court",
    "lat": 51.4916123,
    "lng": -0.193903,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-6367262958",
    "name": "East Putney",
    "lat": 51.4586138,
    "lng": -0.2112429,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-6368951709",
    "name": "Temple",
    "lat": 51.5109659,
    "lng": -0.1143345,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-6391499992",
    "name": "Anerley",
    "lat": 51.4125891,
    "lng": -0.0655796,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail",
      "London Overground"
    ],
    "allTypes": [
      "national_rail",
      "overground"
    ]
  },
  {
    "id": "station-6400752013",
    "name": "Covent Garden",
    "lat": 51.5130942,
    "lng": -0.1242695,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-6401499742",
    "name": "St. John's Wood",
    "lat": 51.5353523,
    "lng": -0.1742097,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-6402129352",
    "name": "East Ham",
    "lat": 51.5394005,
    "lng": 0.0526042,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-6402176065",
    "name": "Bromley-by-Bow",
    "lat": 51.5246287,
    "lng": -0.0123189,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-6402222390",
    "name": "Canary Wharf",
    "lat": 51.5035036,
    "lng": -0.0186272,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-6403994178",
    "name": "Kensal Green",
    "lat": 51.5306063,
    "lng": -0.2244449,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail",
      "London Underground",
      "London Overground"
    ],
    "allTypes": [
      "national_rail",
      "tube",
      "overground"
    ]
  },
  {
    "id": "station-6404031521",
    "name": "West Hampstead",
    "lat": 51.5468194,
    "lng": -0.1899646,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-6407565244",
    "name": "Bermondsey",
    "lat": 51.4977004,
    "lng": -0.0643453,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-6407577779",
    "name": "Green Park",
    "lat": 51.5066192,
    "lng": -0.1429113,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-6410165090",
    "name": "Goldhawk Road",
    "lat": 51.5017564,
    "lng": -0.2265662,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-6410181628",
    "name": "Shepherd's Bush",
    "lat": 51.5043576,
    "lng": -0.2183251,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-6410209280",
    "name": "Latimer Road",
    "lat": 51.5134749,
    "lng": -0.2177873,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-6411663490",
    "name": "Kilburn Park",
    "lat": 51.5350704,
    "lng": -0.1943721,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-6411718929",
    "name": "Royal Oak",
    "lat": 51.5190222,
    "lng": -0.1874439,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-6411776703",
    "name": "Bayswater",
    "lat": 51.5122764,
    "lng": -0.1883854,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "zhs",
    "name": "High Street Kensington",
    "lat": 51.5002995,
    "lng": -0.1921096,
    "lines": [
      "ZHS"
    ],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-6411992668",
    "name": "Gloucester Road",
    "lat": 51.4945266,
    "lng": -0.1837696,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-6414013291",
    "name": "Marble Arch",
    "lat": 51.513435,
    "lng": -0.1582531,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-6414039764",
    "name": "Great Portland Street",
    "lat": 51.5238146,
    "lng": -0.1437048,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-6414086721",
    "name": "Warren Street",
    "lat": 51.5247178,
    "lng": -0.1385303,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-6414100096",
    "name": "Goodge Street",
    "lat": 51.5205978,
    "lng": -0.1343573,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-6414163635",
    "name": "Highbury & Islington",
    "lat": 51.5463679,
    "lng": -0.1036544,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail",
      "London Underground",
      "London Overground"
    ],
    "allTypes": [
      "national_rail",
      "tube",
      "overground"
    ]
  },
  {
    "id": "station-6436632903",
    "name": "Willesden Green",
    "lat": 51.5493524,
    "lng": -0.222223,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-6436648511",
    "name": "Kilburn",
    "lat": 51.5469889,
    "lng": -0.2053385,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-6438961931",
    "name": "Willesden Junction",
    "lat": 51.5321956,
    "lng": -0.2435041,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground",
      "London Overground"
    ],
    "allTypes": [
      "tube",
      "overground"
    ]
  },
  {
    "id": "station-6440680616",
    "name": "Westbourne Park",
    "lat": 51.5209265,
    "lng": -0.2014098,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-6452489646",
    "name": "Barking",
    "lat": 51.5402677,
    "lng": 0.0793235,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail",
      "London Underground",
      "London Overground"
    ],
    "allTypes": [
      "national_rail",
      "tube",
      "overground"
    ]
  },
  {
    "id": "station-6460794385",
    "name": "Ladbroke Grove",
    "lat": 51.5172639,
    "lng": -0.2111019,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-6466252813",
    "name": "Upney",
    "lat": 51.538266,
    "lng": 0.099626,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-6468357440",
    "name": "Queen's Park",
    "lat": 51.533873,
    "lng": -0.2054958,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground",
      "London Overground"
    ],
    "allTypes": [
      "tube",
      "overground"
    ]
  },
  {
    "id": "station-6472438171",
    "name": "Holland Park",
    "lat": 51.5071908,
    "lng": -0.2055243,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-6472516924",
    "name": "Euston Square",
    "lat": 51.5256866,
    "lng": -0.1355703,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-6474389245",
    "name": "Camden Road",
    "lat": 51.5419498,
    "lng": -0.1395276,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail",
      "London Overground"
    ],
    "allTypes": [
      "national_rail",
      "overground"
    ]
  },
  {
    "id": "station-6476798601",
    "name": "South Bermondsey",
    "lat": 51.4879512,
    "lng": -0.0544564,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6486933493",
    "name": "Queensway",
    "lat": 51.5104729,
    "lng": -0.1872329,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-6489626917",
    "name": "Cutty Sark for Maritime Greenwich",
    "lat": 51.4817267,
    "lng": -0.0107517,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "Docklands Light Railway"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6503115198",
    "name": "Maryland",
    "lat": 51.5460532,
    "lng": 0.0059223,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail",
      "Elizabeth line"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6514252665",
    "name": "West Hampstead",
    "lat": 51.5473011,
    "lng": -0.1920126,
    "lines": [],
    "type": "overground",
    "networks": [
      "London Overground"
    ],
    "allTypes": [
      "overground"
    ]
  },
  {
    "id": "station-6514289544",
    "name": "Tower Gateway",
    "lat": 51.5106288,
    "lng": -0.0739505,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "Docklands Light Railway"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6516411104",
    "name": "Lewisham",
    "lat": 51.4656437,
    "lng": -0.0139562,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6522206880",
    "name": "West Hampstead Thameslink",
    "lat": 51.5484242,
    "lng": -0.192322,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6539839675",
    "name": "Selhurst",
    "lat": 51.3922136,
    "lng": -0.0886537,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6585461978",
    "name": "Brockley",
    "lat": 51.4642287,
    "lng": -0.0376125,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail",
      "London Overground"
    ],
    "allTypes": [
      "national_rail",
      "overground"
    ]
  },
  {
    "id": "station-6593924753",
    "name": "Forest Gate",
    "lat": 51.549251,
    "lng": 0.0232808,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail",
      "Elizabeth line"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6677340894",
    "name": "Shortlands",
    "lat": 51.4059051,
    "lng": 0.0021679,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6689800286",
    "name": "West Dulwich",
    "lat": 51.4402849,
    "lng": -0.0908906,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6689800287",
    "name": "Sydenham Hill",
    "lat": 51.4326101,
    "lng": -0.0801504,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6689800288",
    "name": "Penge East",
    "lat": 51.4193151,
    "lng": -0.0541364,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6689800289",
    "name": "Kent House",
    "lat": 51.4122745,
    "lng": -0.045213,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6689800290",
    "name": "Beckenham Junction",
    "lat": 51.4110623,
    "lng": -0.0259866,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6689800291",
    "name": "Bickley",
    "lat": 51.4000641,
    "lng": 0.0443369,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6689800292",
    "name": "Bromley South",
    "lat": 51.4000405,
    "lng": 0.0182769,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6694775793",
    "name": "Nunhead",
    "lat": 51.4668348,
    "lng": -0.0523755,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6694775794",
    "name": "Crofton Park",
    "lat": 51.4552149,
    "lng": -0.0366299,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6694775795",
    "name": "Bellingham",
    "lat": 51.4328307,
    "lng": -0.0195194,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6694775796",
    "name": "Beckenham Hill",
    "lat": 51.4245222,
    "lng": -0.0159101,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6695079960",
    "name": "Ravensbourne",
    "lat": 51.4143132,
    "lng": -0.0076295,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6695079961",
    "name": "Loughborough Junction",
    "lat": 51.4662551,
    "lng": -0.1021612,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6753887325",
    "name": "Woodgrange Park",
    "lat": 51.549168,
    "lng": 0.0447283,
    "lines": [],
    "type": "overground",
    "networks": [
      "London Overground"
    ],
    "allTypes": [
      "overground"
    ]
  },
  {
    "id": "station-6758474985",
    "name": "Regent's Park",
    "lat": 51.5236277,
    "lng": -0.1466357,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-6758474986",
    "name": "Maida Vale",
    "lat": 51.5297928,
    "lng": -0.1857906,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-6758674587",
    "name": "Stratford International",
    "lat": 51.5447954,
    "lng": -0.0087494,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6774062195",
    "name": "Carshalton Beeches",
    "lat": 51.3571959,
    "lng": -0.1693507,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6774062196",
    "name": "Wallington",
    "lat": 51.3602348,
    "lng": -0.1505899,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6774489101",
    "name": "Streatham Common",
    "lat": 51.4185662,
    "lng": -0.1359263,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6774489102",
    "name": "Norbury",
    "lat": 51.4113697,
    "lng": -0.1218018,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6774489103",
    "name": "Thornton Heath",
    "lat": 51.3989438,
    "lng": -0.1005158,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6778324440",
    "name": "Lee",
    "lat": 51.4496733,
    "lng": 0.0146411,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6778324441",
    "name": "Mottingham",
    "lat": 51.4402515,
    "lng": 0.0499618,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6778324442",
    "name": "New Eltham",
    "lat": 51.4380136,
    "lng": 0.0709469,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6797794418",
    "name": "Borough",
    "lat": 51.5011444,
    "lng": -0.0932926,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-6831303077",
    "name": "Bethnal Green",
    "lat": 51.5238872,
    "lng": -0.059592,
    "lines": [],
    "type": "overground",
    "networks": [
      "London Overground"
    ],
    "allTypes": [
      "overground"
    ]
  },
  {
    "id": "pml",
    "name": "Pudding Mill Lane",
    "lat": 51.5338301,
    "lng": -0.0135365,
    "lines": [
      "PML"
    ],
    "type": "national_rail",
    "networks": [
      "Docklands Light Railway"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-6932246807",
    "name": "Bethnal Green",
    "lat": 51.5272449,
    "lng": -0.054752,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-6991113897",
    "name": "Dalston Kingsland",
    "lat": 51.5481908,
    "lng": -0.0760535,
    "lines": [],
    "type": "overground",
    "networks": [
      "London Overground"
    ],
    "allTypes": [
      "overground"
    ]
  },
  {
    "id": "station-6991125522",
    "name": "Peckham Rye",
    "lat": 51.4700059,
    "lng": -0.0694125,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail",
      "London Overground"
    ],
    "allTypes": [
      "national_rail",
      "overground"
    ]
  },
  {
    "id": "station-6991125994",
    "name": "Shepherd's Bush",
    "lat": 51.5057781,
    "lng": -0.2179221,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail",
      "London Overground"
    ],
    "allTypes": [
      "national_rail",
      "overground"
    ]
  },
  {
    "id": "station-6991130547",
    "name": "Shoreditch High Street",
    "lat": 51.5232534,
    "lng": -0.0744674,
    "lines": [],
    "type": "overground",
    "networks": [
      "London Overground"
    ],
    "allTypes": [
      "overground"
    ]
  },
  {
    "id": "station-6993429382",
    "name": "Kilburn High Road",
    "lat": 51.5377475,
    "lng": -0.1913533,
    "lines": [],
    "type": "overground",
    "networks": [
      "London Overground"
    ],
    "allTypes": [
      "overground"
    ]
  },
  {
    "id": "station-6993498103",
    "name": "Kentish Town West",
    "lat": 51.5469937,
    "lng": -0.1467554,
    "lines": [],
    "type": "overground",
    "networks": [
      "London Overground"
    ],
    "allTypes": [
      "overground"
    ]
  },
  {
    "id": "station-6993522055",
    "name": "Caledonian Road & Barnsbury",
    "lat": 51.5435462,
    "lng": -0.1148864,
    "lines": [],
    "type": "overground",
    "networks": [
      "London Overground"
    ],
    "allTypes": [
      "overground"
    ]
  },
  {
    "id": "station-6997686912",
    "name": "Cambridge Heath",
    "lat": 51.5319544,
    "lng": -0.0574215,
    "lines": [],
    "type": "overground",
    "networks": [
      "London Overground"
    ],
    "allTypes": [
      "overground"
    ]
  },
  {
    "id": "station-6997712296",
    "name": "Hackney Central",
    "lat": 51.5470605,
    "lng": -0.0568749,
    "lines": [],
    "type": "overground",
    "networks": [
      "London Overground"
    ],
    "allTypes": [
      "overground"
    ]
  },
  {
    "id": "station-7132027957",
    "name": "Heron Quays",
    "lat": 51.5029301,
    "lng": -0.0215033,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "Docklands Light Railway"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-7132087124",
    "name": "Woolwich Arsenal DLR",
    "lat": 51.4901052,
    "lng": 0.0695827,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "Docklands Light Railway"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-7132098495",
    "name": "Westferry",
    "lat": 51.5094025,
    "lng": -0.026644,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "Docklands Light Railway"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-7132099274",
    "name": "Island Gardens",
    "lat": 51.4880683,
    "lng": -0.0105052,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "Docklands Light Railway"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-7132105210",
    "name": "London Paddington",
    "lat": 51.5170952,
    "lng": -0.177317,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail\\",
      "Elizabeth line"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-7140186755",
    "name": "Charing Cross",
    "lat": 51.5074975,
    "lng": -0.1236888,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-7147478680",
    "name": "Brondesbury",
    "lat": 51.5450493,
    "lng": -0.2025961,
    "lines": [],
    "type": "overground",
    "networks": [
      "London Overground"
    ],
    "allTypes": [
      "overground"
    ]
  },
  {
    "id": "station-7147489878",
    "name": "Star Lane",
    "lat": 51.5205083,
    "lng": 0.0043357,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "Docklands Light Railway"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-7147489879",
    "name": "Shadwell",
    "lat": 51.5117593,
    "lng": -0.0554867,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "Docklands Light Railway"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-7147498859",
    "name": "Kensal Rise",
    "lat": 51.5344634,
    "lng": -0.2200978,
    "lines": [],
    "type": "overground",
    "networks": [
      "London Overground"
    ],
    "allTypes": [
      "overground"
    ]
  },
  {
    "id": "station-7147507684",
    "name": "Hackney Downs",
    "lat": 51.5486455,
    "lng": -0.060686,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail",
      "London Overground"
    ],
    "allTypes": [
      "national_rail",
      "overground"
    ]
  },
  {
    "id": "station-7147509462",
    "name": "Homerton",
    "lat": 51.5470789,
    "lng": -0.043121,
    "lines": [],
    "type": "overground",
    "networks": [
      "London Overground"
    ],
    "allTypes": [
      "overground"
    ]
  },
  {
    "id": "station-7147509511",
    "name": "Canonbury",
    "lat": 51.5485632,
    "lng": -0.0930239,
    "lines": [],
    "type": "overground",
    "networks": [
      "London Overground"
    ],
    "allTypes": [
      "overground"
    ]
  },
  {
    "id": "station-7147511743",
    "name": "Brondesbury Park",
    "lat": 51.5405138,
    "lng": -0.2103359,
    "lines": [],
    "type": "overground",
    "networks": [
      "London Overground"
    ],
    "allTypes": [
      "overground"
    ]
  },
  {
    "id": "station-7147521855",
    "name": "Hackney Wick",
    "lat": 51.5434383,
    "lng": -0.0241542,
    "lines": [],
    "type": "overground",
    "networks": [
      "London Overground"
    ],
    "allTypes": [
      "overground"
    ]
  },
  {
    "id": "station-7147535476",
    "name": "London Fields",
    "lat": 51.5410518,
    "lng": -0.0577737,
    "lines": [],
    "type": "overground",
    "networks": [
      "London Overground"
    ],
    "allTypes": [
      "overground"
    ]
  },
  {
    "id": "station-7147537626",
    "name": "South Hampstead",
    "lat": 51.5414337,
    "lng": -0.1788007,
    "lines": [],
    "type": "overground",
    "networks": [
      "London Overground"
    ],
    "allTypes": [
      "overground"
    ]
  },
  {
    "id": "station-7147548497",
    "name": "Devons Road",
    "lat": 51.5222078,
    "lng": -0.0172729,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "Docklands Light Railway"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-7147562182",
    "name": "Poplar",
    "lat": 51.5077131,
    "lng": -0.0172859,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "Docklands Light Railway"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-7147570291",
    "name": "Langdon Park",
    "lat": 51.5152051,
    "lng": -0.0141164,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "Docklands Light Railway"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-7158651920",
    "name": "Putney",
    "lat": 51.4609339,
    "lng": -0.2153478,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-7158669749",
    "name": "Essex Road",
    "lat": 51.5407328,
    "lng": -0.0961859,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-7159130435",
    "name": "Waterloo East",
    "lat": 51.5042171,
    "lng": -0.1082027,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-7159162454",
    "name": "London King's Cross",
    "lat": 51.5323954,
    "lng": -0.1230224,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-7159246417",
    "name": "Hayes",
    "lat": 51.3765959,
    "lng": 0.0095073,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-7159280033",
    "name": "Maze Hill",
    "lat": 51.4826479,
    "lng": 0.00375,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-7159366405",
    "name": "Falconwood",
    "lat": 51.4592305,
    "lng": 0.0793044,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-7159380474",
    "name": "Charlton",
    "lat": 51.4867602,
    "lng": 0.030809,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-7159509695",
    "name": "London Blackfriars",
    "lat": 51.5104871,
    "lng": -0.1032417,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-7860900545",
    "name": "Sundridge Park",
    "lat": 51.4139567,
    "lng": 0.021475,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-7860903088",
    "name": "West Norwood",
    "lat": 51.4316272,
    "lng": -0.1034911,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-7860903089",
    "name": "Gipsy Hill",
    "lat": 51.4245334,
    "lng": -0.0840424,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-7860903096",
    "name": "Birkbeck",
    "lat": 51.4034563,
    "lng": -0.0565394,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-7860903110",
    "name": "East Dulwich",
    "lat": 51.4610374,
    "lng": -0.0807982,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-8724517978",
    "name": "Tulse Hill",
    "lat": 51.4399271,
    "lng": -0.1048466,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-9097410038",
    "name": "Canary Wharf",
    "lat": 51.5061102,
    "lng": -0.0176241,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "Elizabeth line"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-9097860107",
    "name": "Nine Elms",
    "lat": 51.4801837,
    "lng": -0.1296937,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-9097860108",
    "name": "Battersea Power Station",
    "lat": 51.4796154,
    "lng": -0.1429709,
    "lines": [],
    "type": "tube",
    "networks": [
      "London Underground"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-9754369244",
    "name": "Custom House",
    "lat": 51.5098025,
    "lng": 0.0272279,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "Elizabeth line"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-9754536755",
    "name": "Bond Street",
    "lat": 51.5135348,
    "lng": -0.1470905,
    "lines": [],
    "type": "tube",
    "networks": [
      "Elizabeth line"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-9754554222",
    "name": "Tottenham Court Road",
    "lat": 51.515401,
    "lng": -0.1305917,
    "lines": [],
    "type": "tube",
    "networks": [
      "Elizabeth line"
    ],
    "allTypes": [
      "tube"
    ]
  },
  {
    "id": "station-12248739533",
    "name": "Paddington",
    "lat": 51.5163695,
    "lng": -0.1780083,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "Elizabeth line"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-12254780537",
    "name": "St Pancras International",
    "lat": 51.5322106,
    "lng": -0.1276185,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "National Rail"
    ],
    "allTypes": [
      "national_rail"
    ]
  },
  {
    "id": "station-12286269903",
    "name": "Liverpool Street",
    "lat": 51.5176474,
    "lng": -0.0864414,
    "lines": [],
    "type": "national_rail",
    "networks": [
      "Elizabeth line"
    ],
    "allTypes": [
      "national_rail"
    ]
  }
];

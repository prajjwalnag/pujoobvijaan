// Real pandal names + regions sourced from Kolkata's 2025 registered-pandal
// listings (indianfestivaldiary.com, cross-checked against Kolkata Police /
// news coverage for well-known pandals). Coordinates are approximate —
// jittered around each region's centroid, not geocoded addresses — and
// crowdLevel is a size/prominence tier (famous vs. neighbourhood puja),
// not live crowd data. Fields we have no verified source for (rating,
// visiting hours, nearest metro, theme, description) are intentionally
// left unset rather than fabricated; backfill them as real data becomes
// available.
import type { Pandal, Region, CrowdLevel } from "./types";

export const pandals: Pandal[] = [
  {
    id: "north-kolkata-1",
    name: "31 Pally Sadharan Durgotsab Samity",
    region: "North Kolkata",
    coordinates: {
      lat: 22.6054,
      lng: 88.38
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "north-kolkata-2",
    name: "Ahiritola Jubak Brinda Durga Puja",
    region: "North Kolkata",
    coordinates: {
      lat: 22.582,
      lng: 88.3727
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "north-kolkata-3",
    name: "Amherst Sarbojanin Durgotsab",
    region: "North Kolkata",
    coordinates: {
      lat: 22.6192,
      lng: 88.3858
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "north-kolkata-4",
    name: "Aswiningar Sarbojanin Durgotsav",
    region: "North Kolkata",
    coordinates: {
      lat: 22.5978,
      lng: 88.3517
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "north-kolkata-5",
    name: "Baghbazar Palli Puja O Pradarshani",
    region: "North Kolkata",
    coordinates: {
      lat: 22.6122,
      lng: 88.3837
    },
    crowdLevel: "high" as CrowdLevel
  },
  {
    id: "north-kolkata-6",
    name: "Bandhudal Durgotsob",
    region: "North Kolkata",
    coordinates: {
      lat: 22.5982,
      lng: 88.3768
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "north-kolkata-7",
    name: "Beadon Street Sarbojanin Durgotsav",
    region: "North Kolkata",
    coordinates: {
      lat: 22.617,
      lng: 88.3522
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "north-kolkata-8",
    name: "Belgachia Sadharan Durgotsab",
    region: "North Kolkata",
    coordinates: {
      lat: 22.5858,
      lng: 88.3714
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "north-kolkata-9",
    name: "Belgachia Yuba Sammilani Durga Puja",
    region: "North Kolkata",
    coordinates: {
      lat: 22.5861,
      lng: 88.3908
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "north-kolkata-10",
    name: "Bhagabati Park Durga Puja Committee",
    region: "North Kolkata",
    coordinates: {
      lat: 22.5842,
      lng: 88.3655
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "north-kolkata-11",
    name: "Bharatiya Tarun Sangha Durga Puja",
    region: "North Kolkata",
    coordinates: {
      lat: 22.6141,
      lng: 88.3695
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "north-kolkata-12",
    name: "Biswanath Apartment Sharodutsab",
    region: "North Kolkata",
    coordinates: {
      lat: 22.5955,
      lng: 88.3577
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "north-kolkata-13",
    name: "Brindaban Matri Mandir Durga Puja",
    region: "North Kolkata",
    coordinates: {
      lat: 22.5922,
      lng: 88.3816
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "north-kolkata-14",
    name: "Calcutta Youth Forum",
    region: "North Kolkata",
    coordinates: {
      lat: 22.613,
      lng: 88.3741
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "north-kolkata-15",
    name: "Campbagan Sadharan Durgotsav",
    region: "North Kolkata",
    coordinates: {
      lat: 22.5976,
      lng: 88.3871
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "north-kolkata-16",
    name: "Chaltabagan Lohapatty Durga Puja",
    region: "North Kolkata",
    coordinates: {
      lat: 22.5806,
      lng: 88.3822
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "north-kolkata-17",
    name: "Charer Palli Sarbojanin Durgotsab",
    region: "North Kolkata",
    coordinates: {
      lat: 22.5966,
      lng: 88.355
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "north-kolkata-18",
    name: "Chorebagan Sarbojanin Durgotsab Samity",
    region: "North Kolkata",
    coordinates: {
      lat: 22.5911,
      lng: 88.3869
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "north-kolkata-19",
    name: "Cossipore Shakti Sangha Durga Puja",
    region: "North Kolkata",
    coordinates: {
      lat: 22.6068,
      lng: 88.3762
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "north-kolkata-20",
    name: "Dakshin Rabindrapally Sarbojanin Durga Puja",
    region: "North Kolkata",
    coordinates: {
      lat: 22.5759,
      lng: 88.383
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "north-kolkata-21",
    name: "Darjeepara Sarbojanin Durgotsab Samity",
    region: "North Kolkata",
    coordinates: {
      lat: 22.5894,
      lng: 88.3565
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "north-kolkata-22",
    name: "Deshbandhunagar Sarbojanin Durgotsab",
    region: "North Kolkata",
    coordinates: {
      lat: 22.585,
      lng: 88.3542
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "north-kolkata-23",
    name: "Dum Dum Park Bharat Chakra Durga Puja",
    region: "North Kolkata",
    coordinates: {
      lat: 22.6004,
      lng: 88.3862
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "north-kolkata-24",
    name: "Dum Dum Park Sarbojanin Durga Puja",
    region: "North Kolkata",
    coordinates: {
      lat: 22.6137,
      lng: 88.3511
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "north-kolkata-25",
    name: "Durbar Mahila Samanya Committee",
    region: "North Kolkata",
    coordinates: {
      lat: 22.6159,
      lng: 88.3784
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "north-kolkata-26",
    name: "Garden Lane Sarbojanin Durgotsab",
    region: "North Kolkata",
    coordinates: {
      lat: 22.5874,
      lng: 88.3729
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "north-kolkata-27",
    name: "Goabagan Sarodatsav Sammilani Durga Puja",
    region: "North Kolkata",
    coordinates: {
      lat: 22.5889,
      lng: 88.3623
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "north-kolkata-28",
    name: "Golaghata Sammilani Durga Puja",
    region: "North Kolkata",
    coordinates: {
      lat: 22.6033,
      lng: 88.3791
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "north-kolkata-29",
    name: "Grey Street Sarbojanin Durga Puja",
    region: "North Kolkata",
    coordinates: {
      lat: 22.5819,
      lng: 88.3687
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "north-kolkata-30",
    name: "Halsibagan Sarbojanin Durgotsab",
    region: "North Kolkata",
    coordinates: {
      lat: 22.6002,
      lng: 88.3907
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "north-kolkata-31",
    name: "Hari Ghosh Street Sarbojanin",
    region: "North Kolkata",
    coordinates: {
      lat: 22.5948,
      lng: 88.3728
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "north-kolkata-32",
    name: "Hari Ghosh Street Swamiji Sangha Sarbojanin Durga Puja",
    region: "North Kolkata",
    coordinates: {
      lat: 22.6145,
      lng: 88.3793
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "north-kolkata-33",
    name: "Haritaki Bagan Sarbojanin Durgotsab",
    region: "North Kolkata",
    coordinates: {
      lat: 22.619,
      lng: 88.378
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "north-kolkata-34",
    name: "Hatibagan Nabinpally Sarbojanin Durgotsav",
    region: "North Kolkata",
    coordinates: {
      lat: 22.5844,
      lng: 88.3769
    },
    crowdLevel: "high" as CrowdLevel
  },
  {
    id: "north-kolkata-35",
    name: "Jagat Mukherjee Park Durga Puja",
    region: "North Kolkata",
    coordinates: {
      lat: 22.6011,
      lng: 88.3574
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "north-kolkata-36",
    name: "Jokermath Sarbojonin Durga Puja",
    region: "North Kolkata",
    coordinates: {
      lat: 22.6102,
      lng: 88.387
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "north-kolkata-37",
    name: "Kailash Bose Street Durga Puja",
    region: "North Kolkata",
    coordinates: {
      lat: 22.6091,
      lng: 88.3838
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "north-kolkata-38",
    name: "Kankurgachi Sarbojanin Durgotsab",
    region: "North Kolkata",
    coordinates: {
      lat: 22.6096,
      lng: 88.3703
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "north-kolkata-39",
    name: "Kashi Bose Lane Durga Puja Committee",
    region: "North Kolkata",
    coordinates: {
      lat: 22.6022,
      lng: 88.3732
    },
    crowdLevel: "high" as CrowdLevel
  },
  {
    id: "north-kolkata-40",
    name: "Kumartuli Park Sarbojanin Durgotsab Committee",
    region: "North Kolkata",
    coordinates: {
      lat: 22.5904,
      lng: 88.3798
    },
    crowdLevel: "high" as CrowdLevel
  },
  {
    id: "north-kolkata-41",
    name: "Kumartuli Sarbojanin Durgotsab",
    region: "North Kolkata",
    coordinates: {
      lat: 22.5781,
      lng: 88.3791
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "north-kolkata-42",
    name: "Lake View Park Sarbojanin Durgotsav Samity",
    region: "North Kolkata",
    coordinates: {
      lat: 22.6145,
      lng: 88.3841
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "north-kolkata-43",
    name: "Mahalla Sarbojanin Durgautsab Samity",
    region: "North Kolkata",
    coordinates: {
      lat: 22.6182,
      lng: 88.3756
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "north-kolkata-44",
    name: "Mitali Kankurgachi Durga Puja",
    region: "North Kolkata",
    coordinates: {
      lat: 22.5853,
      lng: 88.3574
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "north-kolkata-45",
    name: "Mohan Bagan Barwari Durga Puja",
    region: "North Kolkata",
    coordinates: {
      lat: 22.5864,
      lng: 88.355
    },
    crowdLevel: "high" as CrowdLevel
  },
  {
    id: "north-kolkata-46",
    name: "Mondal Para Sporting Club Durga Puja",
    region: "North Kolkata",
    coordinates: {
      lat: 22.5981,
      lng: 88.3859
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "north-kolkata-47",
    name: "Nainan Para & Jogendra Basak Road Sarbojanin Shree Shree Durgapuja",
    region: "North Kolkata",
    coordinates: {
      lat: 22.6172,
      lng: 88.39
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "north-kolkata-48",
    name: "Nalin Sarkar Street Sarbojanin Durgotsab",
    region: "North Kolkata",
    coordinates: {
      lat: 22.5977,
      lng: 88.3621
    },
    crowdLevel: "high" as CrowdLevel
  },
  {
    id: "north-kolkata-49",
    name: "Nimta Boy's Athletic Club Sarbojanin Durgotsav",
    region: "North Kolkata",
    coordinates: {
      lat: 22.5933,
      lng: 88.3765
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "north-kolkata-50",
    name: "Nimtala Sarbojanin Durgotsab",
    region: "North Kolkata",
    coordinates: {
      lat: 22.59,
      lng: 88.3902
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "north-kolkata-51",
    name: "North Tangra Durga Puja",
    region: "North Kolkata",
    coordinates: {
      lat: 22.5863,
      lng: 88.3761
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "north-kolkata-52",
    name: "North Tridhara Sarbojanin Durga Puja",
    region: "North Kolkata",
    coordinates: {
      lat: 22.5757,
      lng: 88.3716
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "north-kolkata-53",
    name: "Nutan Pally Sarbojanin Durgotsab",
    region: "North Kolkata",
    coordinates: {
      lat: 22.6084,
      lng: 88.3536
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "north-kolkata-54",
    name: "Pathuria Ghata Pancher Palli Sarbojanin",
    region: "North Kolkata",
    coordinates: {
      lat: 22.602,
      lng: 88.3621
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "north-kolkata-55",
    name: "Ramesh Dutta Street Sarbojanin Durgotsab",
    region: "North Kolkata",
    coordinates: {
      lat: 22.5942,
      lng: 88.3621
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "north-kolkata-56",
    name: "Rammohan Sammilani Durga Puja",
    region: "North Kolkata",
    coordinates: {
      lat: 22.6176,
      lng: 88.3567
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "north-kolkata-57",
    name: "Sadhukhan Bari Durga Puja",
    region: "North Kolkata",
    coordinates: {
      lat: 22.5817,
      lng: 88.3729
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "north-kolkata-58",
    name: "Sammilita Lalabagan Sarbojanin Durga Puja",
    region: "North Kolkata",
    coordinates: {
      lat: 22.586,
      lng: 88.3734
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "north-kolkata-59",
    name: "Sarkar Bagan Sammilita Sangha Durga Puja",
    region: "North Kolkata",
    coordinates: {
      lat: 22.5835,
      lng: 88.3633
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "north-kolkata-60",
    name: "Sater Palli Sarbojanin Durgotsav",
    region: "North Kolkata",
    coordinates: {
      lat: 22.606,
      lng: 88.3852
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "north-kolkata-61",
    name: "Shyambazar Nabin Sangha Durga Puja",
    region: "North Kolkata",
    coordinates: {
      lat: 22.5847,
      lng: 88.3547
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "north-kolkata-62",
    name: "Signum Aristo Residential Puja",
    region: "North Kolkata",
    coordinates: {
      lat: 22.6053,
      lng: 88.3652
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "north-kolkata-63",
    name: "Sikdar Bagan Sadharan Durgotsov",
    region: "North Kolkata",
    coordinates: {
      lat: 22.6174,
      lng: 88.3749
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "north-kolkata-64",
    name: "Simla Sporting Club Durga Puja",
    region: "North Kolkata",
    coordinates: {
      lat: 22.5943,
      lng: 88.3854
    },
    crowdLevel: "high" as CrowdLevel
  },
  {
    id: "north-kolkata-65",
    name: "Sovabazar Sarbojanin Durgotsav",
    region: "North Kolkata",
    coordinates: {
      lat: 22.6126,
      lng: 88.368
    },
    crowdLevel: "high" as CrowdLevel
  },
  {
    id: "north-kolkata-66",
    name: "Sreebhumi Sporting Club Durga Puja",
    region: "North Kolkata",
    coordinates: {
      lat: 22.5775,
      lng: 88.3702
    },
    crowdLevel: "high" as CrowdLevel
  },
  {
    id: "north-kolkata-67",
    name: "Tala Barowari Durgotsab",
    region: "North Kolkata",
    coordinates: {
      lat: 22.5834,
      lng: 88.3888
    },
    crowdLevel: "high" as CrowdLevel
  },
  {
    id: "north-kolkata-68",
    name: "Tala Dakshin Pally Durgotsav Committee",
    region: "North Kolkata",
    coordinates: {
      lat: 22.6031,
      lng: 88.3646
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "north-kolkata-69",
    name: "Tala Park 15 Pally Durga Puja",
    region: "North Kolkata",
    coordinates: {
      lat: 22.5817,
      lng: 88.3583
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "north-kolkata-70",
    name: "Telengabagan Sarbojanin Durgotsab",
    region: "North Kolkata",
    coordinates: {
      lat: 22.5782,
      lng: 88.3702
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "north-kolkata-71",
    name: "Ultadanga Jagarani Sangha Durga Puja",
    region: "North Kolkata",
    coordinates: {
      lat: 22.5751,
      lng: 88.3673
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "north-kolkata-72",
    name: "Ultadanga Pallyshree Durga Puja",
    region: "North Kolkata",
    coordinates: {
      lat: 22.5935,
      lng: 88.3567
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "north-kolkata-73",
    name: "Ultadanga Sangrami Durga Puja",
    region: "North Kolkata",
    coordinates: {
      lat: 22.5746,
      lng: 88.3643
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "north-kolkata-74",
    name: "Young Citizens Club Durga Puja",
    region: "North Kolkata",
    coordinates: {
      lat: 22.5792,
      lng: 88.3679
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-75",
    name: "21 Pally Sarbojanin Durgotsab Samiti",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4866,
      lng: 88.3549
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "south-kolkata-76",
    name: "22 Palli Sarodotsav",
    region: "South Kolkata",
    coordinates: {
      lat: 22.503,
      lng: 88.3552
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-77",
    name: "25 Pally Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.501,
      lng: 88.3419
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-78",
    name: "64 Pally Durgotsab Committee",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4994,
      lng: 88.3499
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "south-kolkata-79",
    name: "66 Pally Sarbojanin Durgotsab Committee",
    region: "South Kolkata",
    coordinates: {
      lat: 22.5143,
      lng: 88.3289
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-80",
    name: "70 Pally Sarbojanin Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4958,
      lng: 88.3454
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-81",
    name: "95 Pally Jodhpur Park Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4788,
      lng: 88.3437
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "south-kolkata-82",
    name: "Abasar Sarbojanin Durgotsab Committee",
    region: "South Kolkata",
    coordinates: {
      lat: 22.5059,
      lng: 88.3694
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-83",
    name: "Abasorika Durgotsav Committee",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4852,
      lng: 88.3538
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-84",
    name: "Adi Ballygunge Sarbojanin Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.485,
      lng: 88.3364
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "south-kolkata-85",
    name: "Adi Dakshin Kalikata Barowari Samittee",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4775,
      lng: 88.3476
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-86",
    name: "Agradut Udaya Sangha Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.5067,
      lng: 88.35
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-87",
    name: "Arunodaya Adhibashi Brinder Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.5042,
      lng: 88.3467
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "south-kolkata-88",
    name: "Avijan Gandhi Colony",
    region: "South Kolkata",
    coordinates: {
      lat: 22.5084,
      lng: 88.3438
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-89",
    name: "Babu Bagan Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.489,
      lng: 88.3514
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-90",
    name: "Badamtala Ashar Sangha Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.5033,
      lng: 88.3556
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "south-kolkata-91",
    name: "Baghajatin B and C Block Durgotsav Committee",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4925,
      lng: 88.3414
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-92",
    name: "Baghajatin Tarun Sangha Durgotsav",
    region: "South Kolkata",
    coordinates: {
      lat: 22.5044,
      lng: 88.3288
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-93",
    name: "Baishnabghata Paschimpara Sarbojanin Durgotsab",
    region: "South Kolkata",
    coordinates: {
      lat: 22.514,
      lng: 88.3593
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "south-kolkata-94",
    name: "Ballygunge Cultural Association Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.5085,
      lng: 88.3676
    },
    crowdLevel: "high" as CrowdLevel
  },
  {
    id: "south-kolkata-95",
    name: "Ballygunge Pally Sarbojanin Durgotsab Committee",
    region: "South Kolkata",
    coordinates: {
      lat: 22.516,
      lng: 88.359
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-96",
    name: "Bansdroni Sammilita Sarbojanin Durgotsab Committee",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4778,
      lng: 88.3614
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "south-kolkata-97",
    name: "Bediadanga Sarbojanin Durgotsav Committee",
    region: "South Kolkata",
    coordinates: {
      lat: 22.478,
      lng: 88.3395
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-98",
    name: "Beltala Sarbojanin Durgotsab",
    region: "South Kolkata",
    coordinates: {
      lat: 22.506,
      lng: 88.3472
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-99",
    name: "Bengal United Club Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.5128,
      lng: 88.3361
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "south-kolkata-100",
    name: "Bhawanipore Mahapuja Samity",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4856,
      lng: 88.3494
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-101",
    name: "Bhowanipore De Bari Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.5181,
      lng: 88.3497
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-102",
    name: "Bhowanipore Mitra Bari Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4966,
      lng: 88.349
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "south-kolkata-103",
    name: "Bhowanipur 75 Palli Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.5001,
      lng: 88.3372
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-104",
    name: "Bhowanipur Muktadal Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4935,
      lng: 88.3462
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-105",
    name: "Bhowanipur Ritwik Club Durga Puja Committee",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4961,
      lng: 88.3696
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "south-kolkata-106",
    name: "Bhowanipur Sarbojanin Durgotsav",
    region: "South Kolkata",
    coordinates: {
      lat: 22.5113,
      lng: 88.366
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-107",
    name: "Bhowanipur Students Club Sarbojanin Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.5223,
      lng: 88.3565
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-108",
    name: "Bhowanipur Swadhin Sangha Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4814,
      lng: 88.3359
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "south-kolkata-109",
    name: "Bhowanipur Udayan Club Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4865,
      lng: 88.348
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-110",
    name: "Bidhan Nagar South Atheletics Club",
    region: "South Kolkata",
    coordinates: {
      lat: 22.5038,
      lng: 88.3378
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-111",
    name: "Bidhanpally Purbapara Sarbojanin",
    region: "South Kolkata",
    coordinates: {
      lat: 22.5015,
      lng: 88.337
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "south-kolkata-112",
    name: "Bosepukur Talbagan Sarbojanin",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4826,
      lng: 88.3567
    },
    crowdLevel: "high" as CrowdLevel
  },
  {
    id: "south-kolkata-113",
    name: "Brahmapur Harisava Sarbojanin Durgotsab",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4975,
      lng: 88.3691
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-114",
    name: "Chetla Agrani Club Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4986,
      lng: 88.3604
    },
    crowdLevel: "high" as CrowdLevel
  },
  {
    id: "south-kolkata-115",
    name: "Chetla Sarbasadharaner Durgotsab",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4817,
      lng: 88.3287
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-116",
    name: "Coal India Puja Committee Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.5096,
      lng: 88.3692
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-117",
    name: "Dakshin Kolkata Sarbojanin Durgotsab",
    region: "South Kolkata",
    coordinates: {
      lat: 22.5044,
      lng: 88.3487
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "south-kolkata-118",
    name: "Dakshin Kolkata Tarun Samity Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4939,
      lng: 88.3662
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-119",
    name: "Deshapriya Park Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.52,
      lng: 88.3501
    },
    crowdLevel: "high" as CrowdLevel
  },
  {
    id: "south-kolkata-120",
    name: "Dhakuria Pragati Sangha Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.518,
      lng: 88.3392
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "south-kolkata-121",
    name: "Dhakuria Sarbojanin Durgotsab",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4832,
      lng: 88.3587
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-122",
    name: "Ekdalia Evergreen Club Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.5091,
      lng: 88.3666
    },
    crowdLevel: "high" as CrowdLevel
  },
  {
    id: "south-kolkata-123",
    name: "Falguni Sangha Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4876,
      lng: 88.3414
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "south-kolkata-124",
    name: "Garfa Sarbojanin Durgotsav",
    region: "South Kolkata",
    coordinates: {
      lat: 22.489,
      lng: 88.3325
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-125",
    name: "Goala Para Five Star Sporting Club",
    region: "South Kolkata",
    coordinates: {
      lat: 22.5196,
      lng: 88.3711
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-126",
    name: "Golpark Sarbojanin Durgotsab Committee",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4918,
      lng: 88.3505
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "south-kolkata-127",
    name: "Gopal Nagar Kalyan Sangha Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4903,
      lng: 88.3629
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-128",
    name: "Harish Park Sarbojanin Durgotsab Samity",
    region: "South Kolkata",
    coordinates: {
      lat: 22.5031,
      lng: 88.3716
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-129",
    name: "Hindustan Pally Durga Puja Committee",
    region: "South Kolkata",
    coordinates: {
      lat: 22.5144,
      lng: 88.3538
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "south-kolkata-130",
    name: "Jagaran Club Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.5066,
      lng: 88.3292
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-131",
    name: "Jubamaitry Kalighat Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.5212,
      lng: 88.3279
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-132",
    name: "Kalighat Nepal Bhattacharjee Street Club",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4887,
      lng: 88.3558
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "south-kolkata-133",
    name: "Kansaripara Sarbojanin Sarodotsab Committee",
    region: "South Kolkata",
    coordinates: {
      lat: 22.5136,
      lng: 88.3459
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-134",
    name: "Kasba R.K. Chatterjee Road Adhibasi Brinda Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.5142,
      lng: 88.3559
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-135",
    name: "Kasba Renaissance Club",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4951,
      lng: 88.3426
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "south-kolkata-136",
    name: "Kasba Shakti Sangha Pallybasi Durgotsav Samity",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4857,
      lng: 88.358
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-137",
    name: "Ketopole Sammilani Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.5172,
      lng: 88.3498
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-138",
    name: "Keyatala Pally Samity Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4945,
      lng: 88.3435
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "south-kolkata-139",
    name: "Kheyali Sangha Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.491,
      lng: 88.3476
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-140",
    name: "Khidderpore Sarbojanin Durgotsab",
    region: "South Kolkata",
    coordinates: {
      lat: 22.5028,
      lng: 88.3477
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-141",
    name: "Khidderpur 75 Pally Sarbojanin Durgotsab Committee",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4856,
      lng: 88.3432
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "south-kolkata-142",
    name: "Kidderpore Jubaghosthi Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.5145,
      lng: 88.3663
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-143",
    name: "Kidderpore Pally Saradiya Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.507,
      lng: 88.3567
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-144",
    name: "Lake Gardens Peoples Association Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.5172,
      lng: 88.3329
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "south-kolkata-145",
    name: "Lake Youth Corner Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.5193,
      lng: 88.3391
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-146",
    name: "Mahamayatala Sarbojanin Durgotsab",
    region: "South Kolkata",
    coordinates: {
      lat: 22.5142,
      lng: 88.369
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-147",
    name: "Megacity Residents Puja Committee",
    region: "South Kolkata",
    coordinates: {
      lat: 22.5082,
      lng: 88.3628
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "south-kolkata-148",
    name: "Mohila Mahal Club Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4827,
      lng: 88.3603
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-149",
    name: "Monohar Pukur Baisakhi Sangha",
    region: "South Kolkata",
    coordinates: {
      lat: 22.5068,
      lng: 88.3425
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-150",
    name: "Mudiali Club Sarbojanin Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4832,
      lng: 88.3284
    },
    crowdLevel: "high" as CrowdLevel
  },
  {
    id: "south-kolkata-151",
    name: "N.S.C. Sports Club Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4838,
      lng: 88.3376
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-152",
    name: "Naktala Udayan Sangha Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4899,
      lng: 88.3551
    },
    crowdLevel: "high" as CrowdLevel
  },
  {
    id: "south-kolkata-153",
    name: "Naskarpara Sarbojanin Durgotsav",
    region: "South Kolkata",
    coordinates: {
      lat: 22.5143,
      lng: 88.3705
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "south-kolkata-154",
    name: "New Alipore Suruchi Sangha Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4948,
      lng: 88.3407
    },
    crowdLevel: "high" as CrowdLevel
  },
  {
    id: "south-kolkata-155",
    name: "New Santoshpur Adi Durgotsab",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4911,
      lng: 88.3336
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-156",
    name: "Paddapukur Barwari Samity",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4796,
      lng: 88.3304
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "south-kolkata-157",
    name: "Paddapukur Youth Association Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.5037,
      lng: 88.3508
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-158",
    name: "Pally Mangal Samity Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4866,
      lng: 88.3452
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-159",
    name: "Panchanna Gram Adhibasibrinda",
    region: "South Kolkata",
    coordinates: {
      lat: 22.5222,
      lng: 88.3444
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "south-kolkata-160",
    name: "Paschim Putiary Sarbojanin Nabo Durgotsav",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4842,
      lng: 88.3513
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-161",
    name: "Patuli Sarbojanin Durgotsab",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4981,
      lng: 88.3329
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-162",
    name: "Peyarabagan Sarbojanin Durgotsab",
    region: "South Kolkata",
    coordinates: {
      lat: 22.518,
      lng: 88.3625
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "south-kolkata-163",
    name: "Picnic Sunrise Club",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4976,
      lng: 88.3397
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-164",
    name: "Pragati Sangha Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.5057,
      lng: 88.3438
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-165",
    name: "Pragati Sangha Durgotsab Committee",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4994,
      lng: 88.3712
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "south-kolkata-166",
    name: "Purbachal Residents Sarbojanin Durgotsav",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4988,
      lng: 88.3297
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-167",
    name: "Putiary Sarbojanin Durgotsab Committee",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4775,
      lng: 88.3553
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-168",
    name: "Ramgarh Satapally Sarbojanin Durgotsav Committee",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4931,
      lng: 88.3706
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "south-kolkata-169",
    name: "Rashbehari Suhrid Sangha",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4826,
      lng: 88.359
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-170",
    name: "Russa Madhyapally Sarbojanin Durgotsav",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4883,
      lng: 88.3662
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-171",
    name: "Sahapur Suhrid Sangha Durga Puja Committee",
    region: "South Kolkata",
    coordinates: {
      lat: 22.5195,
      lng: 88.3489
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "south-kolkata-172",
    name: "Sammilani Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.5066,
      lng: 88.3601
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-173",
    name: "Sanghasree Kalighat Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4855,
      lng: 88.3603
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-174",
    name: "Santoshpur Avenue South",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4861,
      lng: 88.3502
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "south-kolkata-175",
    name: "Santoshpur Lake Pally Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4978,
      lng: 88.3593
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-176",
    name: "Santoshpur Trikon Park Durgotsab",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4804,
      lng: 88.3348
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-177",
    name: "Shibmandir Sarbojanin Durgotsab Samiti",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4778,
      lng: 88.3342
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "south-kolkata-178",
    name: "Singhi Park Sarbojanin Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4847,
      lng: 88.3554
    },
    crowdLevel: "high" as CrowdLevel
  },
  {
    id: "south-kolkata-179",
    name: "Sonarpur Sarbojanin Durgotsav Puja Committee",
    region: "South Kolkata",
    coordinates: {
      lat: 22.5093,
      lng: 88.3725
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-180",
    name: "Sri Sri Sarbojanin Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4794,
      lng: 88.3444
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "south-kolkata-181",
    name: "Surya Nagar Sarbojanin Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.5193,
      lng: 88.3609
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-182",
    name: "Tridhara Sammilani Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4828,
      lng: 88.3312
    },
    crowdLevel: "high" as CrowdLevel
  },
  {
    id: "south-kolkata-183",
    name: "Tulipians Durgotsav",
    region: "South Kolkata",
    coordinates: {
      lat: 22.5068,
      lng: 88.3303
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "south-kolkata-184",
    name: "Udayan Kidderpore Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.5028,
      lng: 88.3651
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-185",
    name: "Upohar Utsav Committee",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4991,
      lng: 88.3668
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "south-kolkata-186",
    name: "VIP Nagar Sarbojanin Durga Puja Committee",
    region: "South Kolkata",
    coordinates: {
      lat: 22.4808,
      lng: 88.368
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "south-kolkata-187",
    name: "Westend Park Sarbojanin Durga Puja",
    region: "South Kolkata",
    coordinates: {
      lat: 22.505,
      lng: 88.3668
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "central-kolkata-188",
    name: "14 Pally Udayan Sangha",
    region: "Central Kolkata",
    coordinates: {
      lat: 22.5521,
      lng: 88.3626
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "central-kolkata-189",
    name: "37 Pally Sarbojanin Durgotsab",
    region: "Central Kolkata",
    coordinates: {
      lat: 22.5789,
      lng: 88.3689
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "central-kolkata-190",
    name: "47 Pally Jubak Brinda Durga Puja",
    region: "Central Kolkata",
    coordinates: {
      lat: 22.5559,
      lng: 88.3689
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "central-kolkata-191",
    name: "Central Calcutta Youth Association",
    region: "Central Kolkata",
    coordinates: {
      lat: 22.5448,
      lng: 88.3615
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "central-kolkata-192",
    name: "College Square Sarbojanin Durgotsav",
    region: "Central Kolkata",
    coordinates: {
      lat: 22.5871,
      lng: 88.3371
    },
    crowdLevel: "high" as CrowdLevel
  },
  {
    id: "central-kolkata-193",
    name: "Entally Matribhumi Durga Puja",
    region: "Central Kolkata",
    coordinates: {
      lat: 22.5438,
      lng: 88.3542
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "central-kolkata-194",
    name: "Entally Sarbojanin Sri Sri Durga Puja",
    region: "Central Kolkata",
    coordinates: {
      lat: 22.5803,
      lng: 88.3414
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "central-kolkata-195",
    name: "Interact Club of Chowringhee High School Sarbojanin Durga Puja",
    region: "Central Kolkata",
    coordinates: {
      lat: 22.5728,
      lng: 88.3517
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "central-kolkata-196",
    name: "Kanai Dhar Lane Adhibasi Brinda",
    region: "Central Kolkata",
    coordinates: {
      lat: 22.5493,
      lng: 88.369
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "central-kolkata-197",
    name: "Machua Bazar Sarbajanik Durga Puja Samity",
    region: "Central Kolkata",
    coordinates: {
      lat: 22.5864,
      lng: 88.3365
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "central-kolkata-198",
    name: "Md. Ali Park Durga Puja",
    region: "Central Kolkata",
    coordinates: {
      lat: 22.5681,
      lng: 88.3375
    },
    crowdLevel: "high" as CrowdLevel
  },
  {
    id: "central-kolkata-199",
    name: "New Market Sarbojanin Sri Sri Durga Puja",
    region: "Central Kolkata",
    coordinates: {
      lat: 22.5854,
      lng: 88.3406
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "central-kolkata-200",
    name: "Pallir Yubak Brinda Durga Puja",
    region: "Central Kolkata",
    coordinates: {
      lat: 22.5631,
      lng: 88.3576
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "central-kolkata-201",
    name: "Santosh Mitra Square Durga Puja",
    region: "Central Kolkata",
    coordinates: {
      lat: 22.5767,
      lng: 88.3535
    },
    crowdLevel: "high" as CrowdLevel
  },
  {
    id: "central-kolkata-202",
    name: "Shishu Palan Foundation",
    region: "Central Kolkata",
    coordinates: {
      lat: 22.5814,
      lng: 88.3672
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "central-kolkata-203",
    name: "Wellington Nagarik Kalyan Samity Durga Puja",
    region: "Central Kolkata",
    coordinates: {
      lat: 22.5597,
      lng: 88.3609
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "west-kolkata-204",
    name: "2 No Basudebpur Sarbojanin Durga Puja",
    region: "West Kolkata",
    coordinates: {
      lat: 22.5663,
      lng: 88.3205
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "west-kolkata-205",
    name: "7er Pally Sarbojanin Durga Puja Committee",
    region: "West Kolkata",
    coordinates: {
      lat: 22.578,
      lng: 88.3037
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "west-kolkata-206",
    name: "Acharya Prafulla Sangha",
    region: "West Kolkata",
    coordinates: {
      lat: 22.569,
      lng: 88.3006
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "west-kolkata-207",
    name: "Ajeya Sanghati Durga Puja",
    region: "West Kolkata",
    coordinates: {
      lat: 22.5792,
      lng: 88.288
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "west-kolkata-208",
    name: "Barisha Kumarpara Youngs' Club Durga Puja",
    region: "West Kolkata",
    coordinates: {
      lat: 22.6026,
      lng: 88.3056
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "west-kolkata-209",
    name: "Barisha Maitree Sangha Durgotsab",
    region: "West Kolkata",
    coordinates: {
      lat: 22.5903,
      lng: 88.2996
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "west-kolkata-210",
    name: "Barisha Milani Sangha Durga Puja",
    region: "West Kolkata",
    coordinates: {
      lat: 22.5708,
      lng: 88.3252
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "west-kolkata-211",
    name: "Barisha Netaji Sangha Durga Puja",
    region: "West Kolkata",
    coordinates: {
      lat: 22.5693,
      lng: 88.2897
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "west-kolkata-212",
    name: "Barisha Sarbojanin Durgotsab",
    region: "West Kolkata",
    coordinates: {
      lat: 22.584,
      lng: 88.3024
    },
    crowdLevel: "high" as CrowdLevel
  },
  {
    id: "west-kolkata-213",
    name: "Barisha Saterpalli Sammilani Durga Puja",
    region: "West Kolkata",
    coordinates: {
      lat: 22.5992,
      lng: 88.3176
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "west-kolkata-214",
    name: "Behala 11 Pally Durga Puja",
    region: "West Kolkata",
    coordinates: {
      lat: 22.5647,
      lng: 88.3116
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "west-kolkata-215",
    name: "Behala Arunoday Samity",
    region: "West Kolkata",
    coordinates: {
      lat: 22.5983,
      lng: 88.3225
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "west-kolkata-216",
    name: "Behala Buroshibtala Janakalyan Sangha Durga Puja",
    region: "West Kolkata",
    coordinates: {
      lat: 22.5684,
      lng: 88.2956
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "west-kolkata-217",
    name: "Behala Debdaru Fatak Durga Puja",
    region: "West Kolkata",
    coordinates: {
      lat: 22.5662,
      lng: 88.3141
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "west-kolkata-218",
    name: "Behala Mitra Sangha Durga Puja",
    region: "West Kolkata",
    coordinates: {
      lat: 22.6046,
      lng: 88.3153
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "west-kolkata-219",
    name: "Behala Mukul Sangha Durgotsab",
    region: "West Kolkata",
    coordinates: {
      lat: 22.6004,
      lng: 88.3145
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "west-kolkata-220",
    name: "Bishalaxmitala Sarbojanin Durga Puja",
    region: "West Kolkata",
    coordinates: {
      lat: 22.5905,
      lng: 88.3027
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "west-kolkata-221",
    name: "Genexx Valley Durga Puja",
    region: "West Kolkata",
    coordinates: {
      lat: 22.5833,
      lng: 88.3077
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "west-kolkata-222",
    name: "Haridevpur New Sporting Club Durga Puja",
    region: "West Kolkata",
    coordinates: {
      lat: 22.6056,
      lng: 88.2896
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "west-kolkata-223",
    name: "Haru Chandra Sporting Club",
    region: "West Kolkata",
    coordinates: {
      lat: 22.6012,
      lng: 88.3152
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "west-kolkata-224",
    name: "Jayasree Sarbojanin Durgotsab Samity",
    region: "West Kolkata",
    coordinates: {
      lat: 22.5646,
      lng: 88.303
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "west-kolkata-225",
    name: "Joyrampur Sarbojanin Durga Puja Committee",
    region: "West Kolkata",
    coordinates: {
      lat: 22.575,
      lng: 88.3157
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "west-kolkata-226",
    name: "Monmohan Park Sarbojanin Durgotsab",
    region: "West Kolkata",
    coordinates: {
      lat: 22.5801,
      lng: 88.3275
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "west-kolkata-227",
    name: "Nabarun Sangha Durga Puja",
    region: "West Kolkata",
    coordinates: {
      lat: 22.5856,
      lng: 88.3107
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "west-kolkata-228",
    name: "Palli Asar Sporting Club Durga Puja",
    region: "West Kolkata",
    coordinates: {
      lat: 22.6039,
      lng: 88.3047
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "west-kolkata-229",
    name: "Palli Unnayan Samity Durga Puja",
    region: "West Kolkata",
    coordinates: {
      lat: 22.5908,
      lng: 88.2895
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "west-kolkata-230",
    name: "Parnasree Club Sarbojanin Durgotsav",
    region: "West Kolkata",
    coordinates: {
      lat: 22.5802,
      lng: 88.3039
    },
    crowdLevel: "high" as CrowdLevel
  },
  {
    id: "west-kolkata-231",
    name: "Sahapur Colony East Durga Puja",
    region: "West Kolkata",
    coordinates: {
      lat: 22.5872,
      lng: 88.3028
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "west-kolkata-232",
    name: "Sahapur Friends Association Sarbojanin",
    region: "West Kolkata",
    coordinates: {
      lat: 22.5818,
      lng: 88.2969
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "west-kolkata-233",
    name: "Sahapur Mitali Sangha Durga Puja",
    region: "West Kolkata",
    coordinates: {
      lat: 22.5665,
      lng: 88.2903
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "west-kolkata-234",
    name: "Sahapur Nabashakti Sangha Durga Puja",
    region: "West Kolkata",
    coordinates: {
      lat: 22.5914,
      lng: 88.3067
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "west-kolkata-235",
    name: "Sahapur Panchabatitala Sammilani Durga Puja",
    region: "West Kolkata",
    coordinates: {
      lat: 22.5853,
      lng: 88.3074
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "west-kolkata-236",
    name: "Sahapur Sarbojanin Durgotsab Committee",
    region: "West Kolkata",
    coordinates: {
      lat: 22.5738,
      lng: 88.3194
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "west-kolkata-237",
    name: "Shyam Sunder Pallybasi Brinda",
    region: "West Kolkata",
    coordinates: {
      lat: 22.6028,
      lng: 88.2935
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "west-kolkata-238",
    name: "Sreemapally Sarbojanin Durga Puja",
    region: "West Kolkata",
    coordinates: {
      lat: 22.5741,
      lng: 88.3006
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "west-kolkata-239",
    name: "State Bank Park Sarbojanin Durga Puja",
    region: "West Kolkata",
    coordinates: {
      lat: 22.6066,
      lng: 88.3069
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "west-kolkata-240",
    name: "Swamiji Sarak Sarbojanin Durgotsab",
    region: "West Kolkata",
    coordinates: {
      lat: 22.5815,
      lng: 88.329
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "west-kolkata-241",
    name: "Taratala Milantirtha Institute",
    region: "West Kolkata",
    coordinates: {
      lat: 22.5902,
      lng: 88.3123
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "east-kolkata-242",
    name: "Beleghata Sarkar Bazar Durga Puja",
    region: "East Kolkata",
    coordinates: {
      lat: 22.5888,
      lng: 88.4206
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "east-kolkata-243",
    name: "Beliaghata 33 Palli Durga Puja",
    region: "East Kolkata",
    coordinates: {
      lat: 22.5636,
      lng: 88.4382
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "east-kolkata-244",
    name: "EKTP Phase 2 Abasik Puja Samity",
    region: "East Kolkata",
    coordinates: {
      lat: 22.5657,
      lng: 88.4106
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "east-kolkata-245",
    name: "Jawpur Bayam Samity Durga Puja",
    region: "East Kolkata",
    coordinates: {
      lat: 22.5489,
      lng: 88.413
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "east-kolkata-246",
    name: "Judge Bagan Sarbojanin Durgotsab",
    region: "East Kolkata",
    coordinates: {
      lat: 22.5484,
      lng: 88.4204
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "east-kolkata-247",
    name: "Kanjial Para Puja Samity Durga Puja",
    region: "East Kolkata",
    coordinates: {
      lat: 22.5899,
      lng: 88.4281
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "east-kolkata-248",
    name: "Nabapally Adhibashi Brinda Durga Puja",
    region: "East Kolkata",
    coordinates: {
      lat: 22.5549,
      lng: 88.4297
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "east-kolkata-249",
    name: "Netaji Sporting Club Durga Puja",
    region: "East Kolkata",
    coordinates: {
      lat: 22.5885,
      lng: 88.4021
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "east-kolkata-250",
    name: "Purba Kalikata Sarbojanin Durgotsav",
    region: "East Kolkata",
    coordinates: {
      lat: 22.5724,
      lng: 88.428
    },
    crowdLevel: "high" as CrowdLevel
  },
  {
    id: "east-kolkata-251",
    name: "Purbanchal Prabhati Sangha Durga Puja",
    region: "East Kolkata",
    coordinates: {
      lat: 22.5694,
      lng: 88.4027
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "east-kolkata-252",
    name: "Sixemes Cooperative Housing Durgotsav",
    region: "East Kolkata",
    coordinates: {
      lat: 22.5722,
      lng: 88.4187
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "east-kolkata-253",
    name: "Sree Sree Durga Puja Committee, Rabindrapally",
    region: "East Kolkata",
    coordinates: {
      lat: 22.587,
      lng: 88.4385
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "east-kolkata-254",
    name: "AJ Block Durga Puja",
    region: "East Kolkata",
    coordinates: {
      lat: 22.5886,
      lng: 88.4419
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "east-kolkata-255",
    name: "BD Block Sarbojanin Durgotsab Committee",
    region: "East Kolkata",
    coordinates: {
      lat: 22.5629,
      lng: 88.4422
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "east-kolkata-256",
    name: "BJ Block Saradotsav Committee",
    region: "East Kolkata",
    coordinates: {
      lat: 22.5597,
      lng: 88.4125
    },
    crowdLevel: "medium" as CrowdLevel
  },
  {
    id: "east-kolkata-257",
    name: "BL Block Durga Puja",
    region: "East Kolkata",
    coordinates: {
      lat: 22.5631,
      lng: 88.4018
    },
    crowdLevel: "low" as CrowdLevel
  },
  {
    id: "east-kolkata-258",
    name: "Prafulla Kanan Sarbojanin Durgotsab",
    region: "East Kolkata",
    coordinates: {
      lat: 22.5779,
      lng: 88.428
    },
    crowdLevel: "medium" as CrowdLevel
  }
];

export const pandalStats = {
  total: pandals.length,
  highCrowd: pandals.filter((p) => p.crowdLevel === "high").length,
  mediumCrowd: pandals.filter((p) => p.crowdLevel === "medium").length,
  lowCrowd: pandals.filter((p) => p.crowdLevel === "low").length,
  metroConnected: pandals.filter((p) => p.nearestMetro).length,
};

export const regions: Region[] = [
  "North Kolkata",
  "South Kolkata",
  "Central Kolkata",
  "West Kolkata",
  "East Kolkata"
];

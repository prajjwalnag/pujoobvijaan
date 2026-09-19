// Areas cluster nearby pandals into real Kolkata neighbourhoods (geographic
// radius-clustering of pandal coordinates, then reverse-geocoded via
// OpenStreetMap Nominatim to get each cluster's actual place name).
// thingsToDo / cafes / restaurants are hand-curated from web research per
// area — a starting list, not exhaustive. Only clusters with >=3 pandals
// AND a real, in-city resolved name are included here (a few small
// clusters built from still-unverified placeholder coordinates resolved
// to nonsense — e.g. across the river in Howrah — and were dropped
// rather than shipped as areas).
import type { Area } from "./types";

export const areas: Area[] = [
  {
    "id": "cluster-1",
    "name": "Paikpara",
    "region": "North Kolkata",
    "center": {
      "lat": 22.607,
      "lng": 88.3814
    },
    "pandalCount": 18,
    "thingsToDo": [
      "Tala Park",
      "Kumartuli idol-makers' quarter (short walk)",
      "Belgachia riverside"
    ],
    "cafes": [
      {
        "name": "Park Cafe, Paikpara"
      }
    ],
    "restaurants": [
      {
        "name": "Garden Cafe Benfish, Tala Park"
      }
    ]
  },
  {
    "id": "cluster-2",
    "name": "Circular Canal (Beleghata)",
    "region": "North Kolkata",
    "center": {
      "lat": 22.5829,
      "lng": 88.3754
    },
    "pandalCount": 17,
    "thingsToDo": [
      "Beleghata canal-side walk",
      "Birla Industrial & Technological Museum (short ride)"
    ],
    "cafes": [
      {
        "name": "Local tea stalls along Beleghata Main Road"
      }
    ],
    "restaurants": [
      {
        "name": "Mitra Café",
        "note": "Kabiraji cutlets since 1920, short ride away"
      }
    ]
  },
  {
    "id": "cluster-3",
    "name": "Jorasanko North",
    "region": "North Kolkata",
    "center": {
      "lat": 22.5915,
      "lng": 88.3577
    },
    "pandalCount": 14,
    "thingsToDo": [
      "Jorasanko Thakur Bari (Tagore's ancestral home)",
      "Marble Palace",
      "Nakhoda Mosque",
      "College Street book market (walking distance)"
    ],
    "cafes": [
      {
        "name": "Indian Coffee House, College Street"
      }
    ],
    "restaurants": [
      {
        "name": "Putiram",
        "note": "Bengali breakfast & sweets"
      },
      {
        "name": "Paramount",
        "note": "century-old sherbet shop"
      }
    ]
  },
  {
    "id": "cluster-4",
    "name": "Dhakuria",
    "region": "South Kolkata",
    "center": {
      "lat": 22.5098,
      "lng": 88.3649
    },
    "pandalCount": 14,
    "thingsToDo": [
      "Rabindra Sarobar lake — boating & photography, free entry"
    ],
    "cafes": [
      {
        "name": "Cafés along Jodhpur Park Road"
      }
    ],
    "restaurants": [
      {
        "name": "Restaurants near Dhakuria Station"
      },
      {
        "name": "Gariahat food strip",
        "note": "~1.2 km away"
      }
    ]
  },
  {
    "id": "cluster-5",
    "name": "Charu Market (Kalighat)",
    "region": "South Kolkata",
    "center": {
      "lat": 22.5023,
      "lng": 88.3455
    },
    "pandalCount": 13,
    "thingsToDo": [
      "Kalighat Kali Temple",
      "Lake Market shopping"
    ],
    "cafes": [
      {
        "name": "Cafenarumeg",
        "note": "near Kalighat Metro"
      }
    ],
    "restaurants": [
      {
        "name": "Flurys"
      },
      {
        "name": "Paradise Biryani"
      }
    ]
  },
  {
    "id": "cluster-6",
    "name": "Hazra",
    "region": "South Kolkata",
    "center": {
      "lat": 22.522,
      "lng": 88.3499
    },
    "pandalCount": 13,
    "thingsToDo": [
      "Jatin Das Park",
      "Deshapriya Park (walking distance)"
    ],
    "cafes": [
      {
        "name": "Roastery Coffee House, Hazra Road"
      },
      {
        "name": "Bon Appetit",
        "note": "cakes & pastries"
      }
    ],
    "restaurants": [
      {
        "name": "Paradise Biryani, Kalighat"
      }
    ]
  },
  {
    "id": "cluster-7",
    "name": "Azadgarh (Regent Park)",
    "region": "South Kolkata",
    "center": {
      "lat": 22.4852,
      "lng": 88.3556
    },
    "pandalCount": 10,
    "thingsToDo": [
      "Lake Gardens",
      "Regent Park local markets"
    ],
    "cafes": [
      {
        "name": "Cafes around Azadgarh / Regent Park"
      }
    ],
    "restaurants": [
      {
        "name": "Tibetan momo & thukpa joints near Azadgarh"
      },
      {
        "name": "Street food (khau galli)"
      }
    ]
  },
  {
    "id": "cluster-8",
    "name": "Shyam Bazar",
    "region": "North Kolkata",
    "center": {
      "lat": 22.5984,
      "lng": 88.3711
    },
    "pandalCount": 9,
    "thingsToDo": [
      "Shyampukur Street heritage walk",
      "Hatibagan market"
    ],
    "cafes": [
      {
        "name": "Mitra Cafe"
      }
    ],
    "restaurants": [
      {
        "name": "New Punjabi Hotel",
        "note": "90+ years"
      },
      {
        "name": "Allens Kitchen"
      }
    ]
  },
  {
    "id": "cluster-9",
    "name": "Ashok Nagar (Garia / Paschim Putiary)",
    "region": "South Kolkata",
    "center": {
      "lat": 22.4807,
      "lng": 88.3373
    },
    "pandalCount": 9,
    "thingsToDo": [
      "Gariahat Market shopping strip nearby"
    ],
    "cafes": [
      {
        "name": "Fusion cafes around Garia"
      }
    ],
    "restaurants": [
      {
        "name": "Restaurants in the Hindustan Park / Golf Green / Kasba belt"
      }
    ]
  },
  {
    "id": "cluster-10",
    "name": "Alipore",
    "region": "South Kolkata",
    "center": {
      "lat": 22.515,
      "lng": 88.3334
    },
    "pandalCount": 8,
    "thingsToDo": [
      "Alipore Zoological Gardens (Royal Bengal Tiger)",
      "The Alipore Museum"
    ],
    "cafes": [
      {
        "name": "95 Degree Cafe & Bakery, New Alipore"
      }
    ],
    "restaurants": [
      {
        "name": "Restaurants around New Alipore Station"
      }
    ]
  },
  {
    "id": "cluster-11",
    "name": "Bow Bazar North (College Street)",
    "region": "Central Kolkata",
    "center": {
      "lat": 22.5748,
      "lng": 88.3632
    },
    "pandalCount": 8,
    "thingsToDo": [
      "College Street book market",
      "Asutosh Museum of Indian Art",
      "Presidency University & Calcutta University buildings"
    ],
    "cafes": [
      {
        "name": "Indian Coffee House, Bankim Chatterjee Street"
      }
    ],
    "restaurants": [
      {
        "name": "Dilkhusa Cabin",
        "note": "kabiraji cutlets"
      },
      {
        "name": "Mission Cafe",
        "note": "vegetarian"
      }
    ]
  },
  {
    "id": "cluster-13",
    "name": "Ballygunge",
    "region": "South Kolkata",
    "center": {
      "lat": 22.5258,
      "lng": 88.3684
    },
    "pandalCount": 7,
    "thingsToDo": [
      "Birla Academy of Art & Culture",
      "Birla Mandir"
    ],
    "cafes": [
      {
        "name": "Uns Cafe"
      }
    ],
    "restaurants": [
      {
        "name": "6 Ballygunge Place"
      },
      {
        "name": "Barbeque Nation"
      }
    ]
  },
  {
    "id": "cluster-15",
    "name": "Jadavpur",
    "region": "South Kolkata",
    "center": {
      "lat": 22.4948,
      "lng": 88.3685
    },
    "pandalCount": 5,
    "thingsToDo": [
      "Jadavpur University campus",
      "South City Mall"
    ],
    "cafes": [
      {
        "name": "Indian Coffee House, Jadavpur"
      },
      {
        "name": "Chai Addaa"
      }
    ],
    "restaurants": [
      {
        "name": "8B bus stand food strip"
      },
      {
        "name": "South City Mall dining"
      }
    ]
  },
  {
    "id": "cluster-17",
    "name": "Shanti Nagar (Bansdroni)",
    "region": "South Kolkata",
    "center": {
      "lat": 22.4734,
      "lng": 88.3623
    },
    "pandalCount": 4,
    "thingsToDo": [
      "Bansdroni local market"
    ],
    "cafes": [
      {
        "name": "Cafes near Bansdroni Metro"
      }
    ],
    "restaurants": [
      {
        "name": "Kebab / Biryani / Mughlai joints near Bansdroni Metro"
      }
    ]
  },
  {
    "id": "cluster-18",
    "name": "Tollygunge",
    "region": "South Kolkata",
    "center": {
      "lat": 22.4963,
      "lng": 88.3344
    },
    "pandalCount": 4,
    "thingsToDo": [
      "Tollygunge Club grounds (heritage club)"
    ],
    "cafes": [
      {
        "name": "The Royal Bengal Tiger Cafe"
      },
      {
        "name": "Tolly Cafe"
      }
    ],
    "restaurants": [
      {
        "name": "Aminia"
      },
      {
        "name": "A-One Taj Biryani House"
      }
    ]
  },
  {
    "id": "cluster-20",
    "name": "Maniktala",
    "region": "South Kolkata",
    "center": {
      "lat": 22.5901,
      "lng": 88.3945
    },
    "pandalCount": 3,
    "thingsToDo": [
      "Phool Bagan / Kankurgachi neighbourhood stroll"
    ],
    "cafes": [
      {
        "name": "Patisserie by Franziska"
      }
    ],
    "restaurants": [
      {
        "name": "Restaurants on Maniktala Main Road"
      },
      {
        "name": "Kouzina Marine, Salt Lake",
        "note": "short ride"
      }
    ]
  },
  {
    "id": "cluster-21",
    "name": "Dum Dum Park",
    "region": "North Kolkata",
    "center": {
      "lat": 22.6209,
      "lng": 88.3934
    },
    "pandalCount": 5,
    "thingsToDo": [
      "Walk around Dum Dum Park's numbered tanks/lakes (Tank No. 1-5) — a genuine local morning/evening walking spot"
    ],
    "cafes": [
      {
        "name": "Food & Flora"
      }
    ],
    "restaurants": [
      {
        "name": "Bongo Kitchen"
      },
      {
        "name": "Khatirdari Restaurant"
      }
    ]
  }
];

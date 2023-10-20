export const schemas = [
  {
    "name": "google-login",
    "schema": "string emailAddress",
    "isRegistered": true,
    "id": "0xc3610f2c819fbec640b2a3d9b96e93d9e537a9685ba4bcfc7bec0fa3d6741c7b"
  },
  {
    "name": "amazon-order-history",
    "schema": "string productName",
    "isRegistered": true,
    "id": "0x96a85a335874a2dea35571403d5bdb23914dbb5d7bd48f8d43e96c8b855d7a86",
    "uid": "0x94b7e965dc6dce6f8833dc4eb0b5458f3903c211c568281069ed7bb7488d49d1"
  },
  {
    "name": "binance-asset-balance",
    "schema": "string assetName, string assetQty",
    "isRegistered": true,
    "id": "0x1d8543ffe4c2be65a3554b7938afe0c24e0ba298935e549e1b8bf7626aba33db",
    "uid": "0xa9e5cd60dd84aefae00f61b5e3ac0d9495c8f5a5023b2ad7ab5a29b54d59ae89"
  },
  {
    "name": "blind-user",
    "schema": "string userName",
    "isRegistered": true,
    "id": "0x01b6c6a828deb99cc7fe0aeb75da67fd426eaa56a860ca9f9ce7bcb09943261b",
    "uid": "0xdebb77b752fe5cc8a59ce353cddd4249cf37557318d5468de847370eafef406d"
  },
  {
    "name": "bybit-balance",
    "schema": "int256 balance",
    "isRegistered": true,
    "id": "0xf9dba5e8be9dcf589f0503189b60fa992e7891b9fb534d2e0b8ebdacb0b0a684",
    "uid": "0x159a0187fc36eec29c1c5577dc7949fd7f391f6e5126047e26d96868248bb426"
  },
  {
    "name": "bybit-spot-pnl",
    "schema": "int256 profitPercentage",
    "isRegistered": true,
    "id": "0x6f1a4a3672c29a9ea4c7c018ab6df779690c6f25c84a244fdde2e6d5c5c80cf6",
    "uid": "0xdbad891c2ac56e91d0a69f9910618418b6e1b5dee1e9b16f6db8e31155358a9e"
  },
  {
    "name": "chess-rating",
    "schema": "string userName, string rating",
    "isRegistered": true,
    "id": "0x199696e77d67207a4a7e30a6de5be9a8ac8fec2f7b5c08689f28f017a8b09ae5",
    "uid": "0xabadea8c134fc6104353356b096e0f9f14f7af10a95f18b7f1554b34d1f25949"
  },
  {
    "name": "chess-user",
    "schema": "string userName",
    "isRegistered": true,
    "id": "0x01b6c6a828deb99cc7fe0aeb75da67fd426eaa56a860ca9f9ce7bcb09943261b"
  },
  {
    "name": "codeforces-rating",
    "schema": "string rating",
    "isRegistered": true,
    "id": "0x8fdb3b431f3c5778a89a9bbde8d8f23b20561345bbe232da4e5dbdd7a43541d0"
  },
  {
    "name": "coindcx-balance",
    "schema": "string assetName, int256 balance",
    "isRegistered": true,
    "id": "0x20dbce3fa6824ab298fa605fbd1bb42668a77ccb79d9164f846e7b9c6535c0c7"
  },
  {
    "name": "coinswitch-balance",
    "schema": "int256 balance",
    "isRegistered": true,
    "id": "0xf9dba5e8be9dcf589f0503189b60fa992e7891b9fb534d2e0b8ebdacb0b0a684"
  },
  {
    "name": "devfolio-hackathon-participated",
    "schema": "string username, int256 hackathonCount",
    "isRegistered": true,
    "id": "0x6442a993e171a332a5547e437933e27896e714f4b488c5f911f872340a61e9cd"
  },
  {
    "name": "ebay-user",
    "schema": "string username",
    "isRegistered": true,
    "id": "0xd6e6a35ddb2b667deda0a9b84a791be2b359da1b2ab9b2bc411996b11866c23d"
  },
  {
    "name": "facebook-friends-count",
    "schema": "string userURL, int256 friendsCount",
    "isRegistered": true,
    "id": "0x5360d5505dd4a8d4b8b5a86844a1d4aa821293e9b1350f7f9297d8f1aa882287"
  },
  {
    "name": "flickr-user",
    "schema": "string userEmail",
    "isRegistered": true,
    "id": "0x9ed500d61e46d928f240013cf9844a06bab91d015303e3d50838cc2e9d81aa74"
  },
  {
    "name": "github-commits",
    "schema": "string repository, searchQuery { string[] keywords, qualifiers { string[] is } }, string type",
    "isRegistered": true,
    "id": "0x6ba90ef709126ba63cc11b3fdf1b0d4855450128f1bd1a11ac7203c40ca2518b"
  },
  {
    "name": "github-topics",
    "schema": "string path, mapping(string => string) qs, string type, response { string[] names }, string[] keys",
    "isRegistered": true,
    "id": "0xbdf02bb2b6103f7ed67c1bf6f6ec542b24e66c526404c7dd88f27757a7802459"
  },
  {
    "name": "goibibo",
    "schema": "string goTribeDetails",
    "isRegistered": true,
    "id": "0xcb588513e5322585870d3f669a16fc55c69491be096ace3bde304ca91d162c04"
  },
  {
    "name": "groww-stock-balance",
    "schema": "string stockIsin, int256 stockQty",
    "isRegistered": true,
    "id": "0x524fd3e7ee2a4dc2dd068125ad72df06a412a03980fdfee165c56b5fc00c35c4"
  },
  {
    "name": "hackerearth-username",
    "schema": "string userName",
    "isRegistered": true,
    "id": "0x01b6c6a828deb99cc7fe0aeb75da67fd426eaa56a860ca9f9ce7bcb09943261b"
  },
  {
    "name": "hackerrank-username",
    "schema": "string userName",
    "isRegistered": true,
    "id": "0x01b6c6a828deb99cc7fe0aeb75da67fd426eaa56a860ca9f9ce7bcb09943261b"
  },
  {
    "name": "http-provider",
    "schema": "string url, string method, responseSelection[] { string xPath, string responseMatch }",
    "isRegistered": true,
    "id": "0x90659d0b8c4619f3143b423f8c70f8ce147a44153022e2eafb98833731caf5ef"
  },
  {
    "name": "instagram-posts",
    "schema": "string[] igCDNFileNames",
    "isRegistered": true,
    "id": "0x65d3050dbcca89a53b6efb3e4a80454aa7e7479756c1f4259497742b987eedc1"
  },
  {
    "name": "instagram-user",
    "schema": "string userName",
    "isRegistered": true,
    "id": "0x01b6c6a828deb99cc7fe0aeb75da67fd426eaa56a860ca9f9ce7bcb09943261b"
  },
  {
    "name": "irs-address",
    "schema": "string address",
    "isRegistered": true,
    "id": "0xfd9f4f51fa8baad09a8f2ccda11b7421b1b12a8cb9a3a7a46ceb44ec4f7d89ba"
  },
  {
    "name": "irs-name",
    "schema": "string name",
    "isRegistered": true,
    "id": "0xf2bcc6b17b973532c2e3e4d07654f17d93175a7564ed427f5eacc42f2cf44444"
  },
  {
    "name": "lichess-username",
    "schema": "string username",
    "isRegistered": true,
    "id": "0xd6e6a35ddb2b667deda0a9b84a791be2b359da1b2ab9b2bc411996b11866c23d"
  },
  {
    "name": "loom-user-id",
    "schema": "string userId",
    "isRegistered": true,
    "id": "0xb116226e58ef5a5d65a15fe69c328eb2940955d79209a1b66c8ecde883759305"
  },
  {
    "name": "mastodon-user",
    "schema": "string username",
    "isRegistered": true,
    "id": "0xd6e6a35ddb2b667deda0a9b84a791be2b359da1b2ab9b2bc411996b11866c23d"
  },
  {
    "name": "medium-followers-count",
    "schema": "string username, int256 followersCount",
    "isRegistered": true,
    "id": "0x7d50e5527058a829f9644f99d01bfe17991d024b9a82fd61407a0b8bb735b7bb"
  },
  {
    "name": "notion-username",
    "schema": "string userName",
    "isRegistered": true,
    "id": "0x01b6c6a828deb99cc7fe0aeb75da67fd426eaa56a860ca9f9ce7bcb09943261b"
  },
  {
    "name": "one-mg",
    "schema": "mapping(string => string) data, mapping(string => string) queryString",
    "isRegistered": true,
    "id": "0xa4348d40f79b843e790206f3e3a487821fb0323920cfef9c362eb5b0a4c0c1d0"
  },
  {
    "name": "proton-mail",
    "schema": "string email",
    "isRegistered": true,
    "id": "0x605ee5afa2e276e4b68f46a0ca2273007fb797a99fc11015e4857de825042b81"
  },
  {
    "name": "quora-user",
    "schema": "string userId",
    "isRegistered": true,
    "id": "0xb116226e58ef5a5d65a15fe69c328eb2940955d79209a1b66c8ecde883759305"
  },
  {
    "name": "soundcloud-username",
    "schema": "string username",
    "isRegistered": true,
    "id": "0xd6e6a35ddb2b667deda0a9b84a791be2b359da1b2ab9b2bc411996b11866c23d"
  },
  {
    "name": "spotify-account-type",
    "schema": "int256 accountType",
    "isRegistered": true,
    "id": "0x4c83e0cd764719177a86c68c2dc4db29750a070e9e6a6c4b800d5371e78db073"
  },
  {
    "name": "spotify-account-type",
    "schema": "int256 accountType",
    "isRegistered": true,
    "id": "0x4c83e0cd764719177a86c68c2dc4db29750a070e9e6a6c4b800d5371e78db073"
  },
  {
    "name": "spotify-username",
    "schema": "string userName",
    "isRegistered": true,
    "id": "0x01b6c6a828deb99cc7fe0aeb75da67fd426eaa56a860ca9f9ce7bcb09943261b"
  },
  {
    "name": "swiggy-total-count",
    "schema": "int256 orderCount",
    "isRegistered": true,
    "id": "0x1f452d504e056ab2584cffd8aa7257d021be58773c1b195e717235d277309538"
  },
  {
    "name": "tinder-match-count",
    "schema": "int256 matchCount, string userId",
    "isRegistered": true,
    "id": "0x599df41b756ecc0e402f99331e81b38e1a0f5e25819dff8d1b30bd08ffa4596a"
  },
  {
    "name": "tumblr-follower",
    "schema": "string followingAccount",
    "isRegistered": true,
    "id": "0xbe2c2250a48deba16ca6ab1ec251c2b38dcbfc6b12e320b0e4c22521ae6fda8c"
  },
  {
    "name": "twitter-followers-count",
    "schema": "string numFollowers",
    "isRegistered": true,
    "id": "0xe83f2c7bedfa77f3aab5513e953d4d43d0a33d6cd7dfbc565ee2eb7254ab4e0d"
  },
  {
    "name": "twitter-username",
    "schema": "string username",
    "isRegistered": true,
    "id": "0xd6e6a35ddb2b667deda0a9b84a791be2b359da1b2ab9b2bc411996b11866c23d"
  },
  {
    "name": "uidai-address",
    "schema": "string address",
    "isRegistered": true,
    "id": "0xfd9f4f51fa8baad09a8f2ccda11b7421b1b12a8cb9a3a7a46ceb44ec4f7d89ba"
  },
  {
    "name": "uidai-address",
    "schema": "string address",
    "isRegistered": true,
    "id": "0xfd9f4f51fa8baad09a8f2ccda11b7421b1b12a8cb9a3a7a46ceb44ec4f7d89ba"
  },
  {
    "name": "uidai-name",
    "schema": "string name",
    "isRegistered": true,
    "id": "0xf2bcc6b17b973532c2e3e4d07654f17d93175a7564ed427f5eacc42f2cf44444"
  },
  {
    "name": "uidai-phone",
    "schema": "string mobile",
    "isRegistered": true,
    "id": "0x6914ad4ec1400fecd458b76c7a13b4e397b23eecd960de0ec31b52eaccdb8ca1"
  },
  {
    "name": "uidai-stateName",
    "schema": "string stateName",
    "isRegistered": true,
    "id": "0xa5af8711abff80905a313a934cc1e036254a6cdaf28633cef0bbddc88ceb4c01"
  },
  {
    "name": "uidai-uid",
    "schema": "string uid",
    "isRegistered": true,
    "id": "0xec71ca80c043dc4c89bd973f99d90f1537779d6f311eba0bfece36b5499bf00f"
  },
  {
    "name": "venmo-id",
    "schema": "string userId",
    "isRegistered": true,
    "id": "0xb116226e58ef5a5d65a15fe69c328eb2940955d79209a1b66c8ecde883759305"
  },
  {
    "name": "venmo-transaction",
    "schema": "string userId, string recipientId, string amount",
    "isRegistered": true,
    "id": "0xb2bbd88ebd9464a3b0b0f4c4ad796eb99203cad4729d4584342243f3e8636364"
  },
  {
    "name": "yc-login",
    "schema": "int256 userId",
    "isRegistered": true,
    "id": "0xdcbefecffa535238e5af08c3b4947abbd92e430eddc0765cfbd3352ae2ba07a0"
  },
  {
    "name": "zoho-email",
    "schema": "string email",
    "isRegistered": true,
    "id": "0x605ee5afa2e276e4b68f46a0ca2273007fb797a99fc11015e4857de825042b81"
  },
  {
    "name": "zomato-order-count",
    "schema": "string userId, int256 orderCount",
    "isRegistered": true,
    "id": "0xa7379499b8f0d21181f1147c60a7586f6db6b58212744870cde1bbbd4f4bf7dd"
  }
]

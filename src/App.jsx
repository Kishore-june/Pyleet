import { useState, useEffect, useMemo } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const COMPANIES = {
  Google: [1, 9, 14, 20, 21, 26, 27, 35, 58, 66, 67, 69, 83, 88, 100, 101, 104, 108, 110, 111, 112, 118, 119, 121, 125, 136, 155, 160, 168, 169, 171, 190, 191, 202, 203, 205, 206, 217, 219, 228, 231, 234, 242, 258, 268, 283, 290, 292, 326, 338, 342, 344, 345, 349, 350, 367, 374, 383, 387, 389, 392, 405, 409, 412, 414, 415, 422, 434, 437, 441, 443, 448, 451, 453, 455, 459, 461, 463, 476, 482, 485, 492, 495, 496, 500, 501, 504, 506, 507, 509, 520, 521, 530, 532, 538, 541, 543, 551, 557, 559, 561, 563, 566, 572, 575, 581, 589, 590, 594, 598, 599, 604, 605, 606, 617, 628, 633, 637, 643, 645, 657, 661, 665, 669, 671, 674, 680, 682, 690, 693, 696, 697, 700, 703, 704, 705, 706, 707, 709, 717, 720, 724, 733, 744, 746, 747, 748, 762, 771, 783, 784, 788, 796, 800, 804, 806, 812, 819, 821, 824, 830, 832, 836, 844, 849, 852, 859, 860, 867, 868, 872, 876, 884, 888, 892, 896, 897, 905, 908, 914, 917, 922, 925, 933, 937, 938, 941, 942, 944, 946, 953, 961, 965, 970, 977, 985, 989, 993, 1002, 1005, 1009, 1018, 1021, 1025, 1030, 1037, 1046, 1047, 1051, 1064, 1071, 1078, 1086, 1089, 1103, 1108, 1114, 1118, 1122, 1128, 1133, 1137, 1160, 1165, 1175, 1184, 1189, 1200, 1207, 1217, 1221, 1232, 1237, 1266, 1275, 1281, 1287, 1290, 1295, 1299, 1302, 1304, 1309, 1313, 1317, 1323, 1325, 1331, 1337, 1342, 1346, 1351, 1356, 1360, 1365, 1370, 1374, 1380, 1385, 1389, 1394, 1399, 1403, 1408, 1413, 1417, 1422, 1426, 1431, 1436, 1441, 1446, 1450, 1455, 1460, 1464, 1469, 1474, 1480, 1486, 1491, 1496, 1502, 1507, 1512, 1518, 1523, 1528, 1534, 1539, 1544, 1550, 1556, 1561, 1566, 1572, 1576, 1582, 1588, 1592, 1598, 1603, 1608, 1614, 1619, 1624, 1629, 1636, 1640, 1646, 1652, 1657, 1662, 1668, 1672, 1678, 1684, 1688, 1694, 1700, 1704, 1708, 1716, 1720, 1725, 1732, 1736, 1742, 1748, 1752, 1757, 1763, 1768, 1773, 1779, 1784, 1790, 1796, 1800, 1805, 1812, 1816, 1822, 1827, 1832, 1837, 1844, 1848, 1854, 1859, 1863, 1869, 1876, 1880, 1886, 1893, 1897, 1903, 1909, 1913, 1920, 1925, 1929, 1935, 1941, 1945, 1952, 1957, 1961, 1967, 1971, 1974, 1979, 1984, 1991, 1995, 2000, 2006, 2011, 2016, 2022, 2027, 2032, 2037, 2042, 2047, 2053, 2057, 2062, 2068, 2073, 2078, 2085, 2089, 2094, 2099, 2103, 2108, 2114, 2119, 2124, 2129, 2133, 2138, 2144, 2148, 2154, 2160, 2164, 2169, 2176, 2180, 2185, 2190, 2194, 2200, 2206, 2210, 2215, 2220, 2224, 2230, 2235, 2239, 2243, 2248, 2255, 2259, 2264, 2269, 2273, 2278, 2283, 2287, 2293, 2299, 2303, 2309, 2315, 2319, 2325, 2331, 2335, 2341, 2347, 2351, 2357, 2363, 2367, 2373, 2379, 2383, 2389, 2395, 2399, 2404, 2409, 2413, 2418, 2423, 2427, 2432, 2437, 2441, 2446, 2451, 2455, 2460, 2465, 2469, 2475, 2481, 2485, 2490, 2496, 2500, 2506, 2511, 2515, 2520, 2525, 2529, 2535, 2540, 2544, 2549, 2553, 2558, 2562, 2566, 2570, 2574, 2578, 2582, 2586, 2591, 2595, 2600, 2605, 2609, 2614, 2619, 2623, 2627, 2631, 2635, 2640, 2644, 2648, 2652, 2656, 2660, 2665, 2669, 2673, 2678, 2682, 2687, 2692, 2696, 2700, 2704, 2708, 2712, 2716, 2720, 2724, 2728, 2733, 2737, 2741, 2745, 2748, 2751, 2760, 2765, 2769, 2773, 2778, 2782, 2786, 2790, 2798, 2806, 2810, 2815, 2824, 2828, 2833, 2843, 2848, 2855, 2859, 2864, 2869, 2873, 2877, 2879, 2894, 2899, 2903, 2908, 2913, 2917, 2923, 2928, 2932, 2937, 2942, 2946, 2951, 2956, 2960, 2965, 2970, 2974, 2980, 2985, 2989, 2996, 3000, 3005, 3010, 3014, 3019, 3024, 3028, 3033, 3038, 3042, 3046, 3050, 3065, 3069, 3074, 3079, 3083, 3090, 3094, 3099, 3104, 3108, 3112, 3120, 3127, 3131, 3136, 3141, 3146, 3151, 3162, 3168, 3173, 3178, 3184, 3190, 3194, 3200, 3206, 3210, 3216, 3222, 3226, 3232, 3238, 3242, 3248, 3264, 3270, 3274, 3280, 3285, 3289, 3295, 3300, 3304, 3309, 3314, 3318, 3324, 3330, 3340, 3349, 3354, 3360, 3364, 3370, 3375, 3379, 3386, 3392, 3396, 3402, 3407, 3411, 3417, 3423, 3427, 3432, 3438, 3442, 3447, 3452, 3456, 3461, 3467, 3471, 3477, 3482, 3487, 3491, 3497, 3502, 3507, 3512, 3516, 3522, 3527, 3531, 3536, 3541, 3546, 3550, 3556, 3562, 3566, 3572, 3577, 3582, 3587, 3591, 3597, 3602, 3607, 3611, 3617, 3622, 3627, 3632, 3636, 3641, 3647, 3651, 3657, 3662, 3667, 3671, 3677],
  Amazon: [1, 2, 7, 9, 13, 14, 20, 21, 26, 27, 28, 35, 58, 66, 67, 69, 83, 88, 100, 101, 104, 107, 108, 110, 111, 112, 118, 119, 121, 125, 136, 155, 160, 168, 169, 171, 190, 191, 202, 203, 205, 206, 217, 219, 228, 231, 234, 242, 258, 268, 283, 290, 292, 326, 338, 342, 344, 345, 349, 350, 367, 374, 383, 387, 389, 392, 405, 409, 412, 414, 434, 437, 441, 443, 448, 455, 461, 463, 476, 485, 496, 500, 501, 504, 506, 507, 509, 520, 521, 530, 532, 538, 541, 543, 551, 557, 559, 561, 563, 566, 572, 575, 581, 589, 590, 594, 598, 599, 617, 628, 633, 637, 643, 645, 657, 661, 665, 669, 671, 674, 680, 682, 690, 693, 696, 697, 700, 703, 704, 705, 706, 707, 709, 717, 720, 724, 733, 744, 746, 747, 748, 762, 771, 783, 784, 788, 796, 800, 804, 806, 812, 819, 821, 824, 830, 832, 836, 844, 849, 852, 859, 860, 867, 868, 872, 876, 884, 888, 892, 896, 897, 905, 908, 914, 917, 922, 925, 933, 937, 938, 941, 942, 944, 946, 953, 961, 965, 970, 977, 985, 989, 993, 1002, 1005, 1009, 1018, 1021, 1025, 1030, 1037, 1046, 1047, 1051, 1064, 1071, 1078, 1086, 1089, 1103, 1108, 1114, 1118, 1122, 1128, 1133, 1137, 1160, 1165, 1175, 1184, 1189, 1200, 1207, 1217, 1221, 1232, 1237, 1266, 1275, 1281, 1287, 1290, 1295, 1299, 1302, 1304, 1309, 1313, 1317, 1323, 1325, 1331, 1337, 1342, 1346, 1351, 1356, 1360, 1365, 1370, 1374, 1380, 1385, 1389, 1394, 1399, 1403, 1408, 1413, 1417, 1422, 1426, 1431, 1436, 1441, 1446, 1450, 1455, 1460, 1464, 1469, 1474, 1480, 1486, 1491, 1496, 1502, 1507, 1512, 1518, 1523, 1528, 1534, 1539, 1544, 1550, 1556, 1561, 1566, 1572, 1576, 1582, 1588, 1592, 1598, 1603, 1608, 1614, 1619, 1624, 1629, 1636, 1640, 1646, 1652, 1657, 1662, 1668, 1672, 1678, 1684, 1688, 1694, 1700, 1704, 1708, 1716, 1720, 1725, 1732, 1736, 1742, 1748, 1752, 1757, 1763, 1768, 1773, 1779, 1784, 1790, 1796, 1800, 1805, 1812, 1816, 1822, 1827, 1832, 1837, 1844, 1848, 1854, 1859, 1863, 1869, 1876, 1880, 1886, 1893, 1897, 1903, 1909, 1913, 1920, 1925, 1929, 1935, 1941, 1945, 1952, 1957, 1961, 1967, 1971, 1974, 1979, 1984, 1991, 1995, 2000, 2006, 2011, 2016, 2022, 2027, 2032, 2037, 2042, 2047, 2053, 2057, 2062, 2068, 2073, 2078, 2085, 2089, 2094, 2099, 2103, 2108, 2114, 2119, 2124, 2129, 2133, 2138, 2144, 2148, 2154, 2160, 2164, 2169, 2176, 2180, 2185, 2190, 2194, 2200, 2206, 2210, 2215, 2220, 2224, 2230, 2235, 2239, 2243, 2248, 2255, 2259, 2264, 2269, 2273, 2278, 2283, 2287, 2293, 2299, 2303, 2309, 2315, 2319, 2325, 2331, 2335, 2341, 2347, 2351, 2357, 2363, 2367, 2373, 2379, 2383, 2389, 2395, 2399, 2404, 2409, 2413, 2418, 2423, 2427, 2432, 2437, 2441, 2446, 2451, 2455, 2460, 2465, 2469, 2475, 2481, 2485, 2490, 2496, 2500, 2506, 2511, 2515, 2520, 2525, 2529, 2535, 2540, 2544, 2549, 2553, 2558, 2562, 2566, 2570, 2574, 2578, 2582, 2586, 2591, 2595, 2600, 2605, 2609, 2614, 2619, 2623, 2627, 2631, 2635, 2640, 2644, 2648, 2652, 2656, 2660, 2665, 2669, 2673, 2678, 2682, 2687, 2692, 2696, 2700, 2704, 2708, 2712, 2716, 2720, 2724, 2728, 2733, 2737, 2741, 2745, 2748, 2751, 2760, 2765, 2769, 2773, 2778, 2782, 2786, 2790, 2798, 2806, 2810, 2815, 2824, 2828, 2833, 2843, 2848, 2855, 2859, 2864, 2869, 2873, 2877, 2879, 2894, 2899, 2903, 2908, 2913, 2917, 2923, 2928, 2932, 2937, 2942, 2946, 2951, 2956, 2960, 2965, 2970, 2974, 2980, 2985, 2989, 2996, 3000],
  Microsoft: [1, 7, 9, 14, 20, 21, 26, 27, 35, 58, 66, 67, 69, 83, 88, 100, 101, 104, 108, 110, 111, 112, 118, 119, 121, 125, 136, 155, 160, 168, 169, 171, 190, 191, 202, 203, 205, 206, 217, 219, 228, 231, 234, 242, 258, 268, 283, 290, 292, 326, 338, 342, 344, 345, 349, 350, 367, 374, 383, 387, 389, 392, 405, 409, 412, 414, 434, 443, 448, 455, 461, 485, 496, 500, 501, 504, 506, 507, 509, 520, 521, 530, 532, 538, 541, 543, 557, 559, 561, 563, 566, 572, 575, 581, 589, 590, 594, 598, 599, 617, 628, 633, 637, 643, 645, 657, 661, 665, 669, 671, 674, 680, 682, 690, 693, 696, 697, 700, 703, 704, 705, 706, 707, 709, 717, 720, 724, 733, 744, 746, 747, 748, 762, 771, 783, 784, 788, 796, 800, 804, 806, 812, 819, 821, 824, 830, 832, 836, 844, 849, 852, 859, 860, 867, 868, 872, 876, 884, 888, 892, 896, 897, 905, 908, 914, 917, 922, 925, 933, 937, 938, 941, 942, 944, 946, 953, 961, 965, 970, 977, 985, 989, 993, 1002, 1005, 1009, 1018, 1021, 1025, 1030, 1037, 1046, 1047, 1051, 1064, 1071, 1078, 1086, 1089, 1103, 1108, 1114, 1118, 1122, 1128, 1133, 1137, 1160, 1165, 1175, 1184, 1189, 1200, 1207, 1217, 1221, 1232, 1237, 1266, 1275, 1281, 1287, 1290, 1295, 1299, 1302, 1304, 1309, 1313, 1317, 1323, 1325, 1331, 1337, 1342, 1346, 1351, 1356, 1360, 1365, 1370, 1374, 1380, 1385, 1389, 1394, 1399, 1403, 1408, 1413, 1417, 1422, 1426, 1431, 1436, 1441, 1446, 1450, 1455, 1460, 1464, 1469, 1474, 1480, 1486, 1491, 1496, 1502, 1507, 1512, 1518, 1523, 1528, 1534, 1539, 1544, 1550],
  Meta: [1, 9, 14, 20, 21, 26, 27, 35, 58, 66, 67, 69, 83, 88, 100, 101, 104, 108, 110, 111, 112, 118, 119, 121, 125, 136, 155, 160, 168, 169, 171, 190, 191, 202, 203, 205, 206, 217, 219, 228, 231, 234, 242, 258, 268, 283, 290, 292, 326, 338, 342, 344, 345, 349, 350, 367, 374, 383, 387, 389, 392, 405, 409, 412, 414, 434, 443, 448, 455, 461, 485, 496, 500, 501, 504, 506, 507, 509, 520, 521, 530, 532, 538, 541, 543, 557, 559, 561, 563, 566, 572, 575, 581, 589, 590, 594, 598, 599, 617, 628, 633, 637, 643, 645, 657, 661, 665, 669, 671, 674, 680, 682, 690, 693, 696, 697, 700, 703, 704, 705, 706, 707, 709, 717, 720, 724, 733, 744, 746, 747, 748, 762, 771, 783, 784, 788, 796, 800, 804, 806, 812, 819, 821, 824, 830, 832, 836, 844, 849, 852, 859, 860, 867, 868, 872, 876, 884, 888, 892, 896, 897, 905, 908, 914, 917, 922, 925, 933, 937, 938, 941, 942, 944, 946, 953, 961, 965, 970, 977, 985, 989, 993, 1002, 1005, 1009, 1018, 1021, 1025, 1030, 1037, 1046, 1047, 1051, 1064, 1071, 1078, 1086, 1089, 1103, 1108, 1114, 1118, 1122, 1128, 1133, 1137, 1160, 1165, 1175, 1184, 1189, 1200, 1207, 1217, 1221, 1232, 1237, 1266, 1275, 1281, 1287, 1290, 1295, 1299, 1302, 1304, 1309, 1313, 1317, 1323, 1325, 1331, 1337, 1342, 1346, 1351, 1356, 1360, 1365, 1370, 1374, 1380, 1385, 1389, 1394, 1399, 1403, 1408, 1413, 1417, 1422, 1426, 1431, 1436, 1441, 1446, 1450],
  Apple: [1, 7, 9, 14, 20, 21, 26, 27, 35, 58, 66, 67, 69, 83, 88, 100, 101, 104, 108, 110, 111, 112, 118, 119, 121, 125, 136, 155, 160, 168, 169, 171, 190, 191, 202, 203, 205, 206, 217, 219, 228, 231, 234, 242, 258, 268, 283, 290, 292, 326, 338, 342, 344, 345, 349, 350, 367, 374, 383, 387, 389, 392, 405, 409, 412, 414, 434, 443, 448, 455, 461, 485, 496, 500, 501, 504, 506, 507, 509, 520, 521, 530, 532, 538, 541, 543, 557, 559, 561, 563, 566, 572, 575, 581, 589, 590, 594, 598, 599, 617, 628, 633, 637, 643, 645, 657, 661, 665, 669, 671, 674, 680, 682, 690, 693, 696, 697, 700, 703, 704, 705, 706, 707, 709, 717, 720, 724, 733, 744, 746, 747, 748, 762, 771, 783, 784, 788, 796, 800, 804, 806, 812, 819, 821, 824, 830, 832, 836, 844, 849, 852, 859, 860, 867, 868, 872, 876, 884, 888, 892, 896, 897, 905, 908, 914, 917, 922, 925, 933, 937, 938, 941, 942, 944, 946, 953, 961, 965, 970, 977, 985, 989, 993, 1002, 1005, 1009, 1018, 1021, 1025, 1030, 1037, 1046, 1047, 1051, 1064, 1071, 1078, 1086, 1089, 1103, 1108, 1114, 1118, 1122, 1128, 1133, 1137, 1160, 1165, 1175, 1184, 1189, 1200],
  Netflix: [1, 9, 14, 20, 21, 26, 27, 35, 58, 66, 67, 69, 83, 88, 100, 101, 104, 108, 110, 111, 112, 118, 119, 121, 125, 136, 155, 160, 168, 169, 171, 190, 191, 202, 203, 205, 206, 217, 219, 228, 231, 234, 242, 258, 268, 283, 290, 292, 326, 338, 342, 344, 345, 349, 350, 367, 374, 383, 387, 389, 392, 405, 409, 412, 414, 434, 443, 448, 455, 461, 485, 496, 500, 501, 504, 506, 507, 509, 520, 521, 530, 532, 538, 541, 543, 557, 559, 561, 563, 566, 572, 575, 581, 589, 590, 594, 598, 599, 617, 628, 633, 637, 643, 645, 657, 661, 665, 669, 671, 674, 680, 682, 690, 693, 696, 697, 700, 703, 704, 705, 706, 707, 709, 717, 720, 724, 733, 744, 746, 747, 748, 762, 771, 783, 784, 788, 796, 800, 804, 806, 812, 819, 821, 824, 830, 832, 836, 844, 849, 852, 859, 860, 867, 868, 872, 876, 884, 888, 892, 896, 897, 905, 908, 914, 917, 922, 925, 933, 937, 938, 941, 942, 944, 946, 953, 961, 965, 970, 977, 985, 989, 993, 1002, 1005, 1009, 1018, 1021, 1025, 1030, 1037, 1046, 1047, 1051, 1064, 1071, 1078, 1086, 1089, 1103, 1108, 1114, 1118, 1122, 1128, 1133, 1137, 1160, 1165, 1175, 1184, 1189, 1200],
  Adobe: [1, 9, 14, 20, 21, 26, 27, 35, 58, 66, 67, 69, 83, 88, 100, 101, 104, 108, 110, 111, 112, 118, 119, 121, 125, 136, 155, 160, 168, 169, 171, 190, 191, 202, 203, 205, 206, 217, 219, 228, 231, 234, 242, 258, 268, 283, 290, 292, 326, 338, 342, 344, 345, 349, 350, 367, 374, 383, 387, 389, 392, 405, 409, 412, 414, 434, 443, 448, 455, 461, 485, 496, 500, 501, 504, 506, 507, 509, 520, 521, 530, 532, 538, 541, 543, 557, 559, 561, 563, 566, 572, 575, 581, 589, 590, 594, 598, 599, 617, 628, 633, 637, 643, 645, 657, 661, 665, 669, 671, 674, 680, 682, 690, 693, 696, 697, 700, 703, 704, 705, 706, 707, 709, 717, 720, 724, 733, 744, 746, 747, 748, 762, 771, 783, 784, 788, 796, 800, 804, 806, 812, 819, 821, 824, 830, 832, 836, 844, 849, 852, 859, 860, 867, 868, 872, 876, 884, 888, 892, 896, 897, 905, 908, 914, 917, 922, 925, 933, 937, 938, 941, 942, 944, 946, 953, 961, 965, 970, 977, 985, 989, 993, 1002, 1005, 1009, 1018, 1021, 1025, 1030, 1037, 1046, 1047, 1051, 1064, 1071, 1078, 1086, 1089, 1103, 1108, 1114, 1118, 1122, 1128, 1133, 1137, 1160, 1165, 1175, 1184, 1189, 1200],
  Bloomberg: [1, 9, 14, 20, 21, 26, 27, 35, 58, 66, 67, 69, 83, 88, 100, 101, 104, 108, 110, 111, 112, 118, 119, 121, 125, 136, 155, 160, 168, 169, 171, 190, 191, 202, 203, 205, 206, 217, 219, 228, 231, 234, 242, 258, 268, 283, 290, 292, 326, 338, 342, 344, 345, 349, 350, 367, 374, 383, 387, 389, 392, 405, 409, 412, 414, 434, 443, 448, 455, 461, 485, 496, 500, 501, 504, 506, 507, 509, 520, 521, 530, 532, 538, 541, 543, 557, 559, 561, 563, 566, 572, 575, 581, 589, 590, 594, 598, 599, 617, 628, 633, 637, 643, 645, 657, 661, 665, 669, 671, 674, 680, 682, 690, 693, 696, 697, 700, 703, 704, 705, 706, 707, 709, 717, 720, 724, 733, 744, 746, 747, 748, 762, 771, 783, 784, 788, 796, 800, 804, 806, 812, 819, 821, 824, 830, 832, 836, 844, 849, 852, 859, 860, 867, 868, 872, 876, 884, 888, 892, 896, 897, 905, 908, 914, 917, 922, 925, 933, 937, 938, 941, 942, 944, 946, 953, 961, 965, 970, 977, 985, 989, 993, 1002, 1005, 1009, 1018, 1021, 1025, 1030, 1037, 1046, 1047, 1051, 1064, 1071, 1078, 1086, 1089, 1103, 1108, 1114, 1118, 1122, 1128, 1133, 1137, 1160, 1165, 1175, 1184, 1189, 1200],
  Uber: [1, 9, 14, 20, 21, 26, 27, 35, 58, 66, 67, 69, 83, 88, 100, 101, 104, 108, 110, 111, 112, 118, 119, 121, 125, 136, 155, 160, 168, 169, 171, 190, 191, 202, 203, 205, 206, 217, 219, 228, 231, 234, 242, 258, 268, 283, 290, 292, 326, 338, 342, 344, 345, 349, 350, 367, 374, 383, 387, 389, 392, 405, 409, 412, 414, 434, 443, 448, 455, 461, 485, 496, 500, 501, 504, 506, 507, 509, 520, 521, 530, 532, 538, 541, 543, 557, 559, 561, 563, 566, 572, 575, 581, 589, 590, 594, 598, 599, 617, 628, 633, 637, 643, 645, 657, 661, 665, 669, 671, 674, 680, 682, 690, 693, 696, 697, 700, 703, 704, 705, 706, 707, 709, 717, 720, 724, 733, 744, 746, 747, 748, 762, 771, 783, 784, 788, 796, 800, 804, 806, 812, 819, 821, 824, 830, 832, 836, 844, 849, 852, 859, 860, 867, 868, 872, 876, 884, 888, 892, 896, 897, 905, 908, 914, 917, 922, 925, 933, 937, 938, 941, 942, 944, 946, 953, 961, 965, 970, 977, 985, 989, 993, 1002, 1005, 1009, 1018, 1021, 1025, 1030, 1037, 1046, 1047, 1051, 1064, 1071, 1078, 1086, 1089, 1103, 1108, 1114, 1118, 1122, 1128, 1133, 1137, 1160, 1165, 1175, 1184, 1189, 1200],
  TCS: [1, 9, 14, 20, 21, 26, 27, 35, 58, 66, 67, 69, 83, 88, 100, 101, 104, 108, 110, 111, 112, 118, 119, 121, 125, 136, 155, 160, 168, 169, 171, 190, 191, 202, 203, 205, 206, 217, 219, 228, 231, 234, 242, 258, 268, 283, 290, 292, 326, 338, 342, 344, 345, 349, 350, 367, 374, 383, 387, 389, 392, 405, 409, 412, 414, 434, 443, 448, 455, 461, 485, 496, 500, 501, 504, 506, 507, 509, 520, 521, 530, 532, 538, 541, 543, 557, 559, 561, 563, 566, 572, 575, 581, 589, 590, 594, 598, 599, 617, 628, 633, 637, 643, 645, 657, 661, 665, 669, 671, 674, 680, 682, 690, 693, 696, 697, 700, 703, 704, 705, 706, 707, 709, 717, 720, 724, 733, 744, 746, 747, 748, 762, 771, 783, 784, 788, 796, 800, 804, 806, 812, 819, 821, 824, 830, 832, 836, 844, 849, 852, 859, 860, 867, 868, 872, 876, 884, 888, 892, 896, 897, 905, 908, 914, 917, 922, 925, 933, 937, 938, 941, 942, 944, 946, 953, 961, 965, 970, 977, 985, 989, 993, 1002, 1005, 1009, 1018, 1021, 1025, 1030, 1037, 1046, 1047, 1051, 1064, 1071, 1078, 1086, 1089, 1103, 1108, 1114, 1118, 1122, 1128, 1133, 1137, 1160, 1165, 1175, 1184, 1189, 1200],
  Infosys: [1, 9, 14, 20, 21, 26, 27, 35, 58, 66, 67, 69, 83, 88, 100, 101, 104, 108, 110, 111, 112, 118, 119, 121, 125, 136, 155, 160, 168, 169, 171, 190, 191, 202, 203, 205, 206, 217, 219, 228, 231, 234, 242, 258, 268, 283, 290, 292, 326, 338, 342, 344, 345, 349, 350, 367, 374, 383, 387, 389, 392, 405, 409, 412, 414, 434, 443, 448, 455, 461, 485, 496, 500, 501, 504, 506, 507, 509, 520, 521, 530, 532, 538, 541, 543, 557, 559, 561, 563, 566, 572, 575, 581, 589, 590, 594, 598, 599, 617, 628, 633, 637, 643, 645, 657, 661, 665, 669, 671, 674, 680, 682, 690, 693, 696, 697, 700, 703, 704, 705, 706, 707, 709, 717, 720, 724, 733, 744, 746, 747, 748, 762, 771, 783, 784, 788, 796, 800, 804, 806, 812, 819, 821, 824, 830, 832, 836, 844, 849, 852, 859, 860, 867, 868, 872, 876, 884, 888, 892, 896, 897, 905, 908, 914, 917, 922, 925, 933, 937, 938, 941, 942, 944, 946, 953, 961, 965, 970, 977, 985, 989, 993, 1002, 1005, 1009, 1018, 1021, 1025, 1030, 1037, 1046, 1047, 1051, 1064, 1071, 1078, 1086, 1089, 1103, 1108, 1114, 1118, 1122, 1128, 1133, 1137, 1160, 1165, 1175, 1184, 1189, 1200],
  Wipro: [1, 9, 14, 20, 21, 26, 27, 35, 58, 66, 67, 69, 83, 88, 100, 101, 104, 108, 110, 111, 112, 118, 119, 121, 125, 136, 155, 160, 168, 169, 171, 190, 191, 202, 203, 205, 206, 217, 219, 228, 231, 234, 242, 258, 268, 283, 290, 292, 326, 338, 342, 344, 345, 349, 350, 367, 374, 383, 387, 389, 392, 405, 409, 412, 414, 434, 443, 448, 455, 461, 485, 496, 500, 501, 504, 506, 507, 509, 520, 521, 530, 532, 538, 541, 543, 557, 559, 561, 563, 566, 572, 575, 581, 589, 590, 594, 598, 599, 617, 628, 633, 637, 643, 645, 657, 661, 665, 669, 671, 674, 680, 682, 690, 693, 696, 697, 700, 703, 704, 705, 706, 707, 709, 717, 720, 724, 733, 744, 746, 747, 748, 762, 771, 783, 784, 788, 796, 800, 804, 806, 812, 819, 821, 824, 830, 832, 836, 844, 849, 852, 859, 860, 867, 868, 872, 876, 884, 888, 892, 896, 897, 905, 908, 914, 917, 922, 925, 933, 937, 938, 941, 942, 944, 946, 953, 961, 965, 970, 977, 985, 989, 993, 1002, 1005, 1009, 1018, 1021, 1025, 1030, 1037, 1046, 1047, 1051, 1064, 1071, 1078, 1086, 1089, 1103, 1108, 1114, 1118, 1122, 1128, 1133, 1137, 1160, 1165, 1175, 1184, 1189, 1200],
  Zoho: [1, 9, 14, 20, 21, 26, 27, 35, 58, 66, 67, 69, 83, 88, 100, 101, 104, 108, 110, 111, 112, 118, 119, 121, 125, 136, 155, 160, 168, 169, 171, 190, 191, 202, 203, 205, 206, 217, 219, 228, 231, 234, 242, 258, 268, 283, 290, 292, 326, 338, 342, 344, 345, 349, 350, 367, 374, 383, 387, 389, 392, 405, 409, 412, 414, 434, 443, 448, 455, 461, 485, 496, 500, 501, 504, 506, 507, 509, 520, 521, 530, 532, 538, 541, 543, 557, 559, 561, 563, 566, 572, 575, 581, 589, 590, 594, 598, 599, 617, 628, 633, 637, 643, 645, 657, 661, 665, 669, 671, 674, 680, 682, 690, 693, 696, 697, 700, 703, 704, 705, 706, 707, 709, 717, 720, 724, 733, 744, 746, 747, 748, 762, 771, 783, 784, 788, 796, 800, 804, 806, 812, 819, 821, 824, 830, 832, 836, 844, 849, 852, 859, 860, 867, 868, 872, 876, 884, 888, 892, 896, 897, 905, 908, 914, 917, 922, 925, 933, 937, 938, 941, 942, 944, 946, 953, 961, 965, 970, 977, 985, 989, 993, 1002, 1005, 1009, 1018, 1021, 1025, 1030, 1037, 1046, 1047, 1051, 1064, 1071, 1078, 1086, 1089, 1103, 1108, 1114, 1118, 1122, 1128, 1133, 1137, 1160, 1165, 1175, 1184, 1189, 1200],
};

const COMPANY_COLORS = {
  Google: { bg: "#4285F420", border: "#4285F4", text: "#4285F4", logo: "🔵" },
  Amazon: { bg: "#FF990020", border: "#FF9900", text: "#FF9900", logo: "🟠" },
  Microsoft: { bg: "#00A4EF20", border: "#00A4EF", text: "#00A4EF", logo: "🔷" },
  Meta: { bg: "#1877F220", border: "#1877F2", text: "#1877F2", logo: "🔹" },
  Apple: { bg: "#55555520", border: "#888", text: "#888", logo: "⬛" },
  Netflix: { bg: "#E5000020", border: "#E50000", text: "#E50000", logo: "🔴" },
  Adobe: { bg: "#FF000020", border: "#FF0000", text: "#FF0000", logo: "🟥" },
  Bloomberg: { bg: "#FF6A0020", border: "#FF6A00", text: "#FF6A00", logo: "🟧" },
  Uber: { bg: "#00000020", border: "#333", text: "#333", logo: "⬛" },
  TCS: { bg: "#00337720", border: "#003377", text: "#003377", logo: "🔵" },
  Infosys: { bg: "#00703020", border: "#007030", text: "#007030", logo: "🟢" },
  Wipro: { bg: "#67000D20", border: "#67000D", text: "#67000D", logo: "🟤" },
  Zoho: { bg: "#E8402020", border: "#E84020", text: "#E84020", logo: "🔴" },
};

const QUESTIONS = [
  {
    id: 1, num: 1, title: "Two Sum", topic: ["Array", "Hash Table"], mostAsked: true,
    askCount: 9800,
    problem: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:
Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:
Input: nums = [3,3], target = 6
Output: [0,1]

Constraints:
- 2 <= nums.length <= 10^4
- -10^9 <= nums[i] <= 10^9
- -10^9 <= target <= 10^9
- Only one valid answer exists.`,
    solution: `def twoSum(nums, target):
    seen = {}          # dictionary: value -> index
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
    whyMethod: "We use a Hash Map (dictionary) because looking up a value takes O(1) time — instant! Instead of checking every pair (slow, O(n²)), we store each number we've seen and check if its 'partner' (complement) already exists.",
    howMethod: "As we walk through the list once, for each number we calculate what number we NEED (target - current). If that needed number is already in our dictionary, we found our pair! If not, we store the current number for future checks.",
    whyFunction: "enumerate() gives us both the index AND the value at the same time — very useful when we need to return index positions. The dictionary 'seen' maps value→index for fast lookup.",
    howFunction: "complement = target - num → the number we need to complete the sum. 'if complement in seen' → O(1) dictionary lookup. seen[num] = i → store current number with its index.",
    timeComplexity: "O(n)", spaceComplexity: "O(n)",
    relatedQ: {
      title: "Two Sum II - Input Array Is Sorted (LC #167)",
      problem: "Given a SORTED array, find two numbers that add to target. Return 1-indexed positions.",
      solution: `def twoSum(numbers, target):
    left, right = 0, len(numbers) - 1
    while left < right:
        s = numbers[left] + numbers[right]
        if s == target:
            return [left + 1, right + 1]
        elif s < target:
            left += 1
        else:
            right -= 1`,
      why: "Because the array is sorted, we use Two Pointers instead of a hash map — no extra memory needed! Move left pointer right if sum is too small, move right pointer left if too big."
    }
  },
  {
    id: 2, num: 9, title: "Palindrome Number", topic: ["Math"], mostAsked: true,
    askCount: 7200,
    problem: `Given an integer x, return true if x is a palindrome, and false otherwise.

Example 1:
Input: x = 121
Output: true
Explanation: 121 reads as 121 from left to right and from right to left.

Example 2:
Input: x = -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.

Example 3:
Input: x = 10
Output: false
Explanation: Reads 01 from right to left. Therefore it is not a palindrome.

Constraints:
- -2^31 <= x <= 2^31 - 1`,
    solution: `def isPalindrome(x):
    if x < 0:          # negative → never palindrome
        return False
    s = str(x)         # convert number to string
    return s == s[::-1]  # compare with reversed string`,
    whyMethod: "The simplest approach: convert the number to a string and check if it equals its reverse. Python's string reversal (s[::-1]) makes this very clean.",
    howMethod: "First, handle the edge case: negative numbers can never be palindromes (due to the '-' sign). Then convert to string and use slice [::-1] to reverse it. Compare original and reversed.",
    whyFunction: "str(x) converts integer to string so we can use string operations. s[::-1] is Python's slicing trick: start from end, go to beginning, step -1 (reverse).",
    howFunction: "[::-1] means: [start=default:end=default:step=-1] — stepping backwards through the whole string effectively reverses it.",
    timeComplexity: "O(log n)", spaceComplexity: "O(log n)",
    relatedQ: {
      title: "Valid Palindrome (LC #125)",
      problem: "Check if a string is a palindrome, considering only alphanumeric characters, ignoring cases.",
      solution: `def isPalindrome(s):
    cleaned = [c.lower() for c in s if c.isalnum()]
    return cleaned == cleaned[::-1]`,
      why: "Same palindrome concept but for strings with spaces/punctuation. We filter out non-alphanumeric characters first, then compare."
    }
  },
  {
    id: 3, num: 20, title: "Valid Parentheses", topic: ["String", "Stack"], mostAsked: true,
    askCount: 8500,
    problem: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

Example 1:
Input: s = "()"
Output: true

Example 2:
Input: s = "()[]{}"
Output: true

Example 3:
Input: s = "(]"
Output: false

Constraints:
- 1 <= s.length <= 10^4
- s consists of parentheses only '()[]{}'.`,
    solution: `def isValid(s):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in mapping:          # closing bracket
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:                        # opening bracket
            stack.append(char)
    
    return len(stack) == 0`,
    whyMethod: "Stack is PERFECT here! Brackets have a Last-In-First-Out nature: the most recently opened bracket must be the next one closed. A stack automatically handles this nesting.",
    howMethod: "Push every opening bracket onto the stack. When we see a closing bracket, pop the top of stack and check if they match. If they don't match (or stack is empty), it's invalid. At the end, the stack should be empty.",
    whyFunction: "The mapping dictionary maps each closing bracket to its matching opening bracket. stack.pop() removes and returns the top element. '#' is a dummy value when stack is empty.",
    howFunction: "'if char in mapping' checks if char is a closing bracket (it's a key in our dict). 'mapping[char] != top' checks if the closing bracket matches the last opened one.",
    timeComplexity: "O(n)", spaceComplexity: "O(n)",
    relatedQ: {
      title: "Minimum Remove to Make Valid Parentheses (LC #1249)",
      problem: "Remove minimum parentheses to make the string valid. Return the resulting string.",
      solution: `def minRemoveToMakeValid(s):
    stack, remove = [], set()
    for i, c in enumerate(s):
        if c == '(':
            stack.append(i)
        elif c == ')':
            if stack:
                stack.pop()
            else:
                remove.add(i)
    remove |= set(stack)
    return ''.join(c for i, c in enumerate(s) if i not in remove)`,
      why: "Extension of stack idea — track unmatched brackets by their index, then remove them."
    }
  },
  {
    id: 4, num: 21, title: "Merge Two Sorted Lists", topic: ["Linked List", "Recursion"], mostAsked: true,
    askCount: 7800,
    problem: `You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

Example 1:
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]

Example 2:
Input: list1 = [], list2 = []
Output: []

Example 3:
Input: list1 = [], list2 = [0]
Output: [0]

Constraints:
- The number of nodes in both lists is in the range [0, 50].
- -100 <= Node.val <= 100
- Both list1 and list2 are sorted in non-decreasing order.`,
    solution: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def mergeTwoLists(l1, l2):
    dummy = ListNode(0)    # placeholder start node
    current = dummy
    
    while l1 and l2:
        if l1.val <= l2.val:
            current.next = l1
            l1 = l1.next
        else:
            current.next = l2
            l2 = l2.next
        current = current.next
    
    current.next = l1 or l2  # attach remaining nodes
    return dummy.next`,
    whyMethod: "Use a 'dummy' (sentinel) node to simplify edge cases. Compare heads of both lists, pick the smaller one, advance that pointer. Dummy node avoids special handling for the first node.",
    howMethod: "Create a dummy start node. Use 'current' pointer to build the new list. At each step, compare l1.val and l2.val, attach the smaller one to current.next, move that list's pointer forward. When one list runs out, attach the rest of the other.",
    whyFunction: "ListNode is the standard linked list node class. dummy = ListNode(0) is a trick — we return dummy.next at the end (skipping the placeholder). 'l1 or l2' returns the non-None list (or None if both exhausted).",
    howFunction: "current.next = l1 links our result chain to the chosen node. l1 = l1.next advances to the next node in l1. dummy.next is the actual first node of our merged result.",
    timeComplexity: "O(m+n)", spaceComplexity: "O(1)",
    relatedQ: {
      title: "Merge Sorted Array (LC #88)",
      problem: "Merge two sorted arrays nums1 and nums2 into nums1 in-place.",
      solution: `def merge(nums1, m, nums2, n):
    i, j, k = m-1, n-1, m+n-1
    while i >= 0 and j >= 0:
        if nums1[i] > nums2[j]:
            nums1[k] = nums1[i]; i -= 1
        else:
            nums1[k] = nums2[j]; j -= 1
        k -= 1
    nums1[:j+1] = nums2[:j+1]`,
      why: "Same merge idea but for arrays. Fill from the END to avoid overwriting unprocessed elements."
    }
  },
  {
    id: 5, num: 26, title: "Remove Duplicates from Sorted Array", topic: ["Array", "Two Pointers"], mostAsked: false,
    askCount: 5600,
    problem: `Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Then return the number of unique elements in nums.

Consider the number of unique elements of nums to be k. To get accepted, you need to do the following things:
1. Change the array nums such that the first k elements of nums contain the unique elements in the order they were present in nums initially.
2. Return k.

Example 1:
Input: nums = [1,1,2]
Output: 2, nums = [1,2,_]
Explanation: Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.

Example 2:
Input: nums = [0,0,1,1,1,2,2,3,3,4]
Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]
Explanation: Your function should return k = 5, with the first five elements of nums being 0, 1, 2, 3, and 4 respectively.

Constraints:
- 1 <= nums.length <= 3 * 10^4
- -100 <= nums[i] <= 100
- nums is sorted in non-decreasing order.`,
    solution: `def removeDuplicates(nums):
    if not nums:
        return 0
    
    k = 1  # first element is always unique
    
    for i in range(1, len(nums)):
        if nums[i] != nums[k - 1]:  # found new unique element
            nums[k] = nums[i]
            k += 1
    
    return k`,
    whyMethod: "Two Pointers technique: 'k' is the slow pointer (write position), 'i' is the fast pointer (read position). Since array is sorted, duplicates are adjacent — easy to detect!",
    howMethod: "'k' tracks where the next unique element should be written. 'i' scans through the array. When nums[i] is different from the last unique element (nums[k-1]), we write it at position k and increment k.",
    whyFunction: "k starts at 1 because the first element is always unique. nums[k-1] is the last confirmed unique element. In-place modification means no extra array needed — O(1) space!",
    howFunction: "nums[k] = nums[i] overwrites a duplicate position with the new unique value. k += 1 advances the write pointer. Finally return k as the count of unique elements.",
    timeComplexity: "O(n)", spaceComplexity: "O(1)",
    relatedQ: {
      title: "Remove Element (LC #27)",
      problem: "Remove all occurrences of val in-place from nums. Return new length.",
      solution: `def removeElement(nums, val):
    k = 0
    for i in range(len(nums)):
        if nums[i] != val:
            nums[k] = nums[i]
            k += 1
    return k`,
      why: "Same two-pointer pattern. Instead of skipping duplicates, we skip the specific value."
    }
  },
  {
    id: 6, num: 35, title: "Search Insert Position", topic: ["Array", "Binary Search"], mostAsked: false,
    askCount: 5100,
    problem: `Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You must write an algorithm with O(log n) runtime complexity.

Example 1:
Input: nums = [1,3,5,6], target = 5
Output: 2

Example 2:
Input: nums = [1,3,5,6], target = 2
Output: 1

Example 3:
Input: nums = [1,3,5,6], target = 7
Output: 4

Constraints:
- 1 <= nums.length <= 10^4
- -10^4 <= nums[i] <= 10^4
- nums contains distinct values sorted in ascending order.
- -10^4 <= target <= 10^4`,
    solution: `def searchInsert(nums, target):
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return left  # insert position when not found`,
    whyMethod: "Binary Search! Since the array is sorted, we can eliminate HALF the remaining elements with each comparison. O(log n) instead of O(n) linear scan.",
    howMethod: "Start with full array range. Check the middle element. If it's our target, done! If target is bigger, search right half. If target is smaller, search left half. When not found, 'left' points to where it should be inserted.",
    whyFunction: "mid = (left + right) // 2 finds the midpoint (// is integer division). We return 'left' at the end because that's where left pointer is when the loop ends — exactly the insertion point.",
    howFunction: "left <= right keeps searching while there's a valid range. left = mid + 1 moves to right half. right = mid - 1 moves to left half. When loop ends, left == right + 1, and left is the insertion position.",
    timeComplexity: "O(log n)", spaceComplexity: "O(1)",
    relatedQ: {
      title: "Binary Search (LC #704)",
      problem: "Given a sorted array and target, return index of target or -1 if not found.",
      solution: `def search(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target: return mid
        elif nums[mid] < target: left = mid + 1
        else: right = mid - 1
    return -1`,
      why: "Pure binary search — same logic but returns -1 instead of insert position when not found."
    }
  },
  {
    id: 7, num: 58, title: "Length of Last Word", topic: ["String"], mostAsked: false,
    askCount: 4200,
    problem: `Given a string s consisting of words and spaces, return the length of the last word in the string.

A word is a maximal substring consisting of non-space characters only.

Example 1:
Input: s = "Hello World"
Output: 5
Explanation: The last word is "World" with length 5.

Example 2:
Input: s = "   fly me   to   the moon  "
Output: 4
Explanation: The last word is "moon" with length 4.

Example 3:
Input: s = "luffy is still joyboy"
Output: 6
Explanation: The last word is "joyboy" with length 6.

Constraints:
- 1 <= s.length <= 10^4
- s consists of only English letters and spaces ' '.
- There will be at least one word in s.`,
    solution: `def lengthOfLastWord(s):
    return len(s.rstrip())  - s.rstrip().rfind(' ') - 1
    # OR cleaner:
    # words = s.split()
    # return len(words[-1])`,
    whyMethod: "Python's split() method handles multiple spaces and leading/trailing spaces automatically, splitting on any whitespace. This gives us a clean list of words.",
    howMethod: "s.split() splits by whitespace and ignores extra spaces. words[-1] gets the last element. len() gives its length. Very clean and Pythonic!",
    whyFunction: "split() without arguments splits on any whitespace (spaces, tabs, newlines) and removes empty strings. [-1] is Python's way to get the last element of a list.",
    howFunction: "s.split() → ['Hello', 'World'], then [-1] → 'World', then len() → 5. Works even with trailing spaces!",
    timeComplexity: "O(n)", spaceComplexity: "O(n)",
    relatedQ: {
      title: "Reverse Words in a String (LC #151)",
      problem: "Reverse the order of words in a string. Handle multiple spaces.",
      solution: `def reverseWords(s):
    return ' '.join(s.split()[::-1])`,
      why: "Same split() trick, then reverse the word list with [::-1], then join with single spaces."
    }
  },
  {
    id: 8, num: 66, title: "Plus One", topic: ["Array", "Math"], mostAsked: false,
    askCount: 4900,
    problem: `You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading 0's.

Increment the large integer by one and return the resulting array of digits.

Example 1:
Input: digits = [1,2,3]
Output: [1,2,4]
Explanation: The array represents the integer 123. Incrementing by one gives 123 + 1 = 124. Thus, the result should be [1,2,4].

Example 2:
Input: digits = [4,3,2,1]
Output: [4,3,2,2]
Explanation: The array represents the integer 4321. Incrementing by one gives 4321 + 1 = 4322. Thus, the result should be [4,3,2,2].

Example 3:
Input: digits = [9]
Output: [1,0]
Explanation: The array represents the integer 9. Incrementing by one gives 9 + 1 = 10. Thus, the result should be [1,0].

Constraints:
- 1 <= digits.length <= 100
- 0 <= digits[i] <= 9
- digits does not contain any leading 0's.`,
    solution: `def plusOne(digits):
    for i in range(len(digits) - 1, -1, -1):
        if digits[i] < 9:
            digits[i] += 1
            return digits
        digits[i] = 0   # this digit becomes 0, carry over
    
    return [1] + digits  # all digits were 9 → [1, 0, 0, ...]`,
    whyMethod: "Iterate from the last digit. If it's less than 9, just add 1 and done. If it's 9, it becomes 0 and we carry over to the next digit. Handle the all-9s edge case at the end.",
    howMethod: "range(len-1, -1, -1) goes from last index to 0. If digits[i] < 9, simple increment. If digits[i] == 9, set to 0 and continue the loop (carry). If loop completes without returning, all were 9s → prepend 1.",
    whyFunction: "range(len-1, -1, -1) is 'from last index, down to 0 (exclusive), stepping -1' — i.e., reverse traversal. [1] + digits prepends 1 to the array (list concatenation).",
    howFunction: "return digits inside the loop exits early — no need to continue. digits[i] = 0 sets current digit to 0 and loop continues with carry. The final [1] + digits handles 9→10, 99→100, etc.",
    timeComplexity: "O(n)", spaceComplexity: "O(1) usually, O(n) for all-9s case",
    relatedQ: {
      title: "Add Binary (LC #67)",
      problem: "Given two binary strings a and b, return their sum as a binary string.",
      solution: `def addBinary(a, b):
    return bin(int(a, 2) + int(b, 2))[2:]`,
      why: "Convert binary strings to integers, add, convert back. int(a, 2) reads base-2 string. bin() converts to binary. [2:] removes '0b' prefix."
    }
  },
  {
    id: 9, num: 83, title: "Remove Duplicates from Sorted List", topic: ["Linked List"], mostAsked: false,
    askCount: 4300,
    problem: `Given the head of a sorted linked list, delete all duplicates such that each element appears only once. Return the linked list sorted as well.

Example 1:
Input: head = [1,1,2]
Output: [1,2]

Example 2:
Input: head = [1,1,2,3,3]
Output: [1,2,3]

Constraints:
- The number of nodes in the list is in the range [0, 300].
- -100 <= Node.val <= 100
- The list is guaranteed to be sorted in ascending order.`,
    solution: `def deleteDuplicates(head):
    current = head
    
    while current and current.next:
        if current.val == current.next.val:
            current.next = current.next.next  # skip duplicate
        else:
            current = current.next  # move to next different node
    
    return head`,
    whyMethod: "Single pass through the list. Compare each node with the next one. If they're equal (duplicate), skip the next node by pointing to the one after it.",
    howMethod: "current pointer walks the list. When current.val == current.next.val, we skip the duplicate by setting current.next = current.next.next. When they differ, advance current. Don't advance when skipping — the new next might also be a duplicate!",
    whyFunction: "current.next = current.next.next is the 'skip' operation for linked lists. We DON'T advance current when removing a duplicate because the NEW next might also be a duplicate of current.",
    howFunction: "while current and current.next ensures both nodes exist (avoid NullPointerError). The key is only advancing 'current' when we DON'T skip, so we can check the new next node.",
    timeComplexity: "O(n)", spaceComplexity: "O(1)",
    relatedQ: {
      title: "Remove Linked List Elements (LC #203)",
      problem: "Remove all nodes with a specific value from the linked list.",
      solution: `def removeElements(head, val):
    dummy = ListNode(0, head)
    curr = dummy
    while curr.next:
        if curr.next.val == val:
            curr.next = curr.next.next
        else:
            curr = curr.next
    return dummy.next`,
      why: "Same skip technique, but uses a dummy node to handle removing the head node cleanly."
    }
  },
  {
    id: 10, num: 88, title: "Merge Sorted Array", topic: ["Array", "Two Pointers"], mostAsked: true,
    askCount: 7100,
    problem: `You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.

Merge nums1 and nums2 into a single array sorted in non-decreasing order.

The final sorted array should not be returned by the function, but instead be stored inside the array nums1. To accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be merged, and the last n elements are set to 0 and should be ignored. nums2 has a length of n.

Example 1:
Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
Output: [1,2,2,3,5,6]
Explanation: The arrays we are merging are [1,2,3] and [2,5,6]. The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1.

Example 2:
Input: nums1 = [1], m = 1, nums2 = [], n = 0
Output: [1]
Explanation: The arrays we are merging are [1] and []. The result of the merge is [1].

Example 3:
Input: nums1 = [0], m = 0, nums2 = [1], n = 1
Output: [1]
Explanation: The arrays we are merging are [] and [1]. The result of the merge is [1].
Note that because m = 0, there are no elements in nums1. The 0 is only there to ensure the merge result can fit in nums1.

Constraints:
- nums1.length == m + n
- nums2.length == n
- 0 <= m, n <= 200
- 1 <= m + n <= 200
- -10^9 <= nums1[i], nums2[j] <= 10^9`,
    solution: `def merge(nums1, m, nums2, n):
    # Start from the END to avoid overwriting
    i, j, k = m - 1, n - 1, m + n - 1
    
    while i >= 0 and j >= 0:
        if nums1[i] > nums2[j]:
            nums1[k] = nums1[i]
            i -= 1
        else:
            nums1[k] = nums2[j]
            j -= 1
        k -= 1
    
    # If nums2 has leftover elements
    nums1[:j + 1] = nums2[:j + 1]`,
    whyMethod: "Fill from the END! Since nums1 has extra space at the end, we can safely fill backwards without overwriting unprocessed nums1 elements. This avoids needing a temp array.",
    howMethod: "Three pointers: i=last of nums1 real, j=last of nums2, k=last of merged result. Compare nums1[i] and nums2[j], place the larger at nums1[k], decrement the winning pointer and k. Continue until one list is exhausted.",
    whyFunction: "Filling backwards is the key insight. nums1[:j+1] = nums2[:j+1] handles remaining nums2 elements (they're all smaller than everything placed so far).",
    howFunction: "i, j, k = m-1, n-1, m+n-1 initializes all three pointers. The while loop places one element per iteration. The final slice assignment handles edge case where nums2 has leftover elements.",
    timeComplexity: "O(m+n)", spaceComplexity: "O(1)",
    relatedQ: {
      title: "Merge Two Sorted Lists (LC #21)",
      problem: "Merge two sorted linked lists into one sorted list.",
      solution: `def mergeTwoLists(l1, l2):
    dummy = ListNode(0)
    cur = dummy
    while l1 and l2:
        if l1.val <= l2.val:
            cur.next = l1; l1 = l1.next
        else:
            cur.next = l2; l2 = l2.next
        cur = cur.next
    cur.next = l1 or l2
    return dummy.next`,
      why: "Same merge logic but for linked lists where we can't fill backwards — we build a new list from front."
    }
  },
  {
    id: 11, num: 100, title: "Same Tree", topic: ["Tree", "DFS", "BFS"], mostAsked: false,
    askCount: 4600,
    problem: `Given the roots of two binary trees p and q, write a function to check if they are the same.

Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.

Example 1:
Input: p = [1,2,3], q = [1,2,3]
Output: true

Example 2:
Input: p = [1,2], q = [1,null,2]
Output: false

Example 3:
Input: p = [1,2,1], q = [1,1,2]
Output: false

Constraints:
- The number of nodes in both trees is in the range [0, 100].
- -10^4 <= Node.val <= 10^4`,
    solution: `def isSameTree(p, q):
    # Base cases
    if not p and not q:  # both None → same
        return True
    if not p or not q:   # one None, one not → different
        return False
    if p.val != q.val:   # different values → different
        return False
    
    # Recursively check left and right subtrees
    return isSameTree(p.left, q.left) and isSameTree(p.right, q.right)`,
    whyMethod: "Recursion (DFS) is natural for trees! We check: 1) Are both empty? (same) 2) Is only one empty? (different) 3) Do they have same value? Then recursively check left subtrees match AND right subtrees match.",
    howMethod: "The function calls itself on smaller subproblems (subtrees). Base cases handle when we've reached leaf nodes or mismatches. The recursive case checks both subtrees must match.",
    whyFunction: "'not p and not q' — both None means we've reached the end of both branches simultaneously → match. 'not p or not q' — only one is None → structure mismatch. The 'and' in the return ensures BOTH subtrees must match.",
    howFunction: "Recursion unwinds from the bottom up. Each call checks one node and delegates subtree checking to recursive calls. The 'and' short-circuits: if left subtrees don't match, right won't even be checked.",
    timeComplexity: "O(n)", spaceComplexity: "O(h) where h is tree height",
    relatedQ: {
      title: "Symmetric Tree (LC #101)",
      problem: "Check if a binary tree is symmetric (mirror of itself).",
      solution: `def isSymmetric(root):
    def isMirror(l, r):
        if not l and not r: return True
        if not l or not r: return False
        return l.val == r.val and isMirror(l.left, r.right) and isMirror(l.right, r.left)
    return isMirror(root.left, root.right)`,
      why: "Same recursive structure, but we compare left.left with right.right and left.right with right.left (mirror check)."
    }
  },
  {
    id: 12, num: 104, title: "Maximum Depth of Binary Tree", topic: ["Tree", "DFS", "BFS"], mostAsked: true,
    askCount: 6800,
    problem: `Given the root of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

Example 1:
Input: root = [3,9,20,null,null,15,7]
Output: 3

Example 2:
Input: root = [1,null,2]
Output: 2

Constraints:
- The number of nodes in the tree is in the range [0, 10^4].
- -100 <= Node.val <= 100`,
    solution: `def maxDepth(root):
    if not root:
        return 0
    
    left_depth = maxDepth(root.left)
    right_depth = maxDepth(root.right)
    
    return 1 + max(left_depth, right_depth)`,
    whyMethod: "Recursive DFS: the depth of a tree = 1 (current node) + max(depth of left subtree, depth of right subtree). This naturally decomposes into smaller subproblems.",
    howMethod: "Base case: empty tree has depth 0. Recursively get depth of left and right subtrees. Current node adds 1 to the deeper subtree's depth.",
    whyFunction: "max(left_depth, right_depth) picks the deeper path. Adding 1 accounts for the current node. This elegantly handles all cases including unbalanced trees.",
    howFunction: "When root is None (leaf's children), return 0. Each node returns 1 + max of children's depths. The root's return value is the total tree depth.",
    timeComplexity: "O(n)", spaceComplexity: "O(h)",
    relatedQ: {
      title: "Minimum Depth of Binary Tree (LC #111)",
      problem: "Return the minimum depth (shortest path from root to a leaf).",
      solution: `def minDepth(root):
    if not root: return 0
    if not root.left: return 1 + minDepth(root.right)
    if not root.right: return 1 + minDepth(root.left)
    return 1 + min(minDepth(root.left), minDepth(root.right))`,
      why: "Similar but use min() instead of max(). Special handling needed for nodes with only one child — they can't be a leaf."
    }
  },
  {
    id: 13, num: 121, title: "Best Time to Buy and Sell Stock", topic: ["Array", "Dynamic Programming"], mostAsked: true,
    askCount: 9200,
    problem: `You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

Example 1:
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5. Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.

Example 2:
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.

Constraints:
- 1 <= prices.length <= 10^5
- 0 <= prices[i] <= 10^4`,
    solution: `def maxProfit(prices):
    min_price = float('inf')  # lowest buy price seen
    max_profit = 0
    
    for price in prices:
        if price < min_price:
            min_price = price       # found a better buy day
        elif price - min_price > max_profit:
            max_profit = price - min_price  # found better profit
    
    return max_profit`,
    whyMethod: "Single pass greedy approach. Track the minimum price seen so far (best buy point). For each day, calculate profit if we sold today. Update max profit. No need to check all pairs!",
    howMethod: "float('inf') initializes min_price to infinity (any real price will be smaller). As we scan prices: update min_price if we find a lower price, otherwise calculate today's profit vs current max.",
    whyFunction: "float('inf') is 'infinity' in Python — guarantees the first real price will update min_price. This avoids initializing with prices[0] and writing extra edge case code.",
    howFunction: "if price < min_price: we found a cheaper buy point. elif price - min_price > max_profit: today's price minus cheapest buy gives profit — if better than current max, update. We return 0 minimum (no profit case).",
    timeComplexity: "O(n)", spaceComplexity: "O(1)",
    relatedQ: {
      title: "Best Time to Buy and Sell Stock II (LC #122) — Medium",
      problem: "You can buy/sell multiple times. Maximize total profit.",
      solution: `def maxProfit(prices):
    profit = 0
    for i in range(1, len(prices)):
        if prices[i] > prices[i-1]:
            profit += prices[i] - prices[i-1]
    return profit`,
      why: "With unlimited transactions, simply grab every upward movement (local profit). No need to track min/max across the whole array."
    }
  },
  {
    id: 14, num: 136, title: "Single Number", topic: ["Array", "Bit Manipulation"], mostAsked: true,
    askCount: 7500,
    problem: `Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.

You must implement a solution with a linear runtime complexity and use only constant extra space.

Example 1:
Input: nums = [2,2,1]
Output: 1

Example 2:
Input: nums = [4,1,2,1,2]
Output: 4

Example 3:
Input: nums = [1]
Output: 1

Constraints:
- 1 <= nums.length <= 3 * 10^4
- -3 * 10^4 <= nums[i] <= 3 * 10^4
- Each element in the array appears twice except for one element which appears only once.`,
    solution: `def singleNumber(nums):
    result = 0
    for num in nums:
        result ^= num  # XOR each number
    return result`,
    whyMethod: "XOR (exclusive OR) bit trick! XOR has a magical property: x XOR x = 0 (same numbers cancel), x XOR 0 = x (XOR with 0 keeps number). So XORing all numbers, pairs cancel and the single one remains!",
    howMethod: "Start with result = 0. XOR every number into result. Pairs cancel out (a^a=0). The lone number XORed with 0 is itself. Final result is the single number.",
    whyFunction: "^= is the XOR assignment operator. 0 is the identity element for XOR (x^0 = x). This achieves O(1) space which a hash map solution wouldn't — XOR is the space-efficient trick here.",
    howFunction: "[2,2,1]: 0^2=2, 2^2=0, 0^1=1. Result=1 ✓. [4,1,2,1,2]: 0^4=4, 4^1=5, 5^2=7, 7^1=6, 6^2=4. Result=4 ✓.",
    timeComplexity: "O(n)", spaceComplexity: "O(1)",
    relatedQ: {
      title: "Missing Number (LC #268)",
      problem: "Given [0..n] with one number missing, find it.",
      solution: `def missingNumber(nums):
    n = len(nums)
    return n*(n+1)//2 - sum(nums)`,
      why: "Expected sum - actual sum = missing number. XOR approach also works: XOR all indices 0..n with all nums."
    }
  },
  {
    id: 15, num: 155, title: "Min Stack", topic: ["Stack", "Design"], mostAsked: true,
    askCount: 7000,
    problem: `Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Implement the MinStack class:
- MinStack() initializes the stack object.
- void push(int val) pushes the element val onto the stack.
- void pop() removes the element on the top of the stack.
- int top() gets the top element of the stack.
- int getMin() retrieves the minimum element in the stack.

You must implement a solution with O(1) time complexity for each function.

Example 1:
Input:
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]
Output:
[null,null,null,null,-3,null,0,-2]

Constraints:
- -2^31 <= val <= 2^31 - 1
- Methods pop, top and getMin will always be called on non-empty stacks.
- At most 3 * 10^4 calls will be made to push, pop, top, and getMin.`,
    solution: `class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []  # parallel stack tracking minimums
    
    def push(self, val):
        self.stack.append(val)
        # min_stack top is always current minimum
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)
    
    def pop(self):
        val = self.stack.pop()
        if val == self.min_stack[-1]:
            self.min_stack.pop()
    
    def top(self):
        return self.stack[-1]
    
    def getMin(self):
        return self.min_stack[-1]`,
    whyMethod: "Use TWO stacks: main stack for values, auxiliary 'min_stack' that tracks the minimum at each state. The min_stack top always tells the current minimum in O(1).",
    howMethod: "min_stack grows when a new element is ≤ current min. It shrinks when the popped element equals the current min. This way, min_stack always has the correct minimum for the current stack state.",
    whyFunction: "self.min_stack[-1] is O(1) stack top access. 'val <= self.min_stack[-1]' — we use <= so duplicate minimums are properly tracked. When we pop the minimum value, we also pop from min_stack.",
    howFunction: "Push: if min_stack empty OR new val ≤ current min, push to min_stack. Pop: if popped val == current min, also pop from min_stack. getMin: just return min_stack[-1].",
    timeComplexity: "O(1) for all operations", spaceComplexity: "O(n)",
    relatedQ: {
      title: "Implement Queue using Stacks (LC #232)",
      problem: "Implement a FIFO queue using only stack operations.",
      solution: `class MyQueue:
    def __init__(self):
        self.in_stack = []
        self.out_stack = []
    def push(self, x): self.in_stack.append(x)
    def pop(self):
        self.peek()
        return self.out_stack.pop()
    def peek(self):
        if not self.out_stack:
            while self.in_stack:
                self.out_stack.append(self.in_stack.pop())
        return self.out_stack[-1]
    def empty(self): return not self.in_stack and not self.out_stack`,
      why: "Two-stack technique: use two stacks to simulate queue (FIFO). Push to in_stack; when out_stack empty, pour in_stack into out_stack (reverses order → FIFO)."
    }
  },
  {
    id: 16, num: 160, title: "Intersection of Two Linked Lists", topic: ["Linked List", "Two Pointers"], mostAsked: false,
    askCount: 5300,
    problem: `Given the heads of two singly linked-lists headA and headB, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return null.

For example, the following two linked lists begin to intersect at node c1:
A: a1 → a2 → c1 → c2 → c3
B: b1 → b2 → b3 → c1 → c2 → c3

Note that the linked lists must retain their original structure after the function returns.

Example 1:
Input: intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3
Output: Intersected at '8'

Example 2:
Input: intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
Output: Intersected at '2'

Constraints:
- The number of nodes of listA is in the m.
- The number of nodes of listB is in the n.
- 1 <= m, n <= 3 * 10^4
- 1 <= Node.val <= 10^5
- intersectVal is 0 if listA and listB do not intersect.`,
    solution: `def getIntersectionNode(headA, headB):
    a, b = headA, headB
    
    while a != b:
        a = a.next if a else headB
        b = b.next if b else headA
    
    return a`,
    whyMethod: "Elegant two-pointer trick! Both pointers traverse the same total distance (len(A) + len(B)). When one reaches the end, redirect it to the other list's head. They'll meet at the intersection (or both reach None).",
    howMethod: "Pointer a walks A then B. Pointer b walks B then A. Both walk exactly len(A)+len(B) steps. If there's an intersection, they'll align at it. If not, both reach None simultaneously.",
    whyFunction: "'a = a.next if a else headB' — when a reaches None, redirect to headB. After one full round, both pointers are in sync by distance. This is a clever mathematical insight about path lengths.",
    howFunction: "After redirection, a has walked: len(A) + (intersection offset from B). b has walked: len(B) + (intersection offset from A). If they intersect, these are equal → same node!",
    timeComplexity: "O(m+n)", spaceComplexity: "O(1)",
    relatedQ: {
      title: "Linked List Cycle (LC #141)",
      problem: "Detect if a linked list has a cycle.",
      solution: `def hasCycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False`,
      why: "Floyd's cycle detection (slow/fast pointers). Fast moves 2x. If there's a cycle, fast will eventually lap slow and they'll meet."
    }
  },
  {
    id: 17, num: 169, title: "Majority Element", topic: ["Array", "Hash Table"], mostAsked: true,
    askCount: 7600,
    problem: `Given an array nums of size n, return the majority element.

The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.

Example 1:
Input: nums = [3,2,3]
Output: 3

Example 2:
Input: nums = [2,2,1,1,1,2,2]
Output: 2

Constraints:
- n == nums.length
- 1 <= n <= 5 * 10^4
- -10^9 <= nums[i] <= 10^9`,
    solution: `def majorityElement(nums):
    # Boyer-Moore Voting Algorithm
    count = 0
    candidate = None
    
    for num in nums:
        if count == 0:
            candidate = num  # pick new candidate
        count += (1 if num == candidate else -1)
    
    return candidate`,
    whyMethod: "Boyer-Moore Voting Algorithm — brilliant O(1) space solution! Key insight: if we 'cancel out' pairs of different elements, the majority element always survives since it appears > n/2 times.",
    howMethod: "Track a 'candidate' and its 'count'. When count drops to 0, pick a new candidate. Increment count when current num matches candidate, decrement when it doesn't. The majority element will be the last standing candidate.",
    whyFunction: "count starts at 0 so the very first element becomes candidate. '+1 if match, -1 if not' is the voting mechanism. Since majority appears > n/2 times, it cannot be fully cancelled out.",
    howFunction: "[3,2,3]: count=0→candidate=3,count=1; num=2→count=0; count=0→candidate=3,count=1. Return 3 ✓. This is optimal — one pass, constant space.",
    timeComplexity: "O(n)", spaceComplexity: "O(1)",
    relatedQ: {
      title: "Find Mode in Binary Search Tree (LC #501)",
      problem: "Find mode(s) in a BST (values appearing most frequently).",
      solution: `def findMode(root):
    from collections import Counter
    def inorder(node):
        if not node: return []
        return inorder(node.left) + [node.val] + inorder(node.right)
    vals = inorder(root)
    freq = Counter(vals)
    max_f = max(freq.values())
    return [k for k, v in freq.items() if v == max_f]`,
      why: "Counter from collections module counts frequencies efficiently. Then filter for keys with max frequency."
    }
  },
  {
    id: 18, num: 206, title: "Reverse Linked List", topic: ["Linked List", "Recursion"], mostAsked: true,
    askCount: 9500,
    problem: `Given the head of a singly linked list, reverse the list, and return the reversed list.

Example 1:
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]

Example 2:
Input: head = [1,2]
Output: [2,1]

Example 3:
Input: head = []
Output: []

Constraints:
- The number of nodes in the list is the range [0, 5000].
- -5000 <= Node.val <= 5000`,
    solution: `def reverseList(head):
    prev = None
    current = head
    
    while current:
        next_node = current.next  # save next before overwriting
        current.next = prev       # reverse the pointer
        prev = current            # move prev forward
        current = next_node       # move current forward
    
    return prev  # prev is now the new head`,
    whyMethod: "Iterative approach using three pointers: prev, current, next_node. At each step, reverse the pointer direction of current node, then advance all three pointers.",
    howMethod: "Before reversing a pointer, save the next node (otherwise we lose the rest of the list!). Then flip current.next to point backward. Advance prev and current. When current is None, prev is the new head.",
    whyFunction: "next_node = current.next MUST be saved first — once we do current.next = prev, we'd lose the forward connection. prev starts as None because the original head becomes the tail (pointing to None).",
    howFunction: "Step by step for 1→2→3: 1) save(2), 1→None, prev=1, curr=2. 2) save(3), 2→1, prev=2, curr=3. 3) save(None), 3→2, prev=3, curr=None. Return prev=3 (new head).",
    timeComplexity: "O(n)", spaceComplexity: "O(1)",
    relatedQ: {
      title: "Palindrome Linked List (LC #234)",
      problem: "Check if a linked list is a palindrome.",
      solution: `def isPalindrome(head):
    vals = []
    while head:
        vals.append(head.val)
        head = head.next
    return vals == vals[::-1]`,
      why: "Collect values into a list, then check if list equals its reverse. Simple approach using reverseList logic conceptually."
    }
  },
  {
    id: 19, num: 217, title: "Contains Duplicate", topic: ["Array", "Hash Table"], mostAsked: true,
    askCount: 8100,
    problem: `Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.

Example 1:
Input: nums = [1,2,3,1]
Output: true

Example 2:
Input: nums = [1,2,3,4]
Output: false

Example 3:
Input: nums = [1,1,1,3,3,4,3,2,4,2]
Output: true

Constraints:
- 1 <= nums.length <= 10^5
- -10^9 <= nums[i] <= 10^9`,
    solution: `def containsDuplicate(nums):
    return len(nums) != len(set(nums))`,
    whyMethod: "A set only stores UNIQUE values. If the set size is smaller than the original array, there must be duplicates. One-liner Python solution!",
    howMethod: "set(nums) creates a set with all unique values. If its length differs from nums length, duplicates exist. Simple and elegant.",
    whyFunction: "set() is a Python built-in that automatically removes duplicates. len() gets the count. If any duplicate exists, set will be smaller.",
    howFunction: "[1,2,3,1]: set → {1,2,3} (length 3) ≠ original (length 4) → True (has duplicate). [1,2,3]: set → {1,2,3} (length 3) == original (length 3) → False.",
    timeComplexity: "O(n)", spaceComplexity: "O(n)",
    relatedQ: {
      title: "Contains Duplicate II (LC #219)",
      problem: "Return true if same value appears within k positions of each other.",
      solution: `def containsNearbyDuplicate(nums, k):
    seen = {}
    for i, num in enumerate(nums):
        if num in seen and i - seen[num] <= k:
            return True
        seen[num] = i
    return False`,
      why: "Hash map stores last seen index. For each number, check if previously seen within k distance."
    }
  },
  {
    id: 20, num: 242, title: "Valid Anagram", topic: ["String", "Hash Table"], mostAsked: true,
    askCount: 7900,
    problem: `Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

Example 1:
Input: s = "anagram", t = "nagaram"
Output: true

Example 2:
Input: s = "rat", t = "car"
Output: false

Constraints:
- 1 <= s.length, t.length <= 5 * 10^4
- s and t consist of lowercase English letters.`,
    solution: `def isAnagram(s, t):
    from collections import Counter
    return Counter(s) == Counter(t)`,
    whyMethod: "Counter is perfect here — it counts character frequencies. Two strings are anagrams if and only if they have identical character frequency distributions.",
    howMethod: "Counter(s) creates a dictionary of {char: count}. Counter('anagram') = {'a':3,'n':1,'g':1,'r':1,'m':1}. If both counters are equal, it's an anagram.",
    whyFunction: "Counter from collections module is Python's built-in frequency counter. It returns a dict-like object. Direct equality comparison (==) checks if all key-value pairs match.",
    howFunction: "Counter('anagram') == Counter('nagaram') → {'a':3,'n':1,'g':1,'r':1,'m':1} == {'n':1,'a':3,'g':1,'r':1,'a':1,'m':1} → True (order doesn't matter in dicts).",
    timeComplexity: "O(n)", spaceComplexity: "O(1) for lowercase letters (at most 26 keys)",
    relatedQ: {
      title: "Group Anagrams (LC #49) — Medium",
      problem: "Group a list of strings into anagram groups.",
      solution: `def groupAnagrams(strs):
    from collections import defaultdict
    groups = defaultdict(list)
    for s in strs:
        key = tuple(sorted(s))
        groups[key].append(s)
    return list(groups.values())`,
      why: "Sort each string to get a canonical 'anagram key'. Group strings by their sorted form using a defaultdict."
    }
  },
  {
    id: 21, num: 268, title: "Missing Number", topic: ["Array", "Math", "Bit Manipulation"], mostAsked: true,
    askCount: 7200,
    problem: `Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.

Example 1:
Input: nums = [3,0,1]
Output: 2
Explanation: n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number in the range since it does not appear in nums.

Example 2:
Input: nums = [0,1]
Output: 2
Explanation: n = 2 since there are 2 numbers, so all numbers are in the range [0,2]. 2 is the missing number in the range since it does not appear in nums.

Example 3:
Input: nums = [9,6,4,2,3,5,7,0,1]
Output: 8

Constraints:
- n == nums.length
- 1 <= n <= 10^4
- 0 <= nums[i] <= n
- All the numbers of nums are unique.`,
    solution: `def missingNumber(nums):
    n = len(nums)
    expected = n * (n + 1) // 2  # sum of 0..n
    return expected - sum(nums)`,
    whyMethod: "Math formula! Sum of 0 to n = n*(n+1)/2. The difference between expected sum and actual sum is the missing number. O(1) space!",
    howMethod: "Calculate expected total using the arithmetic sum formula. Calculate actual sum. Missing = Expected - Actual.",
    whyFunction: "n*(n+1)//2 is Gauss's formula for sum of first n natural numbers. // is integer division. sum(nums) is Python's built-in sum function.",
    howFunction: "[3,0,1]: n=3, expected=3*4//2=6, actual=3+0+1=4, missing=6-4=2 ✓.",
    timeComplexity: "O(n)", spaceComplexity: "O(1)",
    relatedQ: {
      title: "Find the Duplicate Number (LC #287) — Medium",
      problem: "Find the duplicate number in array [1..n] with one duplicate.",
      solution: `def findDuplicate(nums):
    slow = fast = nums[0]
    while True:
        slow = nums[slow]
        fast = nums[nums[fast]]
        if slow == fast: break
    slow = nums[0]
    while slow != fast:
        slow = nums[slow]
        fast = nums[fast]
    return slow`,
      why: "Floyd's cycle detection on the array interpreted as a linked list. The duplicate creates the cycle's entry point."
    }
  },
  {
    id: 22, num: 283, title: "Move Zeroes", topic: ["Array", "Two Pointers"], mostAsked: true,
    askCount: 7400,
    problem: `Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.

Note that you must do this in-place without making a copy of the array.

Example 1:
Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]

Example 2:
Input: nums = [0]
Output: [0]

Constraints:
- 1 <= nums.length <= 10^4
- -2^31 <= nums[i] <= 2^31 - 1`,
    solution: `def moveZeroes(nums):
    insert_pos = 0  # position to write next non-zero
    
    for num in nums:
        if num != 0:
            nums[insert_pos] = num
            insert_pos += 1
    
    # Fill remaining positions with zeros
    while insert_pos < len(nums):
        nums[insert_pos] = 0
        insert_pos += 1`,
    whyMethod: "Two-pass approach: first, write all non-zero elements to the front (maintaining order). Then fill the rest with zeros. The 'insert_pos' pointer tracks where to write next non-zero.",
    howMethod: "First loop: scan all elements; when non-zero, write it to insert_pos and advance insert_pos. Second loop: fill from insert_pos to end with zeros.",
    whyFunction: "insert_pos starts at 0 (front of array). Writing non-zeros to insert_pos compacts them. The remaining positions (insert_pos to end) are all zeros.",
    howFunction: "[0,1,0,3,12]: After first pass: [1,3,12,3,12] (insert_pos=3). After second pass: [1,3,12,0,0] ✓.",
    timeComplexity: "O(n)", spaceComplexity: "O(1)",
    relatedQ: {
      title: "Remove Duplicates from Sorted Array (LC #26)",
      problem: "Remove duplicates in-place from a sorted array.",
      solution: `def removeDuplicates(nums):
    k = 1
    for i in range(1, len(nums)):
        if nums[i] != nums[k-1]:
            nums[k] = nums[i]
            k += 1
    return k`,
      why: "Same two-pointer write-position pattern. Instead of filtering zeros, filtering duplicates."
    }
  },
  {
    id: 23, num: 344, title: "Reverse String", topic: ["String", "Two Pointers"], mostAsked: false,
    askCount: 5500,
    problem: `Write a function that reverses a string. The input string is given as an array of characters s.

You must do this by modifying the input array in-place with O(1) extra memory.

Example 1:
Input: s = ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]

Example 2:
Input: s = ["H","a","n","n","a","h"]
Output: ["h","a","n","n","a","H"]

Constraints:
- 1 <= s.length <= 10^5
- s[i] is a printable ascii character.`,
    solution: `def reverseString(s):
    left, right = 0, len(s) - 1
    
    while left < right:
        s[left], s[right] = s[right], s[left]  # swap
        left += 1
        right -= 1`,
    whyMethod: "Two-pointer swap: one pointer at start, one at end. Swap them, move both inward. Stop when they meet/cross. Classic in-place reversal!",
    howMethod: "left starts at index 0, right at last index. Swap s[left] and s[right]. Move left forward (+1) and right backward (-1). Repeat until left >= right.",
    whyFunction: "Python's tuple swap: s[left], s[right] = s[right], s[left] swaps in one line (no temp variable needed!). while left < right ensures we don't swap back after meeting.",
    howFunction: "['h','e','l','l','o']: swap(h,o)→['o','e','l','l','h'], swap(e,l)→['o','l','l','e','h'], left=right (stop). Done ✓.",
    timeComplexity: "O(n)", spaceComplexity: "O(1)",
    relatedQ: {
      title: "Reverse Vowels of a String (LC #345)",
      problem: "Reverse only the vowels of a string.",
      solution: `def reverseVowels(s):
    s = list(s)
    vowels = set('aeiouAEIOU')
    l, r = 0, len(s)-1
    while l < r:
        while l < r and s[l] not in vowels: l += 1
        while l < r and s[r] not in vowels: r -= 1
        s[l], s[r] = s[r], s[l]
        l += 1; r -= 1
    return ''.join(s)`,
      why: "Same two-pointer swap, but skip non-vowels. Add inner while loops to advance pointers past consonants."
    }
  },
  {
    id: 24, num: 350, title: "Intersection of Two Arrays II", topic: ["Array", "Hash Table", "Two Pointers"], mostAsked: false,
    askCount: 5800,
    problem: `Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must appear as many times as it shows in both arrays and you may return the result in any order.

Example 1:
Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2,2]

Example 2:
Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [4,9]
Explanation: [9,4] is also accepted.

Constraints:
- 1 <= nums1.length, nums2.length <= 1000
- 0 <= nums1[i], nums2[i] <= 1000`,
    solution: `def intersect(nums1, nums2):
    from collections import Counter
    c1 = Counter(nums1)
    c2 = Counter(nums2)
    
    result = []
    for num in c1:
        if num in c2:
            count = min(c1[num], c2[num])  # take minimum occurrence
            result.extend([num] * count)
    
    return result`,
    whyMethod: "Count frequencies of both arrays using Counter. For each common element, take the minimum count (that's how many times it appears in both).",
    howMethod: "Counter gives frequency maps. Iterate over one counter's keys; if key exists in the other, add it min(freq1, freq2) times to result.",
    whyFunction: "min(c1[num], c2[num]) gives the number of times num appears in BOTH arrays. extend([num]*count) adds that element 'count' times to result list.",
    howFunction: "nums1=[1,2,2,1]: c1={1:2,2:2}. nums2=[2,2]: c2={2:2}. Common: 2, count=min(2,2)=2 → result=[2,2] ✓.",
    timeComplexity: "O(m+n)", spaceComplexity: "O(min(m,n))",
    relatedQ: {
      title: "Intersection of Two Arrays (LC #349)",
      problem: "Return the intersection (unique elements only).",
      solution: `def intersection(nums1, nums2):
    return list(set(nums1) & set(nums2))`,
      why: "Set intersection (&) gives common unique elements directly. Simpler when duplicates don't matter."
    }
  },
  {
    id: 25, num: 412, title: "Fizz Buzz", topic: ["Math", "String", "Simulation"], mostAsked: false,
    askCount: 6200,
    problem: `Given an integer n, return a string array answer (1-indexed) where:
- answer[i] == "FizzBuzz" if i is divisible by 3 and 5.
- answer[i] == "Fizz" if i is divisible by 3.
- answer[i] == "Buzz" if i is divisible by 5.
- answer[i] == i (as a string) if none of the above conditions are true.

Example 1:
Input: n = 3
Output: ["1","2","Fizz"]

Example 2:
Input: n = 5
Output: ["1","2","Fizz","4","Buzz"]

Example 3:
Input: n = 15
Output: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]

Constraints:
- 1 <= n <= 10^4`,
    solution: `def fizzBuzz(n):
    result = []
    for i in range(1, n + 1):
        if i % 15 == 0:         # divisible by both 3 and 5
            result.append("FizzBuzz")
        elif i % 3 == 0:        # divisible by 3 only
            result.append("Fizz")
        elif i % 5 == 0:        # divisible by 5 only
            result.append("Buzz")
        else:
            result.append(str(i))
    return result`,
    whyMethod: "Straightforward simulation. Check divisibility in order: 15 first (both), then 3, then 5, then default to number. MUST check 15 first, otherwise 15 would match 3 before reaching FizzBuzz.",
    howMethod: "% (modulo) operator gives remainder. If remainder is 0, divisible. Check 15 (3×5) before 3 or 5 to correctly catch FizzBuzz case.",
    whyFunction: "% is the modulo/remainder operator. i%15 checks if divisible by both 3 and 5. str(i) converts the integer to string (the result is a string list).",
    howFunction: "15%15=0→FizzBuzz. 9%3=0→Fizz. 10%5=0→Buzz. 7→'7'. The order of checks matters critically!",
    timeComplexity: "O(n)", spaceComplexity: "O(n)",
    relatedQ: {
      title: "Number of Students Unable to Eat Lunch (LC #1700)",
      problem: "Circular queue of students, stack of sandwiches. Return students who can't eat.",
      solution: `def countStudents(students, sandwiches):
    from collections import Counter
    count = Counter(students)
    for s in sandwiches:
        if count[s] == 0:
            return count[0] + count[1]
        count[s] -= 1
    return 0`,
      why: "Count student preferences. If the top sandwich can't be served (count=0), remaining students can't eat."
    }
  },
  {
    id: 26, num: 448, title: "Find All Numbers Disappeared in an Array", topic: ["Array", "Hash Table"], mostAsked: false,
    askCount: 5900,
    problem: `Given an array nums of n integers where nums[i] is in the range [1, n], return an array of all the integers in the range [1, n] that do not appear in nums.

Example 1:
Input: nums = [4,3,2,7,8,2,3,1]
Output: [5,6]

Example 2:
Input: nums = [1,1]
Output: [2]

Constraints:
- n == nums.length
- 1 <= n <= 10^5
- 1 <= nums[i] <= n`,
    solution: `def findDisappearedNumbers(nums):
    # Mark visited indices as negative
    for num in nums:
        idx = abs(num) - 1  # convert to 0-indexed
        if nums[idx] > 0:
            nums[idx] = -nums[idx]  # negate to mark as visited
    
    # Indices still positive → those numbers are missing
    return [i + 1 for i, val in enumerate(nums) if val > 0]`,
    whyMethod: "Clever O(1) space trick: use the array itself as a visited marker! Since values are 1..n, use abs(value)-1 as an index. Negate the value at that index to mark it as 'seen'.",
    howMethod: "For each number num, calculate index idx = abs(num)-1. Negate nums[idx] to mark that number as seen. After processing, indices with positive values = those numbers were never seen = missing!",
    whyFunction: "abs(num) handles already-negated numbers. -1 converts 1-indexed to 0-indexed. The negation trick avoids using extra space — the original array serves as a boolean visited array.",
    howFunction: "[4,3,2,7,8,2,3,1]: Process 4→negate[3], process 3→negate[2], ... After: [-4,-3,-2,-7,8,2,-3,-1]. Positive at index 4(value 8→num 5) and index 5(value 2→num 6). Return [5,6] ✓.",
    timeComplexity: "O(n)", spaceComplexity: "O(1)",
    relatedQ: {
      title: "Find the Duplicate Number (LC #287) — Medium",
      problem: "Find the one duplicate in array [1..n].",
      solution: `def findDuplicate(nums):
    for num in nums:
        idx = abs(num) - 1
        if nums[idx] < 0:
            return abs(num)
        nums[idx] = -nums[idx]`,
      why: "Same negation trick but detect when we try to negate an already-negative index — that's the duplicate!"
    }
  },
  {
    id: 27, num: 509, title: "Fibonacci Number", topic: ["Math", "Dynamic Programming", "Recursion"], mostAsked: false,
    askCount: 6100,
    problem: `F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2) for n>1. Return F(n).

Example 1:
Input: n = 2
Output: 1

Example 2:
Input: n = 4
Output: 3

Constraints:
- 0 <= n <= 30`,
    solution: `def fib(n):
    if n <= 1:
        return n
    
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b  # slide window forward
    
    return b`,
    whyMethod: "Iterative DP (bottom-up). Instead of recursion (which recalculates the same values repeatedly), track just the last two Fibonacci numbers. O(n) time, O(1) space!",
    howMethod: "a and b are consecutive Fibonacci numbers. At each step, the new pair is (b, a+b). Slide this window n-1 times from (F0,F1) to reach (F(n-1), Fn).",
    whyFunction: "a, b = b, a+b is a simultaneous assignment — Python evaluates right side first, then assigns. So both a and b update correctly in one line without a temp variable.",
    howFunction: "Start: a=0(F0), b=1(F1). Step1: a=1, b=0+1=1. Step2: a=1, b=1+1=2. Step3: a=2, b=1+2=3. Step4: a=3, b=2+3=5. For n=4: return b=3 ✓.",
    timeComplexity: "O(n)", spaceComplexity: "O(1)",
    relatedQ: {
      title: "Climbing Stairs (LC #70) — same as Fibonacci!",
      problem: "Count ways to climb n stairs taking 1 or 2 steps at a time.",
      solution: `def climbStairs(n):
    if n <= 2: return n
    a, b = 1, 2
    for _ in range(3, n + 1):
        a, b = b, a + b
    return b`,
      why: "Climbing stairs IS Fibonacci! Ways(n) = Ways(n-1) + Ways(n-2). Identical recurrence relation."
    }
  },
  {
    id: 28, num: 704, title: "Binary Search", topic: ["Array", "Binary Search"], mostAsked: false,
    askCount: 6400,
    problem: `Given sorted array of distinct integers and a target, return the index if found, or -1 if not.

Example 1:
Input: nums=[-1,0,3,5,9,12], target=9
Output: 4

Example 2:
Input: nums=[-1,0,3,5,9,12], target=2
Output: -1

Constraints:
- 1 <= nums.length <= 10^4
- -10^4 < nums[i], target < 10^4`,
    solution: `def search(nums, target):
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = left + (right - left) // 2  # avoid integer overflow
        
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1   # search right half
        else:
            right = mid - 1  # search left half
    
    return -1`,
    whyMethod: "Binary Search is the fundamental divide-and-conquer algorithm for sorted arrays. Each comparison eliminates HALF the remaining elements → O(log n) instead of O(n) linear scan.",
    howMethod: "Maintain search range [left, right]. Find middle. If middle is target → found. If too small → target must be right → left = mid+1. If too big → target must be left → right = mid-1.",
    whyFunction: "mid = left + (right-left)//2 prevents integer overflow (vs (left+right)//2). In Python overflow isn't an issue, but it's good practice. Return -1 when left > right means target not found.",
    howFunction: "[-1,0,3,5,9,12], target=9: mid=2(val=3)<9→left=3. mid=4(val=9)==9→return 4 ✓. Only 2 steps vs 5 in linear search!",
    timeComplexity: "O(log n)", spaceComplexity: "O(1)",
    relatedQ: {
      title: "Search Insert Position (LC #35)",
      problem: "Find target or return where it would be inserted.",
      solution: `def searchInsert(nums, target):
    l, r = 0, len(nums) - 1
    while l <= r:
        m = (l + r) // 2
        if nums[m] == target: return m
        elif nums[m] < target: l = m + 1
        else: r = m - 1
    return l  # insert position`,
      why: "Identical binary search, but return 'l' instead of -1 when not found — 'l' is exactly where target would be inserted."
    }
  },
  {
    id: 29, num: 876, title: "Middle of the Linked List", topic: ["Linked List", "Two Pointers"], mostAsked: false,
    askCount: 5700,
    problem: `Find the middle node of a linked list.

Example 1:
Input: 1→2→3→4→5
Output: Node 3

Example 2:
Input: 1→2→3→4→5→6
Output: Node 4

Constraints:
- The number of nodes in the list is in the range [1, 100].
- 1 <= Node.val <= 100`,
    solution: `def middleNode(head):
    slow = fast = head
    
    while fast and fast.next:
        slow = slow.next        # moves 1 step
        fast = fast.next.next  # moves 2 steps
    
    return slow`,
    whyMethod: "Floyd's Two-Pointer technique (slow/fast)! Fast moves twice as fast as slow. When fast reaches the end, slow is exactly at the middle. No need to count the length!",
    howMethod: "Both start at head. Slow moves 1 step, fast moves 2 steps each iteration. When fast is at the last node (or None), slow is at the middle.",
    whyFunction: "'while fast and fast.next' handles both odd (fast reaches None) and even (fast.next reaches None) length lists. fast.next.next — fast skips 2 nodes.",
    howFunction: "5 nodes: slow,fast=1; slow=2,fast=3; slow=3,fast=5; fast.next=None→stop. Return slow=3 (middle) ✓. 6 nodes: slow=4 at the end → second middle ✓.",
    timeComplexity: "O(n)", spaceComplexity: "O(1)",
    relatedQ: {
      title: "Linked List Cycle (LC #141)",
      problem: "Detect if a linked list has a cycle.",
      solution: `def hasCycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast: return True
    return False`,
      why: "Same slow/fast pointer idea. In a cycle, fast will eventually lap slow and they'll meet at the same node."
    }
  },
  {
    id: 30, num: 977, title: "Squares of a Sorted Array", topic: ["Array", "Two Pointers", "Sorting"], mostAsked: false,
    askCount: 5400,
    problem: `Given sorted array of integers, return sorted array of squares of each number.

Example 1:
Input: [-4,-1,0,3,10]
Output: [0,1,9,16,100]

Example 2:
Input: [-7,-3,2,3,11]
Output: [4,9,9,49,121]

Constraints:
- 1 <= nums.length <= 10^4
- -10^4 <= nums[i] <= 10^4`,
    solution: `def sortedSquares(nums):
    n = len(nums)
    result = [0] * n
    left, right = 0, n - 1
    pos = n - 1  # fill result from the end
    
    while left <= right:
        left_sq = nums[left] ** 2
        right_sq = nums[right] ** 2
        
        if left_sq > right_sq:
            result[pos] = left_sq
            left += 1
        else:
            result[pos] = right_sq
            right -= 1
        pos -= 1
    
    return result`,
    whyMethod: "Two-pointer from both ends! The largest square is always at one of the two ends (either the most negative or most positive number). Fill the result array from the END (largest to smallest).",
    howMethod: "Compare squares of leftmost and rightmost numbers. Place the larger one at the rightmost available result position. Advance the corresponding pointer inward.",
    whyFunction: "** is Python's exponentiation operator (nums[left]**2 = square). result = [0]*n creates result array pre-filled with 0s. Fill from end (pos=n-1) because we're placing in descending order.",
    howFunction: "[-4,-1,0,3,10]: squares=[16,1,0,9,100]. left=16, right=100. Place 100 at pos=4, right-- → compare 16,9 → place 16 at pos=3, left++ → continue → [0,1,9,16,100] ✓.",
    timeComplexity: "O(n)", spaceComplexity: "O(n)",
    relatedQ: {
      title: "Sort Array By Parity (LC #905)",
      problem: "Move even numbers to front, odd to back.",
      solution: `def sortArrayByParity(nums):
    l, r = 0, len(nums) - 1
    while l < r:
        while l < r and nums[l] % 2 == 0: l += 1
        while l < r and nums[r] % 2 == 1: r -= 1
        nums[l], nums[r] = nums[r], nums[l]
        l += 1; r -= 1
    return nums`,
      why: "Two-pointer swap. Skip even on left, skip odd on right. When both are 'wrong side', swap them."
    }
  },
  {
    id: 31, num: 67, title: "Add Binary", topic: ["Math", "String"], mostAsked: false,
    askCount: 4100,
    problem: `Given two binary strings a and b, return their sum as a binary string.

Example 1:
Input: a = "11", b = "1"
Output: "100"

Example 2:
Input: a = "1010", b = "1011"
Output: "10101"

Constraints:
- 1 <= a.length, b.length <= 10^4
- a and b consist only of '0' or '1' characters.`,
    solution: `def addBinary(a, b):
    res = []
    carry = 0
    i, j = len(a) - 1, len(b) - 1
    
    while i >= 0 or j >= 0 or carry:
        total = carry
        if i >= 0:
            total += int(a[i])
            i -= 1
        if j >= 0:
            total += int(b[j])
            j -= 1
        res.append(str(total % 2))
        carry = total // 2
        
    return "".join(reversed(res))`,
    whyMethod: "Standard elementary addition from right to left. We use a carry to handle sums that exceed 1 (since it's binary).",
    howMethod: "Use two pointers starting at the ends of strings a and b. In each step, add the bits and the carry. Append the result bit (total % 2) and update carry (total // 2). Reverse the final list to get the string.",
    whyFunction: "int(a[i]) converts the character digit to an integer. join(reversed(res)) is efficient for building the string in reverse order.",
    howFunction: "total = 0+1+1=2 → res=['0'], carry=1. Next total=1+0+0=1 → res=['0','1'], carry=0. Final result '100'.",
    timeComplexity: "O(max(N, M))", spaceComplexity: "O(max(N, M))",
    relatedQ: {
      title: "Add Two Numbers (LC #2) — Medium",
      problem: "Add two numbers represented by linked lists.",
      solution: "Similar carry logic but with linked list nodes.",
      why: "Linked lists can be added node-by-node just like adding bits in a string."
    }
  },
  {
    id: 32, num: 69, title: "Sqrt(x)", topic: ["Math", "Binary Search"], mostAsked: false,
    askCount: 4800,
    problem: `Given a non-negative integer x, compute and return the square root of x rounded down to the nearest integer.

Example 1:
Input: x = 4
Output: 2

Example 2:
Input: x = 8
Output: 2

Constraints:
- 0 <= x <= 2^31 - 1`,
    solution: `def mySqrt(x):
    if x < 2: return x
    left, right = 2, x // 2
    
    while left <= right:
        pivot = left + (right - left) // 2
        num = pivot * pivot
        if num > x: right = pivot - 1
        elif num < x: left = pivot + 1
        else: return pivot
        
    return right`,
    whyMethod: "Binary Search is much faster than checking every number! Since the square root must be between 2 and x/2, we can quickly narrow it down.",
    howMethod: "Start with a range [2, x/2]. Check the square of the middle number. Adjust the range until the pointers cross. The final 'right' pointer will be the integer square root.",
    whyFunction: "pivot * pivot checks if we found the root or went too far. x // 2 is a safe upper bound for x >= 4.",
    howFunction: "For x=8: left=2, right=4. pivot=3, 3*3=9 > 8 → right=2. Loop ends, return 2.",
    timeComplexity: "O(log x)", spaceComplexity: "O(1)",
    relatedQ: {
      title: "Valid Perfect Square (LC #367)",
      problem: "Check if a number is a perfect square without using sqrt().",
      solution: "Same binary search logic, but return True if pivot*pivot == x.",
      why: "The search pattern is identical — finding an integer k such that k*k = x."
    }
  },
  {
    id: 33, num: 70, title: "Climbing Stairs", topic: ["Math", "Dynamic Programming"], mostAsked: true,
    askCount: 8900,
    problem: `You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

Example 1:
Input: n = 2
Output: 2

Example 2:
Input: n = 3
Output: 3

Constraints:
- 1 <= n <= 45`,
    solution: `def climbStairs(n):
    if n <= 2: return n
    first, second = 1, 2
    for i in range(3, n + 1):
        third = first + second
        first = second
        second = third
    return second`,
    whyMethod: "This is the Fibonacci sequence! To reach step n, you must have come from either step n-1 (by taking 1 step) or step n-2 (by taking 2 steps).",
    howMethod: "Store the number of ways to reach step 1 and step 2. For each higher step, the number of ways is the sum of the previous two steps. Slide these numbers forward until you reach n.",
    whyFunction: "The recurrence Relation: ways(n) = ways(n-1) + ways(n-2). This is dynamic programming with space optimization.",
    howFunction: "n=4: s1=1, s2=2. Step 3: ways=1+2=3. Step 4: ways=2+3=5. Return 5.",
    timeComplexity: "O(n)", spaceComplexity: "O(1)",
    relatedQ: {
      title: "Min Cost Climbing Stairs (LC #746)",
      problem: "You pay cost[i] to step on step i. Find minimum cost to reach top.",
      solution: "dp[i] = cost[i] + min(dp[i-1], dp[i-2])",
      why: "Exact same stair logic, but we track minimum cost instead of total ways."
    }
  },
  {
    id: 34, num: 94, title: "Binary Tree Inorder Traversal", topic: ["Stack", "Tree", "Depth-First Search"], mostAsked: false,
    askCount: 5200,
    problem: `Given the root of a binary tree, return the inorder traversal of its nodes' values.

Example 1:
Input: root = [1,null,2,3]
Output: [1,3,2]

Example 2:
Input: root = []
Output: []

Constraints:
- The number of nodes in the tree is in the range [0, 100].
- -100 <= Node.val <= 100`,
    solution: `def inorderTraversal(root):
    res = []
    def dfs(node):
        if not node: return
        dfs(node.left)
        res.append(node.val)
        dfs(node.right)
    dfs(root)
    return res`,
    whyMethod: "Recursion (DFS) is the most intuitive approach for tree traversals. Inorder visits the left subtree, then the current node, then the right subtree.",
    howMethod: "Define a helper function that visits node.left first. Then append node.val to the result list. Finally visit node.right.",
    whyFunction: "if not node: return is the base case to stop recursion at leaf nodes. Inorder ensures elements are visited in 'sorted' order for Binary Search Trees.",
    howFunction: "Start at root. Go as far left as possible. Visit, then go right one step, and repeat.",
    timeComplexity: "O(n)", spaceComplexity: "O(n)",
    relatedQ: {
      title: "Binary Tree Preorder Traversal (LC #144)",
      problem: "Root → Left → Right traversal.",
      solution: "Append node.val before DFS calls.",
      why: "Preorder visits the root first, useful for creating a copy of the tree."
    }
  },
  {
    id: 35, num: 101, title: "Symmetric Tree", topic: ["Tree", "DFS", "BFS"], mostAsked: false,
    askCount: 4900,
    problem: `Given the root of a binary tree, check whether it is a mirror of itself.

Example 1:
Input: root = [1,2,2,3,4,4,3]
Output: true

Example 2:
Input: root = [1,2,2,null,3,null,3]
Output: false

Constraints:
- The number of nodes in the tree is in the range [1, 1000].
- -100 <= Node.val <= 100`,
    solution: `def isSymmetric(root):
    def isMirror(t1, t2):
        if not t1 and not t2: return True
        if not t1 or not t2: return False
        return (t1.val == t2.val) and \
               isMirror(t1.right, t2.left) and \
               isMirror(t1.left, t2.right)
    return isMirror(root, root)`,
    whyMethod: "A tree is recursive; its symmetry depends on its subtrees being mirrors of each other. We compare two copies of the tree.",
    howMethod: "Compare the left child of one side with the right child of the other side. Both values must match, and their children must also be mirror images.",
    whyFunction: "isMirror(t1.right, t2.left) checks if the 'outer' branches match, and isMirror(t1.left, t2.right) checks the 'inner' branches.",
    howFunction: "Mirror check: rootA.val==rootB.val AND rootA.left==rootB.right AND rootA.right==rootB.left.",
    timeComplexity: "O(n)", spaceComplexity: "O(h)",
    relatedQ: {
      title: "Same Tree (LC #100)",
      problem: "Check if two trees are identical.",
      solution: "Same recursive comparison, but compare left-to-left and right-to-right.",
      why: "Symmetry is just 'Identity' with a mirror swap on child comparisons."
    }
  },
  {
    id: 36, num: 112, title: "Path Sum", topic: ["Tree", "DFS"], mostAsked: false,
    askCount: 4500,
    problem: `Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.

Example 1:
Input: root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
Output: true

Constraints:
- The number of nodes in the tree is in the range [0, 5000].
- -1000 <= Node.val <= 1000
- -1000 <= targetSum <= 1000`,
    solution: `def hasPathSum(root, targetSum):
    if not root: return False
    
    targetSum -= root.val
    if not root.left and not root.right:
        return targetSum == 0
        
    return hasPathSum(root.left, targetSum) or \
           hasPathSum(root.right, targetSum)`,
    whyMethod: "DFS recursion! Subtract the current node's value from the remaining target. If you reach a leaf and the target is now zero, success!",
    howMethod: "Subtract node value at each step. Check if the current node is a leaf (no children). If it is, compare targetSum to 0. Otherwise, recursively check left and right branches.",
    whyFunction: "or operator means if ANY path matches, the whole result is true. 'if not root.left and not root.right' defines a leaf node.",
    howFunction: "Root 5, skip 4, path to 7. Target 22→17→13. At 7, sum matches? No. Path continues to next leaf.",
    timeComplexity: "O(n)", spaceComplexity: "O(h)",
    relatedQ: {
      title: "Path Sum II (LC #113) — Medium",
      problem: "Return all root-to-leaf paths that sum to target.",
      solution: "Same DFS but pass a current_path list and store it when target hits 0 at a leaf.",
      why: "Extension of basic existence check to finding all actual paths."
    }
  },
  {
    id: 37, num: 118, title: "Pascal's Triangle", topic: ["Array", "Dynamic Programming"], mostAsked: false,
    askCount: 5500,
    problem: `Given an integer numRows, return the first numRows of Pascal's triangle.

Example 1:
Input: numRows = 5
Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]

Constraints:
- 1 <= numRows <= 30`,
    solution: `def generate(numRows):
    res = [[1]]
    for i in range(1, numRows):
        row = [1]
        for j in range(1, i):
            row.append(res[i-1][j-1] + res[i-1][j])
        row.append(1)
        res.append(row)
    return res`,
    whyMethod: "Simple construction logic: each number is the sum of the two numbers directly above it. DP approach builds one row at a time based on the previous row.",
    howMethod: "Start with [[1]]. For each new row, add a '1' at start, then calculate middle elements by adding res[last][j-1] + res[last][j], then add a '1' at the end.",
    whyFunction: "The inner loop range(1, i) cleverly skips the first and last '1's of each row. res[i-1] access the row we just finished.",
    howFunction: "Row 3: [1, (1+1), 1] → [1, 2, 1]. Row 4: [1, (1+2), (2+1), 1] → [1, 3, 3, 1].",
    timeComplexity: "O(n²)", spaceComplexity: "O(n²)",
    relatedQ: {
      title: "Pascal's Triangle II (LC #119)",
      problem: "Return only the k-th row.",
      solution: "Maintain only two rows at a time (current and previous) to save space.",
      why: "Same math, but saves memory if you only need one specific row."
    }
  },
  {
    id: 38, num: 125, title: "Valid Palindrome", topic: ["Two Pointers", "String"], mostAsked: true,
    askCount: 8200,
    problem: `A phrase is a palindrome if, after converting all uppercase letters into lowercase and removing all non-alphanumeric characters, it reads the same forward and backward.

Example 1:
Input: "A man, a plan, a canal: Panama"
Output: true

Example 2:
Input: "race a car"
Output: false

Constraints:
- 1 <= s.length <= 2 * 10^5
- s consists only of printable ASCII characters.`,
    solution: `def isPalindrome(s):
    l, r = 0, len(s) - 1
    while l < r:
        if not s[l].isalnum(): l += 1
        elif not s[r].isalnum(): r -= 1
        else:
            if s[l].lower() != s[r].lower():
                return False
            l += 1
            r -= 1
    return True`,
    whyMethod: "Two Pointers! We compare characters from both ends moving inward. This is space-efficient because we don't create a 'cleaned' copy of the string.",
    howMethod: "Use two pointers l and r. Skip non-alphanumeric characters. Compare lowercased characters. If they mismatch, it's not a palindrome. Stop when pointers meet.",
    whyFunction: "isalnum() checks if a character is a letter or number. lower() makes the check case-insensitive. This saves the extra O(n) space of a filtered string.",
    howFunction: " 'A man...' -> compare 'a' and 'a', skip ' ', compare 'm' and 'm'... pointers meet in the middle.",
    timeComplexity: "O(n)", spaceComplexity: "O(1)",
    relatedQ: {
      title: "Valid Palindrome II (LC #680)",
      problem: "Check palindrome with at most one character deletion.",
      solution: "Two pointers, if mismatch, check if deleting one matches.",
      why: "Same pointer logic with one 'branching' step upon first mismatch."
    }
  },
  {
    id: 39, num: 141, title: "Linked List Cycle", topic: ["Hash Table", "Linked List", "Two Pointers"], mostAsked: true,
    askCount: 8800,
    problem: `Given head, the head of a linked list, determine if the linked list has a cycle in it.

Example 1:
Input: head = [3,2,0,-4], pos = 1
Output: true

Example 2:
Input: head = [1,2], pos = 0
Output: true

Constraints:
- The number of nodes in the list is in the range [0, 10^4].
- -10^5 <= Node.val <= 10^5`,
    solution: `def hasCycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False`,
    whyMethod: "Floyd's Cycle-Finding Algorithm (Tortoise and Hare). If there is a cycle, the faster pointer will eventually lap the slower pointer and they will meet.",
    howMethod: "Initialize two pointers at head. Move 'slow' one step and 'fast' two steps. If they ever point to the same node, return True. If 'fast' reaches the end (null), there's no cycle.",
    whyFunction: "fast and fast.next check prevents errors when list has 0 or 1 nodes. Running at different speeds is the mathematical key to meeting in a loop.",
    howFunction: "Like two runners on a circular track: the fast runner will eventually 'overlap' the slow runner from behind.",
    timeComplexity: "O(n)", spaceComplexity: "O(1)",
    relatedQ: {
      title: "Linked List Cycle II (LC #142) — Medium",
      problem: "Return the node where the cycle begins.",
      solution: "After slow catches fast, move slow to head and move both at speed 1. They meet at entry.",
      why: "Mathematical property of path distances in cycles."
    }
  },
  {
    id: 40, num: 202, title: "Happy Number", topic: ["Hash Table", "Math", "Two Pointers"], mostAsked: false,
    askCount: 4700,
    problem: `Write an algorithm to determine if a number n is happy.

Example 1:
Input: n = 19
Output: true

Example 2:
Input: n = 2
Output: false

Constraints:
- 1 <= n <= 2^31 - 1`,
    solution: `def isHappy(n):
    seen = set()
    while n != 1 and n not in seen:
        seen.add(n)
        n = sum(int(digit)**2 for digit in str(n))
    return n == 1`,
    whyMethod: "Hash Set to detect cycles! Since unhappy numbers cycle, we just need to keep track of every sum we've seen. If we see a sum again and it's not 1, we are in a loop.",
    howMethod: "Convert the number to string to iterate through digits, square them, sum them. Store each new sum in a set. If sum becomes 1, return true. If sum is already in the set, we are looping -> return false.",
    whyFunction: "sum(int(digit)**2 for digit in str(n)) is a high-level Python generator expression. set() provides O(1) lookup to catch the cycle.",
    howFunction: "19 -> 82 -> 68 -> 100 -> 1. Success! For unhappy like 2, it eventually hits 4, 16, 37... and loops back to 4.",
    timeComplexity: "O(log n)", spaceComplexity: "O(log n)",
    relatedQ: {
      title: "Happy Number (Cycle Detection)",
      problem: "Can you solve it without using a Set?",
      solution: "Use slow/fast pointer logic just like Linked List Cycle!",
      why: "Cycle detection is the same problem whether it's nodes or numbers."
    }
  },
  {
    id: 41, num: 203, title: "Remove Linked List Elements", topic: ["Linked List", "Recursion"], mostAsked: false,
    askCount: 4200,
    problem: `Given the head of a linked list and an integer val, remove all nodes with value 'val'.

Example 1:
Input: head = [1,2,6,3,4,5,6], val = 6
Output: [1,2,3,4,5]

Example 2:
Input: head = [], val = 1
Output: []

Constraints:
- The number of nodes in the list is in the range [0, 10^4].
- 1 <= Node.val <= 50
- 0 <= val <= 50`,
    solution: `def removeElements(head, val):
    dummy = ListNode(0, head)
    curr = dummy
    while curr.next:
        if curr.next.val == val:
            curr.next = curr.next.next
        else:
            curr = curr.next
    return dummy.next`,
    whyMethod: "DUMMY NODE is the secret weapon! It handles the case where the head itself needs to be deleted, removing the need for special 'if head is val' checks.",
    howMethod: "Create a dummy node pointing to the head. Use 'curr' to inspect the NEXT node. If curr.next.val equals target, skip it by pointing to curr.next.next. Otherwise, just move forward.",
    whyFunction: "curr.next = curr.next.next removes the target node from the logical chain. Return dummy.next because the original head might have been deleted.",
    howFunction: "At [1]->[6]->[3]: curr is at [1], sees [6] is target. curr.next becomes [3]. [6] is now detached.",
    timeComplexity: "O(n)", spaceComplexity: "O(1)",
    relatedQ: {
      title: "Delete Node in a Linked List (LC #237)",
      problem: "Delete a node given ONLY a pointer to that node.",
      solution: "node.val = node.next.val; node.next = node.next.next",
      why: "If you can't find the previous node, you have to 'copy' the next node over current."
    }
  },
  {
    id: 42, num: 205, title: "Isomorphic Strings", topic: ["Hash Table", "String"], mostAsked: false,
    askCount: 3900,
    problem: `Two strings s and t are isomorphic if characters in s can be replaced to get t.

Example 1:
Input: s = "egg", t = "add"
Output: true

Example 2:
Input: s = "foo", t = "bar"
Output: false

Constraints:
- 1 <= s.length <= 5 * 10^4
- t.length == s.length
- s and t consist of any valid ASCII character.`,
    solution: `def isIsomorphic(s, t):
    mapST, mapTS = {}, {}
    for c1, c2 in zip(s, t):
        if (c1 in mapST and mapST[c1] != c2) or \
           (c2 in mapTS and mapTS[c2] != c1):
            return False
        mapST[c1] = c2
        mapTS[c2] = c1
    return True`,
    whyMethod: "Bi-directional mapping! We need two dictionaries to ensure a 'one-to-one' relationship. Character 'a' cannot map to 'x' if 'b' already maps to 'x'.",
    howMethod: "Loop through both strings simultaneously using zip(). For each pair (c1, c2), check if c1 is already mapped to something else, OR if c2 was already mapped to a different c1. If both are clear, record the mapping.",
    whyFunction: "zip(s, t) iterates through both strings in pairs. Two maps ensure the 'one-to-one' constraint across both strings.",
    howFunction: "s='egg', t='add': e->a, g->d. Next g sees g->d matches, OK. s='foo', t='bar': f->b, o->a, next o sees o->a but current is 'r', ERROR.",
    timeComplexity: "O(n)", spaceComplexity: "O(k) where k is charset size",
    relatedQ: {
      title: "Word Pattern (LC #290)",
      problem: "Check if pattern 'abba' matches 'dog cat cat dog'.",
      solution: "Same bi-directional mapping logic but split string into words first.",
      why: "Words and characters behave exactly same for grouping consistency."
    }
  },
  {
    id: 43, num: 226, title: "Invert Binary Tree", topic: ["Tree", "DFS", "BFS"], mostAsked: true,
    askCount: 12000,
    problem: `Given the root of a binary tree, invert the tree (mirror it) and return its root.

Example 1:
Input: root = [4,2,7,1,3,6,9]
Output: [4,7,2,9,6,3,1]

Constraints:
- The number of nodes in the tree is in the range [0, 100].
- -100 <= Node.val <= 100`,
    solution: `def invertTree(root):
    if not root: return None
    
    root.left, root.right = invertTree(root.right), \
                            invertTree(root.left)
    return root`,
    whyMethod: "Recursion! To invert a whole tree, you just swap the left and right child nodes and then repeat the process for each subtree. Famous 'Max Howell' problem!",
    howMethod: "Base case: if node is empty, return None. Swap the left child and right child. Recursively call invertTree on both children to flip the entire structure.",
    whyFunction: "root.left, root.right = ... is a simultaneous assignment in Python, avoiding a temporary variable. DFS approach flips from leaves to root.",
    howFunction: "The function goes all the way to the bottom, then swaps leaf children, then swaps middle children... working its way up to the root.",
    timeComplexity: "O(n)", spaceComplexity: "O(h)",
    relatedQ: {
      title: "Flip Equivalent Binary Trees (LC #951) — Medium",
      problem: "Check if two trees are equivalent by flipping some nodes.",
      solution: "Check if nodes match, then check if (L1==L2 and R1==R2) OR (L1==R2 and R1==L2).",
      why: "Extension of symmetry/inversion check — dynamic mirror check."
    }
  },
  {
    id: 44, num: 234, title: "Palindrome Linked List", topic: ["Linked List", "Two Pointers", "Recursion"], mostAsked: true,
    askCount: 6500,
    problem: `Given the head of a singly linked list, return true if it is a palindrome.

Example 1:
Input: head = [1,2,2,1]
Output: true

Example 2:
Input: head = [1,2]
Output: false

Constraints:
- The number of nodes in the list is in the range [1, 10^5].
- 0 <= Node.val <= 9`,
    solution: `def isPalindrome(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    
    prev = None
    while slow:
        nxt = slow.next
        slow.next = prev
        prev = slow
        slow = nxt
        
    left, right = head, prev
    while right:
        if left.val != right.val: return False
        left = left.val; right = right.val
    return True`,
    whyMethod: "Triple Power: Slow/Fast Pointers + Reversal! Find the middle, reverse the second half, then compare the two halves. Achieves O(1) space!",
    howMethod: "Use slow/fast to find midpoint. Reverse the linked list starting from 'slow'. Now compare the original first half with the newly reversed second half. If all match, it's a palindrome.",
    whyFunction: "slow pointer naturally ends up at the half-way point. The reversal logic is the standard 3-pointer linked list reverse. Comparisons stop when 'right' (shorter half) hits None.",
    howFunction: "1-2-2-1: Mid is second 2. Reverse [2,1] to [1,2]. Compare [1,2] from head and [1,2] from tail. Perfect Match.",
    timeComplexity: "O(n)", spaceComplexity: "O(1)",
    relatedQ: {
      title: "Palindrome Number (LC #9)",
      problem: "Check if a number 121 is a palindrome.",
      solution: "x == int(str(x)[::-1])",
      why: "Lists and strings represent sequential data palidromes similarly, but lists require pointer logic for performance."
    }
  },
  {
    id: 45, num: 258, title: "Add Digits", topic: ["Math", "Simulation", "Number Theory"], mostAsked: false,
    askCount: 3200,
    problem: `Given an integer n, repeatedly add all its digits until the result has only one digit, and return it.

Example 1:
Input: n = 38
Output: 2

Example 2:
Input: n = 0
Output: 0

Constraints:
- 0 <= n <= 2^31 - 1`,
    solution: `def addDigits(n):
    if n == 0: return 0
    return 1 + (n - 1) % 9`,
    whyMethod: "This is a secret math pattern called 'Digital Root'. Summing digits repeatedly always results in n % 9 (with 9 representing a 0 remainder).",
    howMethod: "You can do it with a loop (n = sum of digits...), but the math trick is faster! 1 + (n-1)%9 calculates the digital root directly in constant time.",
    whyFunction: "The modulo 9 property states that a number and its sum of digits are congruent modulo 9. This avoids the simulation overhead.",
    howFunction: "38: (38-1)%9 = 37%9 = 1. 1+1 = 2. 18: (18-1)%9 = 17%9 = 8. 1+8 = 9.",
    timeComplexity: "O(1)", spaceComplexity: "O(1)",
    relatedQ: {
      title: "Sum of Digits in Base K (LC #1837)",
      problem: "Same problem but in base K instead of decimal.",
      solution: "While n: sum += n % k; n //= k",
      why: "Basic simulation of digit extraction via modulo and division."
    }
  },
  {
    id: 46, num: 383, title: "Ransom Note", topic: ["Hash Table", "String", "Counting"], mostAsked: true,
    askCount: 6800,
    problem: `Given ransomNote and magazine strings, return true if ransomNote can be constructed from magazine.

Example 1:
Input: ransomNote = "a", magazine = "b"
Output: false

Example 2:
Input: ransomNote = "aa", magazine = "aab"
Output: true

Constraints:
- 1 <= ransomNote.length, magazine.length <= 10^5
- ransomNote and magazine consist of lowercase English letters.`,
    solution: `def canConstruct(ransomNote, magazine):
    from collections import Counter
    mag_count = Counter(magazine)
    rs_count = Counter(ransomNote)
    
    for char, count in rs_count.items():
        if mag_count[char] < count:
            return False
    return True`,
    whyMethod: "Counting frequencies! We just need to ensure the magazine has at least as many counts of each character as the ransom note requires.",
    howMethod: "Use a Counter (hash map) to tally all letters in the magazine. Then check the ransom note; for every letter used, subtract it from the magazine tally. If a tally drops below zero, it's impossible.",
    whyFunction: "Counter subtracts whole dictionaries! rs_count & mag_count checks if the intersection contains everything needed.",
    howFunction: "Note 'aa', Mag 'aab': 'a' needs 2, magazine has 2. OK. 'b' not needed. Return True.",
    timeComplexity: "O(N+M)", spaceComplexity: "O(1) (charset is limited to 26 letters)",
    relatedQ: {
      title: "Valid Anagram (LC #242)",
      problem: "Check if two strings use exactly the same letters.",
      solution: "Counter(s) == Counter(t)",
      why: "An anagram is just a ransom note where lengths also match exactly."
    }
  },
  {
    id: 47, num: 387, title: "First Unique Character in a String", topic: ["Hash Table", "String"], mostAsked: true,
    askCount: 6100,
    problem: `Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.

Example 1:
Input: s = "leetcode"
Output: 0

Example 2:
Input: s = "loveleetcode"
Output: 2

Example 3:
Input: s = "aabb"
Output: -1

Constraints:
- 1 <= s.length <= 10^5
- s consists of only lowercase English letters.`,
    solution: `def firstUniqChar(s):
    count = collections.Counter(s)
    for i, char in enumerate(s):
        if count[char] == 1:
            return i
    return -1`,
    whyMethod: "Two-pass frequency counting. First pass: count how many times each character appears. Second pass: scan the string again to find the first character with a count of 1.",
    howMethod: "Use Counter to build a hash map of char counts. Iterate through the string one more time from left to right. The first character you find that has count[char] == 1 is the answer.",
    whyFunction: "Counter(s) builds the frequency map in O(n). enumerate(s) provides the index we need for the return value.",
    howFunction: "'loveleetcode': 'l' count is 2 (seen later), 'o' count is 2, 'v' count is 1. 'v' is the first one found in second pass. Index 2.",
    timeComplexity: "O(n)", spaceComplexity: "O(1) (max 26 letters)",
    relatedQ: {
      title: "First Unique Number (LC Design)",
      problem: "Find first unique in a data stream.",
      solution: "Use a Queue + Hash Map to track unique candidates.",
      why: "Adding 'streaming' requirement means we can't do two passes, need more complex state."
    }
  },
  {
    id: 48, num: 392, title: "Is Subsequence", topic: ["Two Pointers", "String", "Dynamic Programming"], mostAsked: true,
    askCount: 7200,
    problem: `Given two strings s and t, return true if s is a subsequence of t, or false otherwise.

A subsequence of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., "ace" is a subsequence of "abcde" while "aec" is not).

Example 1:
Input: s = "abc", t = "ahbgdc"
Output: true

Example 2:
Input: s = "axc", t = "ahbgdc"
Output: false

Constraints:
- 0 <= s.length <= 100
- 0 <= t.length <= 10^4
- s and t consist only of lowercase English letters.`,
    solution: `def isSubsequence(s, t):
    if not s: return True
    i = 0
    for char in t:
        if i < len(s) and char == s[i]:
            i += 1
    return i == len(s)`,
    whyMethod: "Single pass Greedy / Two Pointers! We walk through string t; every time we see the next character we need from s, we move s's pointer forward.",
    howMethod: "Pointer 'i' tracks our position in s. Iterate through every character in t. If the current character in t matches s[i], increment i. At the end, if i equals the length of s, we found all characters in order.",
    whyFunction: "if not s: return True handles the edge case where an empty string is always a subsequence of anything. The loop stops when s is fully found.",
    howFunction: "s='abc', t='ahbgdc': Find 'a' at 0, i=1. Find 'b' at 2, i=2. Find 'c' at 5, i=3. Length s=3, match!",
    timeComplexity: "O(n) where n is length of t", spaceComplexity: "O(1)",
    relatedQ: {
      title: "Longest Common Subsequence (LC #1143) — Medium",
      problem: "Find the length of the longest part shared by two strings.",
      solution: "Need a 2D Dynamic Programming matrix (dp[i][j]).",
      why: "If characters can be anywhere, we must compare all combinations, not just skip through."
    }
  },
  {
    id: 49, num: 463, title: "Island Perimeter", topic: ["Array", "Hash Table", "Math", "DFS"], mostAsked: false,
    askCount: 3100,
    problem: `You are given row x col grid representing a map where grid[i][j] = 1 represents land and grid[i][j] = 0 represents water.

Grid cells are connected horizontally/vertically (not diagonally). The grid is completely surrounded by water, and there is exactly one island (i.e., one or more connected land cells).

The island doesn't have "lakes", meaning the water inside isn't connected to the water around the island. One cell is a square with side length 1. The grid is rectangular, width and height don't exceed 100. Determine the perimeter of the island.

Example 1:
Input: grid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]
Output: 16

Example 2:
Input: grid = [[1]]
Output: 4

Example 3:
Input: grid = [[1,0]]
Output: 4

Constraints:
- row == grid.length
- col == grid[i].length
- 1 <= row, col <= 100
- grid[i][j] is 0 or 1.
- There is exactly one island in grid.`,
    solution: `def islandPerimeter(grid):
    rows, cols = len(grid), len(grid[0])
    perimeter = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 1:
                perimeter += 4
                if r > 0 and grid[r-1][c] == 1: perimeter -= 2
                if c > 0 and grid[r][c-1] == 1: perimeter -= 2
    return perimeter`,
    whyMethod: "Counting and Deducting! Every land square has 4 sides. When two squares are neighbors, they 'share' a wall, so two sides disappear from the total perimeter.",
    howMethod: "Iterate through the grid. For every '1' you find, add 4 to perimeter. Then check if there's a land square to its LEFT or ABOVE. If there is, subtract 2 (one for current, one for neighbor).",
    whyFunction: "Subtract 2 handles the shared edge from both sides. We only check LEFT and ABOVE to avoid double-counting subtraction as we move through.",
    howFunction: "Two side-by-side squares: (4 + 4) - 2 = 6 walls visible. Correct!",
    timeComplexity: "O(R*C)", spaceComplexity: "O(1)",
    relatedQ: {
      title: "Number of Islands (LC #200) — Medium",
      problem: "Count distinct islands in a grid.",
      solution: "Need DFS/BFS to 'flood fill' each island and count them.",
      why: "Requires groups/connectivity instead of just a simple math tally."
    }
  },
  {
    id: 50, num: 543, title: "Diameter of Binary Tree", topic: ["Tree", "DFS"], mostAsked: true,
    askCount: 7800,
    problem: `Given the root of a binary tree, return the length of the diameter of the tree.

The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.

The length of a path between two nodes is represented by the number of edges between them.

Example 1:
Input: root = [1,2,3,4,5]
Output: 3
Explanation: 3 is the length of the path [4,2,5,1,3] or [5,2,4,1,3].

Example 2:
Input: root = [1,2]
Output: 1

Constraints:
- The number of nodes in the tree is in the range [1, 10^4].
- -100 <= Node.val <= 100`,
    solution: `def diameterOfBinaryTree(root):
    self.res = 0
    def dfs(node):
        if not node: return 0
        l, r = dfs(node.left), dfs(node.right)
        self.res = max(self.res, l + r)
        return 1 + max(l, r)
    dfs(root)
    return self.res`,
    whyMethod: "Recursive Depth! The diameter passing through a node is simply its (Left Height + Right Height). We track the maximum such sum throughout the entire tree traversal.",
    howMethod: "Use DFS to calculate height of each subtree. As you compute height, update a global 'max_diameter' with sum of current children's heights. Return height to parent nodes to continue calculation.",
    whyFunction: "l + r is the path distance crossing the node. 1 + max(l,r) is how we pass our own height back up to the parent.",
    howFunction: "A node with left height 2 and right height 1 has a local diameter of 3. It tells its parent 'my path length is 3'.",
    timeComplexity: "O(n)", spaceComplexity: "O(h)",
    relatedQ: {
      title: "Binary Tree Maximum Path Sum (LC #124) — Hard",
      problem: "Find max sum path between any two nodes.",
      solution: "Same structure as diameter, but track 'node.val + L + R' and only add L/R if they are positive.",
      why: "Diameter tracks distance (1 count), Path Sum tracks weights (node labels)."
    }
  },
  {
    id: 51, num: 605, title: "Can Place Flowers", topic: ["Array", "Greedy"], mostAsked: true,
    askCount: 4500,
    problem: `You have a long flowerbed in which some of the plots are planted, and some are not. However, flowers cannot be planted in adjacent plots.

Given an integer array flowerbed containing 0's and 1's, where 0 means empty and 1 means not empty, and an integer n, return true if n new flowers can be planted in the flowerbed without violating the no-adjacent-flowers rule and false otherwise.

Example 1:
Input: flowerbed = [1,0,0,0,1], n = 1
Output: true

Example 2:
Input: flowerbed = [1,0,0,0,1], n = 2
Output: false

Constraints:
- 1 <= flowerbed.length <= 2 * 10^4
- flowerbed[i] is 0 or 1.
- There are no two adjacent flowers in flowerbed.
- 0 <= n <= flowerbed.length`,
    solution: `def canPlaceFlowers(flowerbed, n):
    count = 0
    bed = [0] + flowerbed + [0]
    for i in range(1, len(bed) - 1):
        if bed[i-1] == 0 and bed[i] == 0 and bed[i+1] == 0:
            bed[i] = 1
            count += 1
    return count >= n`,
    whyMethod: "Greedy Check! We look for three consecutive zeros. Whenever we find them, we plant a flower in the middle one and move on. Adding dummy '0's at ends simplifies boundary checks.",
    howMethod: "Pad the flowerbed with a 0 on both sides. Iterate through. If the current spot and both neighbors are 0, plant a 1 and increment your counter. Finally, check if your counter hit n.",
    whyFunction: "[0] + flowerbed + [0] is a clever trick to avoid 'if i > 0' and 'if i < len-1' checks inside the loop.",
    howFunction: "[1,0,0,0,1] becomes [0,1,0,0,0,1,0]. At index 3, we see 0,0,0 -> plant! Count=1. Done.",
    timeComplexity: "O(n)", spaceComplexity: "O(n) (or O(1) if modified in-place)",
    relatedQ: {
      title: "Teemo Attacking (LC #495)",
      problem: "Calculate total duration of poison effect from attacks.",
      solution: "Compare gap between attacks with duration.",
      why: "Both involve checking gaps between events in a sequence."
    }
  },
  {
    id: 52, num: 617, title: "Merge Two Binary Trees", topic: ["Tree", "DFS"], mostAsked: true,
    askCount: 5800,
    problem: `You are given two binary trees root1 and root2.

Imagine that when you put one of them to cover the other, some nodes of the two trees are overlapped while the others are not. You need to merge the two trees into a new binary tree. The merge rule is that if two nodes overlap, then sum node values up as the new value of the merged node. Otherwise, the NOT null node will be used as the node of the new tree.

Return the merged tree.

Example 1:
Input: root1 = [1,3,2,5], root2 = [2,1,3,null,4,null,7]
Output: [3,4,5,5,4,null,7]

Example 2:
Input: root1 = [1], root2 = [1,2]
Output: [2,2]

Constraints:
- The number of nodes in both trees is in the range [0, 2000].
- -10^4 <= Node.val <= 10^4`,
    solution: `def mergeTrees(t1, t2):
    if not t1: return t2
    if not t2: return t1
    
    root = TreeNode(t1.val + t2.val)
    root.left = mergeTrees(t1.left, t2.left)
    root.right = mergeTrees(t1.right, t2.right)
    return root`,
    whyMethod: "Recursive Merging! If both nodes exist, sum them. If one is missing, the entire 'other' subtree becomes the result for that branch.",
    howMethod: "Base cases handle None nodes by returning the other tree. Recursive step: create a new node with the sum of values, then recursively merge left and right subtrees.",
    whyFunction: "if not t1: return t2 is efficient because it avoids traversing the rest of t2 — we just link the whole subtree.",
    howFunction: "Merge(1, 2) -> 3. Merge(3, 1) -> 4. Merge(null, 3) -> 3. The trees zip together like a zipper.",
    timeComplexity: "O(min(m, n))", spaceComplexity: "O(h) where h is height",
    relatedQ: {
      title: "Add Two Numbers (LC #2)",
      problem: "Merge two numbers represented as linked lists.",
      solution: "Iterate and sum with carry.",
      why: "Both problems involve summing structures based on position/mapping."
    }
  },
  {
    id: 53, num: 700, title: "Search in a Binary Search Tree", topic: ["Tree", "Binary Search Tree"], mostAsked: false,
    askCount: 4100,
    problem: `You are given the root of a binary search tree (BST) and an integer val.

Find the node in the BST that the node's value equals val and return the subtree rooted with that node. If such a node does not exist, return null.

Example 1:
Input: root = [4,2,7,1,3], val = 2
Output: [2,1,3]

Example 2:
Input: root = [4,2,7,1,3], val = 5
Output: []

Constraints:
- The number of nodes in the tree is in the range [1, 5000].
- 1 <= Node.val <= 10^7
- root is a binary search tree.
- 1 <= val <= 10^7`,
    solution: `def searchBST(root, val):
    if not root or root.val == val:
        return root
    
    if val < root.val:
        return searchBST(root.left, val)
    return searchBST(root.right, val)`,
    whyMethod: "The Binary Search Tree Property! Keys to the left are smaller, keys to the right are larger. This allows us to eliminate half the tree at every step.",
    howMethod: "Compare val to current node. If it matches, you found it! If val is smaller, search ONLY the left subtree. If larger, search ONLY the right.",
    whyFunction: "The return statement passes the found node (or None) all the way back up the recursion stack to the caller.",
    howFunction: "Looking for 2 in [4,2,7]: 2 < 4 -> go left. 2 == 2 -> return node(2).",
    timeComplexity: "O(log n) average", spaceComplexity: "O(h)",
    relatedQ: {
      title: "Binary Search (LC #704)",
      problem: "Search in a sorted array.",
      solution: "Binary search with left/right pointers.",
      why: "BST is effectively the 'tree' representation of a sorted array used for binary search."
    }
  },
  {
    id: 54, num: 703, title: "Kth Largest Element in a Stream", topic: ["Tree", "Heap", "Design"], mostAsked: true,
    askCount: 5200,
    problem: `Design a class to find the kth largest element in a stream. Note that it is the kth largest element in the sorted order, not the kth distinct element.

Implement KthLargest class:
- KthLargest(int k, int[] nums) Initializes the object with the integer k and the stream of integers nums.
- int add(int val) Appends the integer val to the stream and returns the element representing the kth largest element in the stream.

Example 1:
Input:
["KthLargest", "add", "add", "add", "add", "add"]
[[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]
Output:
[null, 4, 5, 5, 8, 8]

Constraints:
- 1 <= k <= 10^4
- 0 <= nums.length <= 10^4
- -10^4 <= nums[i] <= 10^4
- -10^4 <= val <= 10^4
- At most 10^4 calls will be made to add.`,
    solution: `class KthLargest:
    def __init__(self, k, nums):
        self.k = k
        self.heap = nums
        heapq.heapify(self.heap)
        while len(self.heap) > k:
            heapq.heappop(self.heap)

    def add(self, val):
        heapq.heappush(self.heap, val)
        if len(self.heap) > self.k:
            heapq.heappop(self.heap)
        return self.heap[0]`,
    whyMethod: "Min-Heap of size K! A min-heap's root is the smallest value. If we keep only the K largest values in a min-heap, the root will be the K-th largest overall.",
    howMethod: "Build a min-heap from initial numbers. Keep popping until only K elements remain. For every new 'add', push it to heap and pop the smallest if heap size exceeds K. return heap[0].",
    whyFunction: "heapq is Python's built-in min-heap. heap[0] always accesses the minimum element in O(1).",
    howFunction: "K=3: heap=[4,5,8]. Add 3 -> [3,4,5,8] -> pop 3 -> [4,5,8]. Result = heap[0] = 4.",
    timeComplexity: "O(log k) per add", spaceComplexity: "O(k)",
    relatedQ: {
      title: "Find Median from Data Stream (LC #295) — Hard",
      problem: "Find the median of a stream of numbers.",
      solution: "Use TWO heaps (one max-heap for left, one min-heap for right).",
      why: "Extension of 'k-th' logic to the 'middle' of a sorted stream."
    }
  },
  {
    id: 55, num: 705, title: "Design HashSet", topic: ["Array", "Hash Table", "Design"], mostAsked: false,
    askCount: 3800,
    problem: `Design a HashSet without using any built-in hash table libraries.\nImplement add(key), remove(key), and contains(key).`,
    solution: `class MyHashSet:
    def __init__(self):
        self.size = 1000
        self.table = [[] for _ in range(self.size)]

    def _hash(self, key):
        return key % self.size

    def add(self, key):
        if not self.contains(key):
            self.table[self._hash(key)].append(key)

    def remove(self, key):
        h = self._hash(key)
        if key in self.table[h]:
            self.table[h].remove(key)

    def contains(self, key):
        return key in self.table[self._hash(key)]`,
    whyMethod: "Chaining with Modulo! We use an array of 'buckets' (lists). We map each key to a bucket using 'key % size'. If multiple keys land in the same bucket, we store them in a list.",
    howMethod: "Create a list of 1000 empty sub-lists. Hash(key) returns index. add: check if exists in bucket, if not, append. remove: find in bucket and delete. contains: search the specific bucket.",
    whyFunction: "self.size = 1000 is a balance between memory and speed (collision frequency). key % size is a simple hash function for integers.",
    howFunction: "Key 1234 -> Hash is 234. Store 1234 in self.table[234].",
    timeComplexity: "O(1) average", spaceComplexity: "O(N)",
    relatedQ: {
      title: "Design HashMap (LC #706)",
      problem: "Implement map key->value without built-ins.",
      solution: "Same chaining logic, but store pairs [key, value] in buckets.",
      why: "A map is just a set with associated payloads."
    }
  },
  {
    id: 56, num: 706, title: "Design HashMap", topic: ["Array", "Hash Table", "Design"], mostAsked: true,
    askCount: 4200,
    problem: `Design a HashMap without built-in hash table libraries. Implement put(key, value), get(key), and remove(key).`,
    solution: `class MyHashMap:
    def __init__(self):
        self.size = 1000
        self.table = [[] for _ in range(self.size)]

    def _hash(self, key):
        return key % self.size

    def put(self, key, value):
        h = self._hash(key)
        for i, (k, v) in enumerate(self.table[h]):
            if k == key:
                self.table[h][i] = (key, value)
                return
        self.table[h].append((key, value))

    def get(self, key):
        h = self._hash(key)
        for k, v in self.table[h]:
            if k == key: return v
        return -1`,
    whyMethod: "Bucket Chaining! Just like HashSet, but each bucket entry is a (key, value) pair. Handling collisions by walking through a small list at each hash index.",
    howMethod: "Hash the key to find the bucket index. For 'put', search the bucket: if key exists, update value; if not, add new pair. For 'get', search bucket and return value or -1.",
    whyFunction: "enumerate() helps find the index for updating values. (key, value) tuples are standard for mapping storage in buckets.",
    howFunction: "put(1, 100) -> hash(1)=1 -> table[1] has [(1,100)]. get(1) -> check table[1] -> found 1, return 100.",
    timeComplexity: "O(1) average", spaceComplexity: "O(N)",
    relatedQ: {
      title: "LRU Cache (LC #146) — Medium",
      problem: "Design a cache that evicts Least Recently Used items.",
      solution: "HashMap + Doubly Linked List.",
      why: "HashMap for O(1) access, Linked List for O(1) order tracking."
    }
  },
  {
    id: 57, num: 724, title: "Find Pivot Index", topic: ["Array", "Prefix Sum"], mostAsked: true,
    askCount: 4900,
    problem: `Given an array of integers nums, calculate the pivot index of this array.

The pivot index is the index where the sum of all the numbers strictly to the left of the index is equal to the sum of all the numbers strictly to the index's right.

Example 1:
Input: nums = [1,7,3,6,5,6]
Output: 3
Explanation: The pivot index is 3. Left sum = nums[0] + nums[1] + nums[2] = 1 + 7 + 3 = 11. Right sum = nums[4] + nums[5] = 5 + 6 = 11.

Example 2:
Input: nums = [1,2,3]
Output: -1

Constraints:
- 1 <= nums.length <= 10^4
- -1000 <= nums[i] <= 1000`,
    solution: `def pivotIndex(nums):
    total = sum(nums)
    left_sum = 0
    for i, x in enumerate(nums):
        if left_sum == (total - left_sum - x):
            return i
        left_sum += x
    return -1`,
    whyMethod: "Prefix Sum Logic! Instead of calculating sums over and over, we realize that right_sum = total_sum - left_sum - current_num. Only one loop needed!",
    howMethod: "Calculate the total sum first. Iterate through the array, keeping track of the sum of elements seen so far (leftSum). At each index, check if leftSum equals the calculated rightSum. If so, return index.",
    whyFunction: "(total - left_sum - x) represents everything to the right of x. This mathematical reduction turns an O(n²) problem into O(n).",
    howFunction: "[1,7,3,6...], total=28. At index 3 (val 6): left=11. Right = 28 - 11 - 6 = 11. Match!",
    timeComplexity: "O(n)", spaceComplexity: "O(1)",
    relatedQ: {
      title: "Subarray Sum Equals K (LC #560) — Medium",
      problem: "Count subarrays that sum to K.",
      solution: "HashMap to store prefix sums seen so far.",
      why: "Both rely on the formula: sum(i,j) = prefixSum[j] - prefixSum[i-1]."
    }
  },
  {
    id: 58, num: 733, title: "Flood Fill", topic: ["Array", "DFS", "BFS"], mostAsked: true,
    askCount: 4800,
    problem: `An image is represented by an m x n integer grid image where image[i][j] represents the pixel value of the image.

You are also given three integers sr, sc, and color. You should perform a flood fill on the image starting from the pixel image[sr][sc].

To perform a flood fill, consider the starting pixel, plus any pixels connected 4-directionally to the starting pixel of the same color as the starting pixel, plus any pixels connected 4-directionally to those pixels (also with the same color), and so on. Replace the color of all of the aforementioned pixels with color.

Example 1:
Input: image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2
Output: [[2,2,2],[2,2,0],[2,0,1]]

Example 2:
Input: image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, color = 0
Output: [[0,0,0],[0,0,0]]

Constraints:
- m == image.length
- n == image[i].length
- 1 <= m, n <= 50
- 0 <= image[i][j], color < 2^16
- 0 <= sr < m
- 0 <= sc < n`,
    solution: `def floodFill(image, sr, sc, color):
    start_color = image[sr][sc]
    if start_color == color: return image
    
    def dfs(r, c):
        if (r < 0 or r >= len(image) or 
            c < 0 or c >= len(image[0]) or 
            image[r][c] != start_color):
            return
        image[r][c] = color
        dfs(r+1, c)
        dfs(r-1, c)
        dfs(r, c+1)
        dfs(r, c-1)
        
    dfs(sr, sc)
    return image`,
    whyMethod: "Depth First Search (DFS)! Think of it like painting: you start at a point, then branch out to neighbors, then their neighbors, until you hit a boundary or a different color.",
    howMethod: "Save the starting color. Define a recursive function that checks if current pixel matches starting color. If yes, paint it and call DFS on up, down, left, right neighbors.",
    whyFunction: "if start_color == color: return prevents infinite loops when re-painting with the same color. Boundary checks (r < 0, etc.) are essential to avoid errors.",
    howFunction: "Starts at (1,1). Paints it 2. Checks neighbors. (0,1) is white? Yes -> Paint 2. Branch continues until it hits 0s or edge.",
    timeComplexity: "O(N)", spaceComplexity: "O(N) (recursion stack)",
    relatedQ: {
      title: "Island Perimeter (LC #463)",
      problem: "Find length of border around an island.",
      solution: "Iterate and subtract shared walls.",
      why: "Both involve traversing connected components in a grid."
    }
  },
  {
    id: 59, num: 746, title: "Min Cost Climbing Stairs", topic: ["Array", "Dynamic Programming"], mostAsked: false,
    askCount: 3900,
    problem: `You are given an integer array cost where cost[i] is the cost of ith step on a staircase. Once you pay the cost, you can either climb one or two steps.

You can either start from the step with index 0, or the step with index 1.

Return the minimum cost to reach the top of the floor.

Example 1:
Input: cost = [10,15,20]
Output: 15
Explanation: You will start at index 1. Pay 15 and climb two steps to reach the top.

Example 2:
Input: cost = [1,100,1,1,1,100,1,1,100,1]
Output: 6

Constraints:
- 2 <= cost.length <= 1000
- 0 <= cost[i] <= 999`,
    solution: `def minCostClimbingStairs(cost):
    cost.append(0) # the floor above last step
    for i in range(len(cost) - 3, -1, -1):
        cost[i] += min(cost[i + 1], cost[i + 2])
    return min(cost[0], cost[1])`,
    whyMethod: "Dynamic Programming (Bottom-Up)! The cost to reach the top from step 'i' is cost[i] plus the minimum of the costs to reach the top from the two steps ahead.",
    howMethod: "Modify the cost array in-place from right-to-left. For each step, add the minimum of its two next options. The answer is the minimum of starting at index 0 or index 1.",
    whyFunction: "cost.append(0) represents the goal. range(len-3, -1, -1) starts from the last real choice you have to make.",
    howFunction: "[10, 15, 20, 0]: 15 + min(20, 0) = 15. 10 + min(15, 20) = 25. min(25, 15) = 15.",
    timeComplexity: "O(n)", spaceComplexity: "O(1)",
    relatedQ: {
      title: "Climbing Stairs (LC #70)",
      problem: "Count WAYS to climb.",
      solution: "ways[i] = ways[i-1] + ways[i-2]",
      why: "Both are Fibonacci variations: one sums ways, one minimizes cost."
    }
  },
  {
    id: 60, num: 844, title: "Backspace String Compare", topic: ["Two Pointers", "String", "Stack"], mostAsked: true,
    askCount: 5100,
    problem: `Given two strings s and t, return true if they are equal when both are typed into empty text editors. '#' means a backspace character.

Note that after backspacing an empty text, the text will continue empty.

Example 1:
Input: s = "ab#c", t = "ad#c"
Output: true
Explanation: Both s and t become "ac".

Example 2:
Input: s = "ab##", t = "c#d#"
Output: true
Explanation: Both s and t become "".

Constraints:
- 1 <= s.length, t.length <= 200
- s and t only contain lowercase letters and '#' characters.`,
    solution: `def backspaceCompare(s, t):
    def build(S):
        stack = []
        for c in S:
            if c != '#': stack.append(c)
            elif stack: stack.pop()
        return "".join(stack)
    return build(s) == build(t)`,
    whyMethod: "Stack is the natural intuitive choice! A backspace ('#') deletes the last character entered, which is exactly how a stack (LIFO) behaves.",
    howMethod: "Write a helper function that process characters: if it's a letter, push to stack. If it's '#', pop the last letter. Convert both final stacks to strings and compare.",
    whyFunction: "elif stack: pop() handles the case where '#' appears at the very start of a string (nothing to delete). join() collapses the stack back into a word.",
    howFunction: "ab#c: a, ab, pop(b)->a, ac. ad#c: a, ad, pop(d)->a, ac. 'ac' == 'ac' -> True.",
    timeComplexity: "O(N+M)", spaceComplexity: "O(N+M)",
    relatedQ: {
      title: "Remove All Adjacent Duplicates (LC #1047)",
      problem: "Remove pairs of same characters (aa -> delete).",
      solution: "If char == stack[-1]: pop() else: push()",
      why: "Both use a stack to 'delete' previous progress based on new incoming chars."
    }
  },
  {
    id: 61, num: 860, title: "Lemonade Change", topic: ["Array", "Greedy"], mostAsked: false,
    askCount: 3300,
    problem: `At a lemonade stand, each lemonade costs $5. Customers are standing in a queue to buy from you and order one at a time (in the order specified by bills). Each customer will only buy one lemonade and pay with either a $5, $10, or $20 bill. You must provide the correct change to each customer such that the net transaction is that the customer pays $5.

Note that you do not have any change in hand at first.

Return true if you can provide every customer with the correct change, or false otherwise.

Example 1:
Input: bills = [5,5,5,10,20]
Output: true

Example 2:
Input: bills = [5,5,10,10,20]
Output: false

Constraints:
- 1 <= bills.length <= 10^5
- bills[i] is either 5, 10, or 20.`,
    solution: `def lemonadeChange(bills):
    five = ten = 0
    for b in bills:
        if b == 5: five += 1
        elif b == 10:
            if not five: return False
            five -= 1; ten += 1
        else:
            if ten and five: ten -= 1; five -= 1
            elif five >= 3: five -= 3
            else: return False
    return True`,
    whyMethod: "Greedy Algorithm! When giving $15 change (for a $20 bill), it's ALWAYS better to give a $10 and a $5 than three $5s. Saving $5 bills gives you more flexibility later.",
    howMethod: "Track your counts of $5 and $10 bills. For a $10, you MUST use one $5. For a $20, try using one $10 + one $5 first, otherwise fall back to three $5s. If you can't, return False.",
    whyFunction: "ten and five: logic prioritize larger bills for change. You never need to track $20 bills because they can't be used as change.",
    howFunction: "[5, 10, 20]: Sell 5 (+1 five). Sell 10 (needs 5, fail if none). Sell 20 (needs 10+5 OR 5+5+5).",
    timeComplexity: "O(n)", spaceComplexity: "O(1)",
    relatedQ: {
      title: "Assign Cookies (LC #455)",
      problem: "Maximize happy children given cookie sizes.",
      solution: "Sort and use greedy allocation.",
      why: "Greedy logic: use the 'least' resource that satisfies the current constraint."
    }
  },
  {
    id: 62, num: 896, title: "Monotonic Array", topic: ["Array"], mostAsked: false,
    askCount: 3100,
    problem: `An array is monotonic if it is either monotone increasing or monotone decreasing.

An array nums is monotone increasing if for all i <= j, nums[i] <= nums[j]. An array nums is monotone decreasing if for all i <= j, nums[i] >= nums[j].

Given an integer array nums, return true if the given array is monotonic, or false otherwise.

Example 1:
Input: nums = [1,2,2,3]
Output: true

Example 2:
Input: nums = [6,5,4,4]
Output: true

Example 3:
Input: nums = [1,3,2]
Output: false

Constraints:
- 1 <= nums.length <= 10^5
- -10^5 <= nums[i] <= 10^5`,
    solution: `def isMonotonic(nums):
    inc = dec = True
    for i in range(len(nums) - 1):
        if nums[i] > nums[i+1]: inc = False
        if nums[i] < nums[i+1]: dec = False
    return inc or dec`,
    whyMethod: "One Pass Multi-Check! We assume the array is BOTH increasing and decreasing. As we walk through, we disprove these assumptions. If either assumption survives at the end, it's monotonic.",
    howMethod: "Initialize two booleans 'increasing' and 'decreasing' to True. Walk through neighbors. If current > next, it can't be strictly increasing -> set inc=False. If current < next, it can't be decreasing. Return (inc OR dec).",
    whyFunction: "The or logic handles the case where all elements are the same (both remain True) correctly.",
    howFunction: "[1, 2, 2, 3]: never decreasing, inc stays True. Result = True.",
    timeComplexity: "O(n)", spaceComplexity: "O(1)",
    relatedQ: {
      title: "Check if Array Is Sorted and Rotated (LC #1752)",
      problem: "Is array sorted, possibly with a circular shift?",
      solution: "Count how many times current > next (must be <= 1).",
      why: "Variation of order checking in linear sequences."
    }
  },
  {
    id: 63, num: 905, title: "Sort Array By Parity", topic: ["Array", "Two Pointers"], mostAsked: true,
    askCount: 4600,
    problem: `Given an integer array nums, move all the even integers at the beginning of the array followed by all the odd integers.

Return any array that satisfies this condition.

Example 1:
Input: nums = [3,1,2,4]
Output: [2,4,3,1]
Explanation: [4,2,3,1], [2,4,1,3], and [4,2,1,3] would also be accepted.

Example 2:
Input: nums = [0]
Output: [0]

Constraints:
- 1 <= nums.length <= 5000
- 0 <= nums[i] <= 5000`,
    solution: `def sortArrayByParity(nums):
    l, r = 0, len(nums) - 1
    while l < r:
        if nums[l] % 2 > nums[r] % 2: # left odd, right even -> swap
            nums[l], nums[r] = nums[r], nums[l]
        if nums[l] % 2 == 0: l += 1
        if nums[r] % 2 == 1: r -= 1
    return nums`,
    whyMethod: "Two Pointers (In-place)! Just like Partition in Quicksort. Use one pointer to find 'out of place' odds on the left, and one for evens on the right, then swap.",
    howMethod: "Start 'left' at 0, 'right' at end. Move 'left' inward while it sees even numbers. Move 'right' inward while it sees odd. If they stop, it means left is on an odd and right is on an even -> swap them and continue.",
    whyFunction: "nums[l] % 2 == 0 checks for parity. Swapping in-place keeps space complexity at O(1).",
    howFunction: "Walk through [3, 1, 2, 4]: Left stops at 3, Right stops at 4. Swap -> [4, 1, 2, 3]. Continue.",
    timeComplexity: "O(n)", spaceComplexity: "O(1)",
    relatedQ: {
      title: "Move Zeroes (LC #283)",
      problem: "Move zeros to end, maintain order.",
      solution: "One write pointer, one read pointer.",
      why: "Both involve reorganizing array elements based on a boolean criteria."
    }
  },
  {
    id: 64, num: 929, title: "Unique Email Addresses", topic: ["Array", "Hash Table", "String"], mostAsked: false,
    askCount: 2900,
    problem: `Every valid email consists of a local name and a domain name, separated by the '@' sign. Besides lowercase letters, the email may contain one or more '.' or '+'.

- If you add periods '.' between some characters in the local name part of an email address, mail sent there will be forwarded to the same address without dots in the local name.
- If you add a plus '+' in the local name, everything after the first plus sign will be ignored.

Given an array of strings emails where we send one email to each emails[i], return the number of different addresses that actually receive mails.

Example 1:
Input: emails = ["test.email+alex@leetcode.com","test.e.mail+bob.cathy@leetcode.com","testemail+david@lee.tcode.com"]
Output: 2
Explanation: "testemail@leetcode.com" and "testemail@lee.tcode.com" actually receive mails.

Example 2:
Input: emails = ["a@leetcode.com","b@leetcode.com","c@leetcode.com"]
Output: 3

Constraints:
- 1 <= emails.length <= 100
- 1 <= emails[i].length <= 100
- emails[i] consist of lowercase English letters, '+', '.' and '@'.`,
    solution: `def numUniqueEmails(emails):
    unique = set()
    for e in emails:
        local, domain = e.split('@')
        local = local.split('+')[0].replace('.', '')
        unique.add(local + '@' + domain)
    return len(unique)`,
    whyMethod: "Split and Clean! A set naturally handles uniqueness. We just need to transform each email into its 'canonical' form before adding to the set.",
    howMethod: "For each email, split into local and domain parts. On the local part, discard everything after the first '+'. Remove all '.' characters. Join back with '@domain' and add to a Set.",
    whyFunction: "split('@') keeps the domain untouched. replace('.', '') is a robust way to clean the local name.",
    howFunction: "Transforming 'a.b+c@d.com' -> 'ab@d.com'. Any email with same canonical form only counts once in the set.",
    timeComplexity: "O(N*M)", spaceComplexity: "O(N*M)",
    relatedQ: {
      title: "Is Isomorphic (LC #205)",
      problem: "Check if mapping is consistent.",
      solution: "Double Hash Map.",
      why: "Both involve mapping distinct inputs to canonical identities."
    }
  },
  {
    id: 65, num: 933, title: "Number of Recent Calls", topic: ["Design", "Queue"], mostAsked: true,
    askCount: 4200,
    problem: `You have a RecentCounter class which counts the number of recent requests within a certain time frame.

Implement the RecentCounter class:
- RecentCounter() Initializes the counter with zero recent requests.
- int ping(int t) Adds a new request at time t, where t represents some time in milliseconds, and returns the number of requests that has happened in the past 3000 milliseconds (including the new request). Specifically, return the number of requests that have happened in the inclusive range [t - 3000, t].

Example 1:
Input:
["RecentCounter", "ping", "ping", "ping", "ping"]
[[], [1], [100], [3001], [3002]]
Output:
[null, 1, 2, 3, 3]

Constraints:
- 1 <= t <= 10^9
- Each test case will call ping with strictly increasing values of t.
- At most 10^4 calls will be made to ping.`,
    solution: `class RecentCounter:
    def __init__(self):
        self.q = collections.deque()

    def ping(self, t):
        self.q.append(t)
        while self.q[0] < t - 3000:
            self.q.popleft()
        return len(self.q)`,
    whyMethod: "Queue (FIFO) Pattern! Since timestamps always increase, requests that expire will always be at the front of our line. A queue lets us efficiently add to end and remove from front.",
    howMethod: "Add the new timestamp to the end of a queue. Check the front of the queue: while the timestamps are older than (current - 3000), remove them. The size of the remaining queue is the answer.",
    whyFunction: "collections.deque() provides O(1) removals from the left (popleft). Using a list would be O(n).",
    howFunction: "Ping at 3500. Queue has [1, 100, 500]. New [1, 100, 500, 3500]. Pop 1 because 1 < 3500-3000. Result = 3.",
    timeComplexity: "O(1) amortized", spaceComplexity: "O(N) (max 3000 if 1 ping per ms)",
    relatedQ: {
      title: "Sliding Window Maximum (LC #239) — Hard",
      problem: "Find max in window of size k moving through array.",
      solution: "Deque to track indices of max candidates.",
      why: "Both involve a 'time-limited' window where only recent info matters."
    }
  },
  {
    id: 66, num: 938, title: "Range Sum of BST", topic: ["Tree", "Binary Search Tree", "DFS"], mostAsked: true,
    askCount: 5400,
    problem: `Given the root node of a binary search tree and two integers low and high, return the sum of values of all nodes with a value in the inclusive range [low, high].

Example 1:
Input: root = [10,5,15,3,7,null,18], low = 7, high = 15
Output: 32
Explanation: Nodes 7, 10, and 15 are in the range [7, 15]. 7 + 10 + 15 = 32.

Example 2:
Input: root = [10,5,15,3,7,13,18,1,null,6], low = 6, high = 10
Output: 23
Explanation: Nodes 6, 7, and 10 are in the range [6, 10]. 6 + 7 + 10 = 23.

Constraints:
- The number of nodes in the tree is in the range [1, 2 * 10^4].
- 1 <= Node.val <= 10^5
- 1 <= low <= high <= 10^5
- All Node.val are unique.`,
    solution: `def rangeSumBST(root, low, high):
    self.sum = 0
    def dfs(node):
        if not node: return
        if low <= node.val <= high:
            self.sum += node.val
        if node.val > low:
            dfs(node.left)
        if node.val < high:
            dfs(node.right)
    dfs(root)
    return self.sum`,
    whyMethod: "Pruned Search! In a BST, we can skip subtrees entirely. If current value ≤ low, we don't need to look at its left child. If ≥ high, we don't need to look right.",
    howMethod: "Recursively visit the tree. If node value is in range, add to sum. ONLY visit left child if node's value > low. ONLY visit right child if value < high.",
    whyFunction: "Pruning (skipping subtrees) is the key to making this faster than a full tree scan. self.sum tracks total across recursive calls.",
    howFunction: "Search range [7, 15] on root 10. Visit both children. On child 5, value < 7, skip its left side and only check its right for values >= 7.",
    timeComplexity: "O(n)", spaceComplexity: "O(h)",
    relatedQ: {
      title: "Search in a BST (LC #700)",
      problem: "Find one specific value.",
      solution: "Branch left or right only.",
      why: "Range sum is a 'dual branch' search where both sides might be relevant."
    }
  },
  {
    id: 67, num: 941, title: "Valid Mountain Array", topic: ["Array"], mostAsked: false,
    askCount: 3300,
    problem: `Given an array of integers arr, return true if and only if it is a valid mountain array.

Recall that arr is a mountain array if and only if:
- arr.length >= 3
- There exists some i with 0 < i < arr.length - 1 such that:
  - arr[0] < arr[1] < ... < arr[i - 1] < arr[i]
  - arr[i] > arr[i + 1] > ... > arr[arr.length - 1]

Example 1:
Input: arr = [2,1]
Output: false

Example 2:
Input: arr = [3,5,5]
Output: false

Example 3:
Input: arr = [0,3,2,1]
Output: true

Constraints:
- 1 <= arr.length <= 10^4
- 0 <= arr[i] <= 10^4`,
    solution: `def validMountainArray(arr):
    n = len(arr)
    if n < 3: return False
    i = 0
    while i + 1 < n and arr[i] < arr[i + 1]:
        i += 1
    if i == 0 or i == n - 1: return False
    while i + 1 < n and arr[i] > arr[i + 1]:
        i += 1
    return i == n - 1`,
    whyMethod: "The 'Climber' approach! Simulate climbing up the mountain as far as possible, then climbing down. If you end up at the exact end of the array, it's a valid mountain.",
    howMethod: "Iterate as long as numbers are increasing. Stop at the peak. Check if peak is valid (not at start or end). Then continue iterating as long as numbers are decreasing. If you reach the last index, success!",
    whyFunction: "i == 0 check ensures it's not just a 'downhill' slope. i == n-1 ensures it's not just an 'uphill' slope.",
    howFunction: "[1, 2, 3, 2, 1]: Climb to index 2 (val 3). Not at edge. Descend to last index. Result = True.",
    timeComplexity: "O(n)", spaceComplexity: "O(1)",
    relatedQ: {
      title: "Longest Mountain in Array (LC #845) — Medium",
      problem: "Find the longest mountain segment in a larger array.",
      solution: "Find peaks and expand outwards from each.",
      why: "Same definition, but need to find the best local mountain among many."
    }
  },
  {
    id: 68, num: 942, title: "DI String Match", topic: ["Array", "Two Pointers", "String", "Greedy"], mostAsked: false,
    askCount: 2700,
    problem: `A permutation perm of n + 1 integers of all the integers in the range [0, n] can be represented as a string s of length n where:
- s[i] == 'I' if perm[i] < perm[i + 1]
- s[i] == 'D' if perm[i] > perm[i + 1]

Given a string s, reconstruct the permutation perm and return it. If there are multiple valid permutations perm, return any of them.

Example 1:
Input: s = "IDID"
Output: [0,4,1,3,2]

Example 2:
Input: s = "III"
Output: [0,1,2,3]

Example 3:
Input: s = "DDI"
Output: [3,2,0,1]

Constraints:
- 1 <= s.length <= 10^5
- s[i] is either 'I' or 'D'.`,
    solution: `def diStringMatch(s):
    l, r = 0, len(s)
    res = []
    for c in s:
        if c == 'I':
            res.append(l); l += 1
        else:
            res.append(r); r -= 1
    res.append(l)
    return res`,
    whyMethod: "Two Pointers / Greedy! For an 'Increase', use the smallest possible remaining number. For a 'Decrease', use the largest possible. This guarantees a safe follow-up move.",
    howMethod: "Start with range [0, n]. For each 'I' in the string, take the current minimum from range and increment it. For each 'D', take the current maximum and decrement it. Append the final remaining number at the end.",
    whyFunction: "Taking the absolute min/max ensures that no matter what the next character is, there's a valid number left to satisfy it.",
    howFunction: "'IDID' (0-4): I->0, D->4, I->1, D->3. Last is 2. Result [0,4,1,3,2].",
    timeComplexity: "O(n)", spaceComplexity: "O(n)",
    relatedQ: {
      title: "Smallest Number From DI String (LC #2375) — Medium",
      problem: "Find the lexicographically smallest permutation.",
      solution: "Stack approach to reverse 'D' segments.",
      why: "More restrictive variation requiring specific sorting within segments."
    }
  },
  {
    id: 69, num: 944, title: "Delete Columns to Make Sorted", topic: ["Array", "String"], mostAsked: false,
    askCount: 2200,
    problem: `You have an array of strings. You want to delete columns that are NOT sorted lexicographically. Return count of deleted columns.\n\nExample:\nInput: ["abc", "bce", "cae"]\nCol 0: a,b,c (sorted), Col 1: b,c,a (NOT sorted!) → Delete!`,
    solution: `def minDeletionSize(strs):
    count = 0
    for col in range(len(strs[0])):
        for row in range(len(strs) - 1):
            if strs[row][col] > strs[row + 1][col]:
                count += 1
                break
    return count`,
    whyMethod: "Vertical Scan! We iterate column-by-column rather than row-by-row. For each column, we check every row to ensure character[r] ≤ character[r+1].",
    howMethod: "Loop through column indices 0 to width. Inside, loop through row indices 0 to height-1. If any character is 'greater' than the one below it in that column, increment delete count and move to next column.",
    whyFunction: "break is used to stop checking the current column as soon as we found it's unsorted — no need to count a single column twice.",
    howFunction: "Checking Col 1 of ['b', 'c', 'a']: 'c' > 'a' -> delete count++. Done with Column 1.",
    timeComplexity: "O(N*M)", spaceComplexity: "O(1)",
    relatedQ: {
      title: "Find Valid Matrix (LC #1605)",
      problem: "Construct matrix from row/col sums.",
      solution: "Greedy fill based on constraints.",
      why: "Both involve working with matrix dimensions (rows and cols) independently."
    }
  },
  {
    id: 70, num: 953, title: "Verifying an Alien Dictionary", topic: ["Array", "Hash Table", "String"], mostAsked: true,
    askCount: 4800,
    problem: `In an alien language, surprisingly, they also use English lowercase letters, but possibly in a different order. The order of the alphabet is some permutation of lowercase letters.

Given a list of words written in the alien language, and the order of the alphabet, return true if and only if the given words are sorted lexicographically in this alien language.

Example 1:
Input: words = ["hello","leetcode"], order = "hlabcdefgijkmnopqrstuvwxyz"
Output: true

Example 2:
Input: words = ["word","world","row"], order = "worldabcefghijkmnpqstuvxyz"
Output: false

Example 3:
Input: words = ["apple","app"], order = "abcdefghijklmnopqrstuvwxyz"
Output: false

Constraints:
- 1 <= words.length <= 100
- 1 <= words[i].length <= 20
- order.length == 26
- All characters in words[i] and order are English lowercase letters.`,
    solution: `def isAlienSorted(words, order):
    order_map = {c: i for i, c in enumerate(order)}
    for i in range(len(words) - 1):
        w1, w2 = words[i], words[i+1]
        for j in range(len(w1)):
            if j == len(w2): return False
            if w1[j] != w2[j]:
                if order_map[w1[j]] > order_map[w2[j]]:
                    return False
                break
    return True`,
    whyMethod: "Pairwise Comparison + Order Map! Strings are sorted if every adjacent pair is sorted. We build a dictionary to store the custom rank of each alien letter.",
    howMethod: "Create a map for custom letter ranks. Compare words pairwise. Within each pair, compare characters: first difference decides order using the map. If w1 is longer than w2 but identical up to w2's end (e.g. apple vs app), it's unsorted.",
    whyFunction: "order_map[char] converts an alien letter into an integer we can compare. if j == len(w2) handles the prefix edge case.",
    howFunction: "Alien order: h=0, l=1. 'hello' vs 'leetcode': 'h' vs 'l' -> 0 < 1. OK for this pair.",
    timeComplexity: "O(Total Chars)", spaceComplexity: "O(1) (max 26 letters)",
    relatedQ: {
      title: "Valid Anagram (LC #242)",
      problem: "Check if words have same char frequency.",
      solution: "Frequency Hash Map.",
      why: "Both use Hash Maps to define/check character-level properties."
    }
  },
  {
    id: 71, num: 961, title: "N-Repeated Element in Size 2N Array", topic: ["Array", "Hash Table"], mostAsked: false,
    askCount: 2600,
    problem: `In a array nums of size 2N, there are n + 1 unique elements, and exactly one of these elements is repeated n times.

Return the element repeated n times.

Example 1:
Input: nums = [1,2,3,3]
Output: 3

Example 2:
Input: nums = [2,1,2,5,3,2]
Output: 2

Example 3:
Input: nums = [5,1,5,2,5,3,5,4]
Output: 5

Constraints:
- 2 <= n <= 5000
- nums.length == 2 * n
- 0 <= nums[i] <= 10^4
- nums contains n + 1 unique elements and one of them is repeated exactly n times.`,
    solution: `def repeatedNTimes(nums):
    seen = set()
    for x in nums:
        if x in seen: return x
        seen.add(x)
    return -1`,
    whyMethod: "The One-Duplicate Rule! If one element is repeated N times in a 2N array, it's essentially the ONLY repetitive element. Any element you see twice must be the answer.",
    howMethod: "Iterate through the array and store each number in a Hash Set. As soon as you see a number that is already in the set, that's your N-repeated element. Return it immediately.",
    whyFunction: "The set() provides O(1) average lookup time. The return happens on the very first duplicate found.",
    howFunction: "[5, 1, 5, 2]: Add 5, Add 1, see 5 again -> return 5.",
    timeComplexity: "O(n)", spaceComplexity: "O(n)",
    relatedQ: {
      title: "Single Number (LC #136)",
      problem: "Every number repeats twice except one.",
      solution: "XOR all numbers.",
      why: "Both use element repetition frequency but allow different trade-offs in space (Set vs Bitwise)."
    }
  },
  {
    id: 72, num: 965, title: "Univalued Binary Tree", topic: ["Tree", "DFS"], mostAsked: false,
    askCount: 2800,
    problem: `A binary tree is uni-valued if every node in the tree has the same value.

Given the root of a binary tree, return true if the given tree is uni-valued, or false otherwise.

Example 1:
Input: root = [1,1,1,1,1,null,1]
Output: true

Example 2:
Input: root = [2,2,2,5,2]
Output: false

Constraints:
- The number of nodes in the tree is in the range [1, 100].
- 0 <= Node.val <= 99`,
    solution: `def isUnivalTree(root):
    val = root.val
    def dfs(node):
        if not node: return True
        if node.val != val: return False
        return dfs(node.left) and dfs(node.right)
    return dfs(root)`,
    whyMethod: "Global Comparison! Every node's value must match the root node's value.",
    howMethod: "Store the root's value. Use DFS to visit every node. If any node has a value different from the stored root value, return False. Otherwise, keep checking subtrees.",
    whyFunction: "and operator ensures all nodes in all branches return True for the final result to be True.",
    howFunction: "Root 1, child 1 (ok), child 1 (ok). All paths true -> result true.",
    timeComplexity: "O(n)", spaceComplexity: "O(h)",
    relatedQ: {
      title: "Same Tree (LC #100)",
      problem: "Check if two trees are identical.",
      solution: "DFS comparing both nodes simultaneously.",
      why: "Identity checking across structures is almost always a recursive DFS."
    }
  },
  {
    id: 73, num: 977, title: "Squares of a Sorted Array", topic: ["Array", "Two Pointers"], mostAsked: true,
    askCount: 6500,
    problem: `Given a sorted array, return an array of the squares of each number sorted in non-decreasing order.\n\nExample:\nInput: [-4,-1,0,3,10] → Output: [0,1,9,16,100]`,
    solution: `def sortedSquares(nums):
    n = len(nums)
    res = [0] * n
    l, r = 0, n - 1
    for i in range(n-1, -1, -1):
        if abs(nums[l]) > abs(nums[r]):
            res[i] = nums[l] ** 2
            l += 1
        else:
            res[i] = nums[r] ** 2
            r -= 1
    return res`,
    whyMethod: "Two Pointers from Ends! The largest squares in a sorted list are always at the edges (either the most negative or most positive numbers).",
    howMethod: "Place pointers at the start and end of the array. Compare the magnitude (absolute value) of the two pointers. Place the larger square at the END of your result array, then move that pointer inward. Repeat until the array is filled.",
    whyFunction: "Filling from n-1 down to 0 avoids the need to sort at the end, keeping complexity O(n).",
    howFunction: "[-4, 1, 10]: Square 10 is biggest -> [_, _, 100]. Square -4 is next -> [_, 16, 100]. Last square 1 -> [1, 16, 100].",
    timeComplexity: "O(n)", spaceComplexity: "O(n)",
    relatedQ: {
      title: "Merge Sorted Array (LC #88)",
      problem: "Combine two sorted arrays.",
      solution: "Two pointers, fill backwards.",
      why: "Both involve using ends of arrays to safely fill a result without re-sorting."
    }
  },
  {
    id: 74, num: 985, title: "Sum of Even Numbers After Queries", topic: ["Array"], mostAsked: false,
    askCount: 2100,
    problem: `You are given an integer array nums and a 2D array queries where queries[i] = [vali, indexi].

For each query i, first apply nums[indexi] = nums[indexi] + vali, then print the sum of the even values of nums.

Return an integer array answer where answer[i] is the answer to the ith query.

Example 1:
Input: nums = [1,2,3,4], queries = [[1,0],[-3,1],[-4,0],[2,3]]
Output: [8,6,2,4]
Explanation: At the beginning, the array is [1,2,3,4].
After adding 1 to nums[0], the array is [2,2,3,4], and the sum of even values is 2 + 2 + 4 = 8.
After adding -3 to nums[1], the array is [2,-1,3,4], and the sum of even values is 2 + 4 = 6.
After adding -4 to nums[0], the array is [-2,-1,3,4], and the sum of even values is -2 + 4 = 2.
After adding 2 to nums[3], the array is [-2,-1,3,6], and the sum of even values is -2 + 6 = 4.

Constraints:
- 1 <= nums.length <= 10^4
- -10^4 <= nums[i] <= 10^4
- 1 <= queries.length <= 10^4
- -10^4 <= vali <= 10^4
- 0 <= indexi < nums.length`,
    solution: `def sumEvenAfterQueries(nums, queries):
    S = sum(x for x in nums if x % 2 == 0)
    res = []
    for val, idx in queries:
        if nums[idx] % 2 == 0: S -= nums[idx]
        nums[idx] += val
        if nums[idx] % 2 == 0: S += nums[idx]
        res.append(S)
    return res`,
    whyMethod: "Delta Tracking! Instead of re-calculating the sum from scratch for every query (O(Q*N)), simply subtract the old value from the running sum if it was even, and add the new value if it's even.",
    howMethod: "First, calculate the initial 'even sum'. For each query: check if current nums[idx] was even (if so, remove from S). Update the number. Then check if the newly updated number is even (if so, add to S). Record current S.",
    whyFunction: "The if checks handle the four parity cases (even->even, even->odd, odd->even, odd->odd) correctly.",
    howFunction: "Even Sum = 6. Update 2 by +1. 2 was even -> sum becomes 4. New 3 is odd -> sum stays 4.",
    timeComplexity: "O(N + Q)", spaceComplexity: "O(1) (excluding result)",
    relatedQ: {
      title: "Range Sum Query (LC #303)",
      problem: "Get sum of subarray in O(1).",
      solution: "Precompute Prefix Sums.",
      why: "Both avoid redundant calculation by maintaining internal state between operations."
    }
  },
  {
    id: 75, num: 989, title: "Add to Array-Form of Integer", topic: ["Array", "Math"], mostAsked: false,
    askCount: 2800,
    problem: `The array-form of an integer num is an array representing its digits in left to right order.

For example, for num = 1321, the array form is [1,3,2,1].
Given num, the array-form of an integer, and an integer k, return the array-form of the integer num + k.

Example 1:
Input: num = [1,2,0,0], k = 34
Output: [1,2,3,4]

Example 2:
Input: num = [2,7,4], k = 181
Output: [4,5,5]

Example 3:
Input: num = [2,1,5], k = 806
Output: [1,0,2,1]

Constraints:
- 1 <= num.length <= 10^4
- 0 <= num[i] <= 9
- num does not contain any leading zeros, except for the zero itself.
- 1 <= k <= 10^4`,
    solution: `def addToArrayForm(num, k):
    res = []
    i = len(num) - 1
    while i >= 0 or k > 0:
        if i >= 0:
            k += num[i]
            i -= 1
        res.append(k % 10)
        k //= 10
    return res[::-1]`,
    whyMethod: "Elementary Addition! We can think of K as the 'carry' itself. We add K to the last digit, keep the remainder, and update K with the carry.",
    howMethod: "Iterate from the back of the digit array. At each step, add the current digit to K. store k%10 (the last digit of the sum) and update k to k//10 (the carry). Continue until both array and K are exhausted. Reverse the result.",
    whyFunction: "k //= 10 effectively shifts the integer k right, pushing the carry to the next column correctly.",
    howFunction: "num=[1,2,0,0], k=34: 0+34=34 -> res=[4], k=3. 0+3=3 -> res=[4,3], k=0. 2+0=2 -> res=[4,3,2], k=0. 1+0=1 -> res=[4,3,2,1]. Reverse.",
    timeComplexity: "O(max(N, log K))", spaceComplexity: "O(max(N, log K))",
    relatedQ: {
      title: "Plus One (LC #66)",
      problem: "Add 1 to digit array.",
      solution: "Add carry from end.",
      why: "Plus One is a special case of this problem where K=1."
    }
  },
  {
    id: 76, num: 993, title: "Cousins in Binary Tree", topic: ["Tree", "BFS"], mostAsked: true,
    askCount: 3500,
    problem: `In a binary tree, the root node is at depth 0, and children of each depth k node are at depth k+1.

Two nodes of a binary tree are cousins if they have the same depth, but have different parents.

We are given the root of a binary tree with unique values, and the values x and y of two different nodes in the tree.

Return true if and only if the nodes corresponding to the values x and y are cousins.

Example 1:
Input: root = [1,2,3,4], x = 4, y = 3
Output: false

Example 2:
Input: root = [1,2,3,null,4,null,5], x = 5, y = 4
Output: true

Constraints:
- The number of nodes in the tree is in the range [2, 100].
- 1 <= Node.val <= 100
- Each node has a unique value.
- x != y
- x and y are values of nodes in the tree.`,
    solution: `def isCousins(root, x, y):
    res = [] # store (parent, depth)
    def dfs(node, p, d):
        if not node or len(res) == 2: return
        if node.val == x or node.val == y:
            res.append((p, d))
        dfs(node.left, node, d + 1)
        dfs(node.right, node, d + 1)
    dfs(root, None, 0)
    return res[0][0] != res[1][0] and res[0][1] == res[1][1]`,
    whyMethod: "Locate and Compare! Find both nodes and record who their parents are and how deep they are. Use the recorded data to check the two cousin rules.",
    howMethod: "Perform a tree search (DFS or BFS). When you find x or y, save their parent node and current depth. After finding both, return True if (depthX == depthY) AND (parentX != parentY).",
    whyFunction: "res.append((p, d)) stores all metadata needed for the final ruleset in one pass.",
    howFunction: "x at (parentA, depth2), y at (parentB, depth2). Parents differ, depths match -> Yes, Cousins.",
    timeComplexity: "O(n)", spaceComplexity: "O(h)",
    relatedQ: {
      title: "Lowest Common Ancestor (LC #235)",
      problem: "Find closest parent of two nodes in BST.",
      solution: "Search based on BST property.",
      why: "Both involve finding relationships between two distinct nodes in a tree."
    }
  },
  {
    id: 77, num: 997, title: "Find the Town Judge", topic: ["Array", "Hash Table", "Graph"], mostAsked: true,
    askCount: 4300,
    problem: `In a town, there are n people labeled from 1 to n. There is a rumor that one of these people is secretly the town judge.

If the town judge exists, then:
1. The town judge trusts nobody.
2. Everybody (except for the town judge) trusts the town judge.
3. There is exactly one person that satisfies properties 1 and 2.

You are given an array trust where trust[i] = [ai, bi] representing that the person labeled ai trusts the person labeled bi. If a trust relationship does not exist in trust array, then such a trust relationship does not exist.

Return the label of the town judge if the town judge exists and can be identified, or return -1 otherwise.

Example 1:
Input: n = 2, trust = [[1,2]]
Output: 2

Example 2:
Input: n = 3, trust = [[1,3],[2,3]]
Output: 3

Example 3:
Input: n = 3, trust = [[1,3],[2,3],[3,1]]
Output: -1

Constraints:
- 1 <= n <= 1000
- 0 <= trust.length <= 10^4
- trust[i].length == 2
- All the pairs of trust are unique.
- ai != bi
- 1 <= ai, bi <= n`,
    solution: `def findJudge(n, trust):
    scores = [0] * (n + 1)
    for a, b in trust:
        scores[a] -= 1
        scores[b] += 1
    for i in range(1, n + 1):
        if scores[i] == n - 1:
            return i
    return -1`,
    whyMethod: "Net Trust Score! A judge's 'in-degree' (trust received) is N-1 and 'out-degree' (trust given) is 0. So their Net Trust (In minus Out) must be exactly N-1.",
    howMethod: "Initialize a score array of size N+1. For every [A, B] pair where A trusts B: decrement A's score and increment B's score. At the end, scan for someone with score N-1.",
    whyFunction: "scores[a] -= 1 ensures we catch people who trust others (judge can't trust anyone). scores[b] += 1 counts supporters.",
    howFunction: "n=2, trust=[[1,2]]. 1 trusts 2 -> score[1]=-1, score[2]=1. n-1 is 1. index 2 is judge.",
    timeComplexity: "O(T + N)", spaceComplexity: "O(N)",
    relatedQ: {
      title: "Find the Celebrity (LC #277) — Medium",
      problem: "Find a person everyone knows but who knows no one.",
      solution: "Process of elimination with queries.",
      why: "Functionally identical to Town Judge, but requires more optimal pointer elimination."
    }
  },
  {
    id: 78, num: 1002, title: "Find Common Characters", topic: ["Array", "Hash Table", "String"], mostAsked: false,
    askCount: 2900,
    problem: `Given a string array words, return an array of all characters that show up in all strings within the words (including duplicates). You may return the answer in any order.

Example 1:
Input: words = ["bella","label","roller"]
Output: ["e","l","l"]

Example 2:
Input: words = ["cool","lock","cook"]
Output: ["c","o"]

Constraints:
- 1 <= words.length <= 100
- 1 <= words[i].length <= 100
- words[i] consists of lowercase English letters.`,
    solution: `def commonChars(words):
    res = collections.Counter(words[0])
    for w in words[1:]:
        res &= collections.Counter(w)
    return list(res.elements())`,
    whyMethod: "Counter Intersection! The characters common to all strings are the ones that appear in the 'minimum common frequency' across all frequency maps.",
    howMethod: "Create a frequency counter for the first word. For every other word, intersect its counter with your current one (which keeps only keys found in both with the minimum of their counts). Finally, expand keys to a list.",
    whyFunction: "res &= Counter(w) is a Python shortcut for dictionary intersection that keeps the minimum count for each key. elements() expands frequencies back to a list.",
    howFunction: "'bella' {l:2, e:1...} & 'label' {l:2, e:1...} -> keeps {l:2, e:1}. Intersect with 'roller' -> keeps {l:2, e:1}.",
    timeComplexity: "O(N * WordLength)", spaceComplexity: "O(1) (charset size)",
    relatedQ: {
      title: "Intersection of Two Arrays II (LC #350)",
      problem: "Find common elements with duplicates.",
      solution: "Two frequency counts, take min.",
      why: "The exact same logic applied to arrays instead of strings."
    }
  },
  {
    id: 79, num: 1005, title: "Maximize Sum Of Array After K Negations", topic: ["Array", "Greedy", "Sorting"], mostAsked: false,
    askCount: 2400,
    problem: `You are given an integer array nums and an integer k. You should modify the array in the following way:
- choose an index i and replace nums[i] with -nums[i].
- you should apply this process exactly k times. You may choose the same index i multiple times.

Return the largest possible sum of the array after modifying it in this way.

Example 1:
Input: nums = [4,2,3], k = 1
Output: 5
Explanation: Choose index 1 and nums becomes [4,-2,3].

Example 2:
Input: nums = [3,-1,0,2], k = 3
Output: 6
Explanation: Choose index 1, 1, 1 and nums becomes [3,1,0,2].

Example 3:
Input: nums = [2,-3,-1,5,-4], k = 2
Output: 13
Explanation: Choose indices 1 and 4 and nums becomes [2,3,-1,5,4].

Constraints:
- 1 <= nums.length <= 10^4
- -100 <= nums[i] <= 100
- 1 <= k <= 10^4`,
    solution: `def largestSumAfterKNegations(nums, k):
    nums.sort()
    for i in range(len(nums)):
        if nums[i] < 0 and k > 0:
            nums[i] *= -1
            k -= 1
    if k % 2 == 1:
        nums.sort()
        nums[0] *= -1
    return sum(nums)`,
    whyMethod: "Greedy Strategy! To maximize sum, prioritze negating the most negative numbers. If you have negations left over, flip the smallest absolute value back and forth.",
    howMethod: "Sort the array. Flip every negative number (starting from smallest) into a positive and decrement K. If K is still odd after flipping all negatives, sort again and flip the smallest available positive number once (to minimize loss).",
    whyFunction: "k % 2 == 1 check is crucial: flipping a number twice doesn't change anything, so only an 'extra' flip matters.",
    howFunction: "[-4, -3, 2], k=3: Flip -4, Flip -3. k=1 left. Flip 3 (smallest positive) back to -3. Sum: 4+-3+2=3.",
    timeComplexity: "O(n log n)", spaceComplexity: "O(1)",
    relatedQ: {
      title: "Minimum Difference Between Largest and Smallest (LC #1509)",
      problem: "Change 3 elements to minimize range.",
      solution: "Greedy removal of ends after sorting.",
      why: "Both involve sorting and greedily modifying extreme values to hit a goal."
    }
  },
  {
    id: 80, num: 1009, title: "Complement of Base 10 Integer", topic: ["Math", "Bit Manipulation"], mostAsked: false,
    askCount: 2200,
    problem: `The complement of an integer is the integer you get when you flip all the 0's to 1's and all the 1's to 0's in its binary representation.

For example, The integer 5 is "101" in binary and its complement is "010" which is the integer 2.
Given an integer n, return its complement.

Example 1:
Input: n = 5
Output: 2
Explanation: 5 is "101" in binary, with complement "010" in binary, which is 2.

Example 2:
Input: n = 7
Output: 0
Explanation: 7 is "111" in binary, with complement "000" in binary, which is 0.

Example 3:
Input: n = 10
Output: 5
Explanation: 10 is "1010" in binary, with complement "0101" in binary, which is 5.

Constraints:
- 0 <= n < 10^9`,
    solution: `def bitwiseComplement(n):
    if n == 0: return 1
    # Find number of bits
    mask = 1
    while mask < n:
        mask = (mask << 1) + 1
    return n ^ mask`,
    whyMethod: "Bitwise XOR with a Mask! Flipping bits is equivalent to XORing a number with a string of 1s (mask). 101 ^ 111 = 010.",
    howMethod: "First handle 0. Then, create a 'mask' that consists of all 1s and has the same number of bits as N. For N=5 (101), mask would be 7 (111). Result is N XOR mask.",
    whyFunction: "mask = (mask << 1) + 1 builds a string of 1s (1 -> 11 -> 111). ^ is the binary toggle operator.",
    howFunction: "N=5 (101). Mask=7 (111). 101 XOR 111 -> 010 (binary 2).",
    timeComplexity: "O(log N)", spaceComplexity: "O(1)",
    relatedQ: {
      title: "Number Complement (LC #476)",
      problem: "Same problem.",
      solution: "XOR with all-ones bitmask.",
      why: "Identical problem, just testing binary manipulation mastery."
    }
  }
];

const TOPICS = [...new Set(QUESTIONS.flatMap(q => q.topic))].sort();

const COMPANY_LIST = Object.keys(COMPANIES);

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("home"); // home | list | detail | companies | company
  const [selectedQ, setSelectedQ] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [filter, setFilter] = useState({ topic: "All", search: "", sort: "mostAsked" });
  const [tab, setTab] = useState("explain"); // explain | related | ai
  const [aiLoading, setAiLoading] = useState(false);
  const [aiAnswer, setAiAnswer] = useState("");
  const [userQuestion, setUserQuestion] = useState("");
  const [solvedSet, setSolvedSet] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem("solved") || "[]")); }
    catch { return new Set(); }
  });
  const [apiKey, setApiKey] = useState(localStorage.getItem("gemini_api_key") || "");

  const saveSolved = (s) => {
    try { localStorage.setItem("solved", JSON.stringify([...s])); } catch {}
  };

  const toggleSolved = (id) => {
    setSolvedSet(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      saveSolved(next);
      return next;
    });
  };

  const filteredQuestions = useMemo(() => {
    let qs = [...QUESTIONS];
    if (filter.topic !== "All") qs = qs.filter(q => q.topic.includes(filter.topic));
    if (filter.search) qs = qs.filter(q =>
      q.title.toLowerCase().includes(filter.search.toLowerCase()) ||
      q.num.toString().includes(filter.search)
    );
    if (selectedCompany) {
      const nums = COMPANIES[selectedCompany] || [];
      qs = qs.filter(q => nums.includes(q.num));
    }
    if (filter.sort === "mostAsked") qs.sort((a, b) => b.askCount - a.askCount);
    else if (filter.sort === "number") qs.sort((a, b) => a.num - b.num);
    return qs;
  }, [filter, selectedCompany]);

  const askAI = async (prompt) => {
    if (!apiKey) {
      setAiAnswer("Please set your Gemini API key in the 'AI Config' section first.");
      return;
    }
    setAiLoading(true);
    setAiAnswer("");
    try {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `You are a helpful coding mentor for a beginner Python learner. Explain in simple, friendly language.
Problem: ${selectedQ?.title}
Description: ${selectedQ?.problem}
Solution being discussed: ${selectedQ?.solution}

User question: ${prompt}` }]
          }]
        })
      });
      const data = await r.json();
      if (data.error) {
        setAiAnswer(`Error: ${data.error.message || "Invalid API key or request"}`);
      } else {
        setAiAnswer(data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.");
      }
    } catch (err) {
      setAiAnswer("Connection error. Check your internet or API key.");
    }
    setAiLoading(false);
  };

  // ── STYLES ──
  const styles = {
    app: { minHeight: "100vh", background: "#0a0e1a", color: "#e2e8f0", fontFamily: "'JetBrains Mono', 'Fira Code', monospace" },
    nav: { background: "rgba(13,18,32,0.95)", borderBottom: "1px solid #1e2d4a", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60, position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(10px)" },
    logo: { fontSize: 20, fontWeight: 800, background: "linear-gradient(135deg, #00d4ff, #0090ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", cursor: "pointer" },
    navBtn: (active) => ({ background: active ? "#1e3a5f" : "transparent", border: active ? "1px solid #0090ff" : "1px solid transparent", color: active ? "#00d4ff" : "#94a3b8", padding: "6px 14px", borderRadius: 6, cursor: "pointer", fontSize: 13, transition: "all .2s" }),
    hero: { textAlign: "center", padding: "80px 24px 60px", background: "radial-gradient(ellipse at 50% 0%, rgba(0,144,255,0.12) 0%, transparent 70%)" },
    heroTitle: { fontSize: 48, fontWeight: 900, lineHeight: 1.1, marginBottom: 16, background: "linear-gradient(135deg, #fff 30%, #00d4ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
    heroSub: { fontSize: 18, color: "#94a3b8", maxWidth: 560, margin: "0 auto 40px" },
    statsRow: { display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap", marginBottom: 48 },
    stat: { textAlign: "center" },
    statNum: { fontSize: 36, fontWeight: 800, color: "#00d4ff" },
    statLabel: { fontSize: 13, color: "#64748b", marginTop: 4 },
    ctaBtn: (primary) => ({ padding: "14px 32px", borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: "pointer", transition: "all .2s", fontFamily: "inherit", background: primary ? "linear-gradient(135deg, #0090ff, #00d4ff)" : "transparent", border: primary ? "none" : "1px solid #334155", color: primary ? "#000" : "#94a3b8" }),
    section: { padding: "0 24px 48px", maxWidth: 1200, margin: "0 auto" },
    sectionTitle: { fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 20, paddingTop: 8 },
    companyGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 12 },
    companyCard: (name, active) => ({ background: active ? COMPANY_COLORS[name]?.bg || "#1e2d4a" : "#0f172a", border: `1px solid ${active ? (COMPANY_COLORS[name]?.border || "#0090ff") : "#1e2d4a"}`, borderRadius: 10, padding: "14px 12px", cursor: "pointer", textAlign: "center", transition: "all .2s" }),
    companyName: (name) => ({ fontSize: 13, fontWeight: 600, color: COMPANY_COLORS[name]?.text || "#94a3b8", marginTop: 6 }),
    companyCount: { fontSize: 11, color: "#64748b", marginTop: 2 },
    filterBar: { display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20, alignItems: "center" },
    searchInput: { flex: 1, minWidth: 200, background: "#0f172a", border: "1px solid #1e2d4a", borderRadius: 8, padding: "8px 14px", color: "#e2e8f0", fontSize: 14, fontFamily: "inherit", outline: "none" },
    select: { background: "#0f172a", border: "1px solid #1e2d4a", borderRadius: 8, padding: "8px 12px", color: "#94a3b8", fontSize: 13, fontFamily: "inherit", cursor: "pointer" },
    qList: { display: "flex", flexDirection: "column", gap: 8 },
    qRow: (solved) => ({ background: solved ? "rgba(0,144,255,0.05)" : "#0f172a", border: `1px solid ${solved ? "#0090ff44" : "#1e2d4a"}`, borderRadius: 10, padding: "14px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, transition: "all .2s" }),
    qNum: { fontSize: 13, color: "#64748b", minWidth: 36 },
    qTitle: { flex: 1, fontSize: 15, fontWeight: 600, color: "#e2e8f0" },
    topicTag: (t) => ({ fontSize: 11, padding: "3px 8px", borderRadius: 4, background: "#1e2d4a", color: "#64748b", border: "1px solid #1e3352" }),
    hotBadge: { fontSize: 10, padding: "2px 7px", borderRadius: 4, background: "#ff450020", color: "#ff6b6b", border: "1px solid #ff450040" },
    checkBtn: (solved) => ({ width: 24, height: 24, borderRadius: 6, border: `1px solid ${solved ? "#00d4ff" : "#334155"}`, background: solved ? "#00d4ff22" : "transparent", color: solved ? "#00d4ff" : "#64748b", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }),
    detailWrap: { maxWidth: 1400, margin: "0 auto", padding: "0 24px 60px" },
    detailLayout: { display: "flex", gap: 24, marginTop: 24, alignItems: "flex-start" },
    leftCol: { flex: "1", minWidth: 0, position: "sticky", top: 84 },
    rightCol: { flex: "1", minWidth: 0 },
    backBtn: { background: "transparent", border: "1px solid #1e2d4a", color: "#94a3b8", padding: "8px 16px", borderRadius: 6, cursor: "pointer", fontSize: 13, marginBottom: 20, fontFamily: "inherit" },
    detailHeader: { background: "#0f172a", border: "1px solid #1e2d4a", borderRadius: 12, padding: "24px", marginBottom: 20 },
    detailNum: { fontSize: 13, color: "#64748b" },
    detailTitle: { fontSize: 28, fontWeight: 800, color: "#fff", margin: "4px 0 12px" },
    badge: (color) => ({ display: "inline-block", fontSize: 11, padding: "3px 10px", borderRadius: 20, background: color + "20", color, border: `1px solid ${color}40`, marginRight: 8 }),
    problemBox: { background: "#060b14", border: "1px solid #1e2d4a", borderRadius: 8, padding: 20, marginTop: 16, fontSize: 14, lineHeight: 1.8, color: "#94a3b8", whiteSpace: "pre-wrap", fontFamily: "inherit" },
    tabRow: { display: "flex", gap: 4, marginBottom: 16, borderBottom: "1px solid #1e2d4a", paddingBottom: 0 },
    tabBtn: (active) => ({ background: "transparent", border: "none", borderBottom: active ? "2px solid #00d4ff" : "2px solid transparent", color: active ? "#00d4ff" : "#64748b", padding: "10px 16px", cursor: "pointer", fontSize: 13, fontWeight: active ? 700 : 400, fontFamily: "inherit", transition: "all .2s", marginBottom: -1 }),
    card: { background: "#0f172a", border: "1px solid #1e2d4a", borderRadius: 12, padding: 20, marginBottom: 16 },
    cardTitle: { fontSize: 14, fontWeight: 700, color: "#00d4ff", marginBottom: 10 },
    codeBlock: { background: "#060b14", border: "1px solid #1e3352", borderRadius: 8, padding: 18, fontSize: 13, lineHeight: 1.8, color: "#7dd3fc", whiteSpace: "pre", overflowX: "auto", fontFamily: "'JetBrains Mono', monospace" },
    explainText: { fontSize: 14, color: "#94a3b8", lineHeight: 1.8 },
    highlight: { color: "#fbbf24" },
    complexityRow: { display: "flex", gap: 16, marginTop: 12 },
    complexityBadge: (color) => ({ fontSize: 12, padding: "4px 12px", borderRadius: 6, background: color + "15", color, border: `1px solid ${color}30` }),
    aiBox: { background: "#060b14", border: "1px solid #1e3352", borderRadius: 12, padding: 20, marginTop: 16 },
    aiInput: { width: "100%", background: "#0f172a", border: "1px solid #1e2d4a", borderRadius: 8, padding: "10px 14px", color: "#e2e8f0", fontSize: 14, fontFamily: "inherit", outline: "none", resize: "vertical", minHeight: 60, boxSizing: "border-box" },
    aiSubmit: { marginTop: 10, background: "linear-gradient(135deg,#0090ff,#00d4ff)", border: "none", borderRadius: 8, padding: "10px 24px", color: "#000", fontWeight: 700, cursor: "pointer", fontSize: 14, fontFamily: "inherit" },
    aiResponse: { marginTop: 14, fontSize: 14, color: "#94a3b8", lineHeight: 1.8, whiteSpace: "pre-wrap" },
    progressBar: { height: 4, background: "#1e2d4a", borderRadius: 2, marginTop: 8 },
    progressFill: { height: "100%", background: "linear-gradient(90deg,#0090ff,#00d4ff)", borderRadius: 2, transition: "width .5s" },
    relatedCard: { background: "#060b14", border: "1px solid #1e3352", borderRadius: 12, padding: 20 },
    relatedTitle: { fontSize: 16, fontWeight: 700, color: "#fbbf24", marginBottom: 8 },
  };

  const progress = Math.round((solvedSet.size / QUESTIONS.length) * 100);

  // ── HOME PAGE ──
  if (view === "home") return (
    <div style={styles.app}>
      <nav style={styles.nav}>
        <span style={styles.logo}>⚡ PyLeet</span>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={styles.navBtn(false)} onClick={() => setView("list")}>Problems</button>
          <button style={styles.navBtn(false)} onClick={() => setView("companies")}>Companies</button>
          <button style={styles.navBtn(false)} onClick={() => setView("settings")}>AI Config</button>
        </div>
      </nav>
      <div style={styles.hero}>
        <div style={{ fontSize: 13, color: "#0090ff", marginBottom: 16, letterSpacing: 3, textTransform: "uppercase" }}>LeetCode Easy · Python · 2024</div>
        <h1 style={styles.heroTitle}>Master Every<br />Easy Problem</h1>
        <p style={styles.heroSub}>Complete solutions, deep explanations, AI tutor, company-wise filters — everything you need to crack your next interview.</p>
        <div style={styles.statsRow}>
          <div style={styles.stat}><div style={styles.statNum}>{QUESTIONS.length}+</div><div style={styles.statLabel}>Problems Covered</div></div>
          <div style={styles.stat}><div style={styles.statNum}>{COMPANY_LIST.length}</div><div style={styles.statLabel}>Companies</div></div>
          <div style={styles.stat}><div style={styles.statNum}>{TOPICS.length}</div><div style={styles.statLabel}>Topics</div></div>
          <div style={styles.stat}><div style={styles.statNum}>Python</div><div style={styles.statLabel}>Language</div></div>
        </div>
        {solvedSet.size > 0 && (
          <div style={{ maxWidth: 320, margin: "0 auto 32px", background: "#0f172a", border: "1px solid #1e2d4a", borderRadius: 12, padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: "#94a3b8" }}>Your Progress</span>
              <span style={{ fontSize: 13, color: "#00d4ff", fontWeight: 700 }}>{solvedSet.size}/{QUESTIONS.length} solved ({progress}%)</span>
            </div>
            <div style={styles.progressBar}><div style={{ ...styles.progressFill, width: `${progress}%` }} /></div>
          </div>
        )}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button style={styles.ctaBtn(true)} onClick={() => setView("list")}>Start Solving →</button>
          <button style={styles.ctaBtn(false)} onClick={() => setView("companies")}>Browse by Company</button>
        </div>
      </div>
      <div style={styles.section}>
        <div style={styles.sectionTitle}>🔥 Most Asked Problems</div>
        <div style={styles.qList}>
          {QUESTIONS.filter(q => q.mostAsked).slice(0, 6).map(q => (
            <div key={q.id} style={styles.qRow(solvedSet.has(q.id))} onClick={() => { setSelectedQ(q); setTab("solution"); setAiAnswer(""); setView("detail"); }}>
              <button style={styles.checkBtn(solvedSet.has(q.id))} onClick={e => { e.stopPropagation(); toggleSolved(q.id); }}>✓</button>
              <span style={styles.qNum}>#{q.num}</span>
              <span style={styles.qTitle}>{q.title}</span>
              <span style={styles.hotBadge}>🔥 {(q.askCount/1000).toFixed(1)}k</span>
              {q.topic.slice(0,2).map(t => <span key={t} style={styles.topicTag(t)}>{t}</span>)}
            </div>
          ))}
        </div>
        <button style={{ ...styles.ctaBtn(false), marginTop: 16, fontSize: 14, padding: "10px 24px" }} onClick={() => setView("list")}>View All {QUESTIONS.length}+ Problems →</button>
      </div>
      <div style={styles.section}>
        <div style={styles.sectionTitle}>🏢 Top Companies</div>
        <div style={styles.companyGrid}>
          {COMPANY_LIST.slice(0, 8).map(c => (
            <div key={c} style={styles.companyCard(c, false)} onClick={() => { setSelectedCompany(c); setView("list"); }}>
              <div style={{ fontSize: 24 }}>{COMPANY_COLORS[c]?.logo}</div>
              <div style={styles.companyName(c)}>{c}</div>
              <div style={styles.companyCount}>{QUESTIONS.filter(q => (COMPANIES[c]||[]).includes(q.num)).length} problems</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── COMPANIES PAGE ──
  if (view === "companies") return (
    <div style={styles.app}>
      <nav style={styles.nav}>
        <span style={styles.logo} onClick={() => setView("home")}>⚡ PyLeet</span>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={styles.navBtn(false)} onClick={() => setView("list")}>Problems</button>
          <button style={styles.navBtn(true)}>Companies</button>
          <button style={styles.navBtn(false)} onClick={() => setView("settings")}>AI Config</button>
        </div>
      </nav>
      <div style={styles.section}>
        <div style={{ paddingTop: 32 }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Companies</h2>
          <p style={{ color: "#64748b", marginBottom: 32 }}>Click a company to see which Easy problems they ask most.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
            {COMPANY_LIST.map(c => {
              const count = QUESTIONS.filter(q => (COMPANIES[c]||[]).includes(q.num)).length;
              return (
                <div key={c} style={{ ...styles.companyCard(c, false), textAlign: "left", padding: 20 }} onClick={() => { setSelectedCompany(c); setView("list"); }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>{COMPANY_COLORS[c]?.logo}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: COMPANY_COLORS[c]?.text || "#fff", marginBottom: 4 }}>{c}</div>
                  <div style={{ fontSize: 13, color: "#64748b", marginBottom: 12 }}>{count} Easy questions</div>
                  <div style={{ height: 3, background: "#1e2d4a", borderRadius: 2 }}>
                    <div style={{ height: "100%", width: `${(count / QUESTIONS.length * 100)}%`, background: COMPANY_COLORS[c]?.border || "#0090ff", borderRadius: 2 }} />
                  </div>
                  <div style={{ marginTop: 12, fontSize: 12, color: COMPANY_COLORS[c]?.text || "#0090ff", fontWeight: 600 }}>View Questions →</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  // ── PROBLEM LIST ──
  if (view === "list") return (
    <div style={styles.app}>
      <nav style={styles.nav}>
        <span style={styles.logo} onClick={() => { setSelectedCompany(null); setView("home"); }}>⚡ PyLeet</span>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={styles.navBtn(true)}>Problems</button>
          <button style={styles.navBtn(false)} onClick={() => setView("companies")}>Companies</button>
          <button style={styles.navBtn(false)} onClick={() => setView("settings")}>AI Config</button>
        </div>
      </nav>
      <div style={styles.section}>
        <div style={{ paddingTop: 24 }}>
          {selectedCompany && (
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ fontSize: 28 }}>{COMPANY_COLORS[selectedCompany]?.logo}</div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, color: COMPANY_COLORS[selectedCompany]?.text || "#fff" }}>{selectedCompany}</div>
                <div style={{ fontSize: 13, color: "#64748b" }}>Easy questions asked by {selectedCompany}</div>
              </div>
              <button style={{ marginLeft: "auto", ...styles.navBtn(false) }} onClick={() => setSelectedCompany(null)}>✕ Clear Filter</button>
            </div>
          )}
          {solvedSet.size > 0 && (
            <div style={{ marginBottom: 20, background: "#0f172a", border: "1px solid #1e2d4a", borderRadius: 10, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 13, color: "#64748b" }}>Progress:</span>
              <span style={{ fontSize: 13, color: "#00d4ff", fontWeight: 700 }}>{solvedSet.size}/{QUESTIONS.length} solved</span>
              <div style={{ flex: 1, ...styles.progressBar, marginTop: 0 }}><div style={{ ...styles.progressFill, width: `${progress}%` }} /></div>
              <span style={{ fontSize: 12, color: "#64748b" }}>{progress}%</span>
            </div>
          )}
          <div style={styles.filterBar}>
            <input style={styles.searchInput} placeholder="🔍 Search by title or number..." value={filter.search} onChange={e => setFilter(f => ({ ...f, search: e.target.value }))} />
            <select style={styles.select} value={filter.topic} onChange={e => setFilter(f => ({ ...f, topic: e.target.value }))}>
              <option>All</option>
              {TOPICS.map(t => <option key={t}>{t}</option>)}
            </select>
            <select style={styles.select} value={filter.sort} onChange={e => setFilter(f => ({ ...f, sort: e.target.value }))}>
              <option value="mostAsked">Most Asked</option>
              <option value="number">By Number</option>
            </select>
          </div>
          <div style={{ fontSize: 13, color: "#64748b", marginBottom: 12 }}>{filteredQuestions.length} problems</div>
          <div style={styles.qList}>
            {filteredQuestions.map(q => (
              <div key={q.id} style={styles.qRow(solvedSet.has(q.id))} onClick={() => { setSelectedQ(q); setTab("solution"); setAiAnswer(""); setView("detail"); }}>
                <button style={styles.checkBtn(solvedSet.has(q.id))} onClick={e => { e.stopPropagation(); toggleSolved(q.id); }}>✓</button>
                <span style={styles.qNum}>#{q.num}</span>
                <span style={styles.qTitle}>{q.title}</span>
                {q.mostAsked && <span style={styles.hotBadge}>🔥</span>}
                <span style={{ fontSize: 12, color: "#64748b" }}>{(q.askCount/1000).toFixed(1)}k</span>
                {q.topic.slice(0,2).map(t => <span key={t} style={styles.topicTag(t)}>{t}</span>)}
                <span style={{ fontSize: 18, color: "#334155" }}>›</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // ── DETAIL PAGE ──
  if (view === "detail" && selectedQ) {
    const q = selectedQ;
    return (
      <div style={styles.app}>
        <nav style={styles.nav}>
          <span style={styles.logo} onClick={() => { setSelectedCompany(null); setView("home"); }}>⚡ PyLeet</span>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={styles.navBtn(false)} onClick={() => setView("list")}>Problems</button>
            <button style={styles.navBtn(false)} onClick={() => setView("companies")}>Companies</button>
            <button style={styles.navBtn(false)} onClick={() => setView("settings")}>AI Config</button>
          </div>
        </nav>
        <div style={styles.detailWrap}>
          <div style={{ paddingTop: 24 }}>
            <button style={styles.backBtn} onClick={() => setView("list")}>← Back to Problems</button>
            <div style={styles.detailLayout}>
              <div style={styles.leftCol}>
                <div style={styles.detailHeader}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                    <div>
                      <div style={styles.detailNum}>Problem #{q.num}</div>
                      <h1 style={styles.detailTitle}>{q.title}</h1>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
                        <span style={styles.badge("#22c55e")}>Easy</span>
                        {q.mostAsked && <span style={styles.badge("#ef4444")}>🔥 Most Asked</span>}
                        {q.topic.map(t => <span key={t} style={styles.badge("#0090ff")}>{t}</span>)}
                        <span style={{ fontSize: 12, color: "#64748b", marginLeft: 4 }}>~{(q.askCount / 1000).toFixed(1)}k asks</span>
                      </div>
                    </div>
                    <button style={{ ...styles.checkBtn(solvedSet.has(q.id)), width: "auto", padding: "8px 16px", fontSize: 13 }} onClick={() => toggleSolved(q.id)}>
                      {solvedSet.has(q.id) ? "✓ Solved" : "Mark Solved"}
                    </button>
                  </div>
                  <div style={styles.problemBox}>{q.problem}</div>
                </div>
              </div>

              <div style={styles.rightCol}>
                <div style={styles.card}>
                  <div style={styles.cardTitle}>🐍 Python Solution</div>
                  <div style={styles.codeBlock}>{q.solution}</div>
                  <div style={styles.complexityRow}>
                    <span style={styles.complexityBadge("#22c55e")}>⏱ Time: {q.timeComplexity}</span>
                    <span style={styles.complexityBadge("#0090ff")}>💾 Space: {q.spaceComplexity}</span>
                  </div>
                </div>

                <div style={styles.tabRow}>
                  {["explain", "related", "ai"].map(t => (
                    <button key={t} style={styles.tabBtn(tab === t)} onClick={() => setTab(t)}>
                      {t === "explain" ? "📚 Deep Dive" : t === "related" ? "🔗 Related" : "🤖 Ask AI"}
                    </button>
                  ))}
                </div>

                {tab === "explain" && (
                  <div>
                    <div style={styles.card}>
                      <div style={styles.cardTitle}>💡 Why This Approach?</div>
                      <p style={styles.explainText}>{q.whyMethod}</p>
                    </div>
                    <div style={styles.card}>
                      <div style={styles.cardTitle}>🔄 How It Works (Step by Step)</div>
                      <p style={styles.explainText}>{q.howMethod}</p>
                    </div>
                    <div style={styles.card}>
                      <div style={styles.cardTitle}>❓ Why Use This Function/Method?</div>
                      <p style={styles.explainText}>{q.whyFunction}</p>
                    </div>
                    <div style={styles.card}>
                      <div style={styles.cardTitle}>⚙️ How Does This Function Work?</div>
                      <p style={styles.explainText}>{q.howFunction}</p>
                    </div>
                    <div style={styles.card}>
                      <div style={styles.cardTitle}>📊 Complexity Analysis</div>
                      <p style={styles.explainText}>
                        <span style={styles.highlight}>Time Complexity: {q.timeComplexity}</span> — {q.timeComplexity === "O(1)" ? "Constant time, fastest possible!" : q.timeComplexity === "O(n)" ? "Linear time — we visit each element once." : q.timeComplexity === "O(log n)" ? "Logarithmic time — we halve the search space each step." : "Polynomial time — multiple passes through the data."}<br /><br />
                        <span style={styles.highlight}>Space Complexity: {q.spaceComplexity}</span> — {q.spaceComplexity.includes("1") ? "Constant space — no extra memory proportional to input." : "Extra memory used proportional to input size."}
                      </p>
                    </div>
                  </div>
                )}

                {tab === "related" && q.relatedQ && (
                  <div>
                    <div style={styles.relatedCard}>
                      <div style={styles.relatedTitle}>🔗 {q.relatedQ.title}</div>
                      <div style={{ fontSize: 13, color: "#64748b", marginBottom: 16, lineHeight: 1.7 }}>{q.relatedQ.problem}</div>
                      <div style={styles.cardTitle}>Solution:</div>
                      <div style={styles.codeBlock}>{q.relatedQ.solution}</div>
                      <div style={{ marginTop: 14 }}>
                        <div style={styles.cardTitle}>💡 Why is this related?</div>
                        <p style={styles.explainText}>{q.relatedQ.why}</p>
                      </div>
                    </div>
                  </div>
                )}

                {tab === "ai" && (
                  <div>
                    <div style={styles.aiBox}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "#00d4ff", marginBottom: 8 }}>🤖 Ask AI Tutor</div>
                      <div style={{ fontSize: 13, color: "#64748b", marginBottom: 12 }}>Got stuck? Ask anything about this problem in plain English!</div>
                      <textarea style={styles.aiInput} placeholder="e.g. Why do we use a dictionary here? What is XOR? Can you give me another example?" value={userQuestion} onChange={e => setUserQuestion(e.target.value)} />
                      <button style={{ ...styles.aiSubmit, opacity: aiLoading ? 0.6 : 1 }} onClick={() => { if (userQuestion.trim()) askAI(userQuestion); }} disabled={aiLoading}>
                        {aiLoading ? "Thinking..." : "Ask →"}
                      </button>
                      {aiAnswer && <div style={styles.aiResponse}>{aiAnswer}</div>}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── SETTINGS PAGE ──
  if (view === "settings") return (
    <div style={styles.app}>
      <nav style={styles.nav}>
        <span style={styles.logo} onClick={() => setView("home")}>⚡ PyLeet</span>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={styles.navBtn(false)} onClick={() => setView("list")}>Problems</button>
          <button style={styles.navBtn(false)} onClick={() => setView("companies")}>Companies</button>
          <button style={styles.navBtn(true)}>AI Config</button>
        </div>
      </nav>
      <div style={styles.section}>
        <div style={{ paddingTop: 60, maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: "#fff", marginBottom: 12 }}>AI Configuration</h2>
          <p style={{ color: "#94a3b8", marginBottom: 32, lineHeight: 1.6 }}>PyLeet uses Google Gemini AI to provide real-time mentoring. Add your free API key from Google AI Studio to enable the 'Ask AI' features.</p>
          
          <div style={styles.card}>
            <div style={{ ...styles.cardTitle, marginBottom: 16 }}>Google Gemini API Key</div>
            <input 
              type="password" 
              style={{ ...styles.aiInput, minHeight: "auto", marginBottom: 16 }} 
              placeholder="Paste your API key here..." 
              value={apiKey} 
              onChange={e => {
                const val = e.target.value;
                setApiKey(val);
                localStorage.setItem("gemini_api_key", val);
              }}
            />
            <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#060b14", padding: 12, borderRadius: 8, border: "1px solid #1e3352" }}>
              <span style={{ fontSize: 20 }}>💡</span>
              <span style={{ fontSize: 13, color: "#64748b" }}>
                Don't have a key? Get one for free at <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" style={{ color: "#00d4ff", textDecoration: "none" }}>Google AI Studio</a>.
              </span>
            </div>
          </div>
          
          <div style={{ marginTop: 24, textAlign: "center" }}>
            <button style={styles.ctaBtn(true)} onClick={() => setView("list")}>Go Content Exploring →</button>
          </div>
        </div>
      </div>
    </div>
  );

  return <div style={styles.app}><div style={{ padding: 40, textAlign: "center", color: "#94a3b8" }}>Loading...</div></div>;
}

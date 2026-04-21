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
    problem: `Given an array of integers 'nums' and an integer 'target', return the indices of the two numbers that add up to the target.\n\nEach input has exactly one solution, and you may not use the same element twice.\n\nExample:\nInput: nums = [2, 7, 11, 15], target = 9\nOutput: [0, 1]\nExplanation: nums[0] + nums[1] = 2 + 7 = 9`,
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
    problem: `Given an integer x, return true if x is a palindrome (reads same forward and backward).\n\nExample:\nInput: x = 121 → Output: true\nInput: x = -121 → Output: false (negative numbers are not palindromes)\nInput: x = 10 → Output: false`,
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
    problem: `Given a string containing '(', ')', '{', '}', '[', ']', determine if the input string is valid.\n\nRules:\n1. Open brackets must be closed by the same type.\n2. Open brackets must be closed in the correct order.\n\nExample:\n"()" → true\n"()[]{}" → true\n"(]" → false\n"([)]" → false`,
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
    problem: `Merge two sorted linked lists and return it as a sorted list.\n\nExample:\nInput: l1 = [1,2,4], l2 = [1,3,4]\nOutput: [1,1,2,3,4,4]`,
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
    problem: `Given a sorted array nums, remove duplicates in-place. Return k (number of unique elements).\n\nExample:\nInput: nums = [1,1,2]\nOutput: 2, nums = [1,2,_]\n\nInput: nums = [0,0,1,1,1,2,2,3,3,4]\nOutput: 5, nums = [0,1,2,3,4,_,_,_,_,_]`,
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
    problem: `Given a sorted array and a target, return the index if found, or where it would be inserted.\n\nExample:\nInput: nums=[1,3,5,6], target=5 → Output: 2\nInput: nums=[1,3,5,6], target=2 → Output: 1\nInput: nums=[1,3,5,6], target=7 → Output: 4`,
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
    problem: `Given a string s of words and spaces, return the length of the last word.\n\nExample:\nInput: s = "Hello World" → Output: 5\nInput: s = "   fly me   to   the moon  " → Output: 4\nInput: s = "luffy is still joyboy" → Output: 6`,
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
    problem: `Given a large integer represented as array of digits, increment by one and return the result.\n\nExample:\nInput: digits = [1,2,3] → Output: [1,2,4]\nInput: digits = [1,2,9] → Output: [1,3,0]\nInput: digits = [9,9,9] → Output: [1,0,0,0]`,
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
    problem: `Given head of a sorted linked list, delete all duplicates so each element appears only once.\n\nExample:\nInput: 1→1→2 → Output: 1→2\nInput: 1→1→2→3→3 → Output: 1→2→3`,
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
    problem: `Merge two sorted arrays nums1 and nums2 into nums1 in-place.\nnums1 has length m+n (extra zeros at end for nums2).\n\nExample:\nInput: nums1=[1,2,3,0,0,0], m=3, nums2=[2,5,6], n=3\nOutput: [1,2,2,3,5,6]`,
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
    problem: `Given roots of two binary trees p and q, check if they are the same.\n\nTwo trees are the same if they have the same structure AND the same node values.\n\nExample:\nInput: p=[1,2,3], q=[1,2,3] → Output: true\nInput: p=[1,2], q=[1,null,2] → Output: false`,
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
    problem: `Given root of a binary tree, return its maximum depth (number of nodes along the longest path from root to a leaf).\n\nExample:\nInput: root = [3,9,20,null,null,15,7]\nOutput: 3`,
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
    problem: `Given prices array where prices[i] is stock price on day i, find the maximum profit from one buy-sell transaction.\n\nExample:\nInput: prices = [7,1,5,3,6,4]\nOutput: 5 (buy at 1, sell at 6)\n\nInput: prices = [7,6,4,3,1]\nOutput: 0 (no profit possible)`,
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
    problem: `Given an array where every element appears twice except for one. Find that single element.\n\nConstraint: O(n) time, O(1) space.\n\nExample:\nInput: [2,2,1] → Output: 1\nInput: [4,1,2,1,2] → Output: 4`,
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
    problem: `Design a stack that supports push, pop, top, and retrieving the minimum element in O(1).\n\nOperations:\n- push(val)\n- pop()\n- top() → top element\n- getMin() → minimum element in stack`,
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
    problem: `Find the node where two singly linked lists intersect. Return null if no intersection.\n\nExample:\nA: a1→a2→c1→c2→c3\nB: b1→b2→b3→c1→c2→c3\nOutput: Node c1`,
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
    problem: `Find the majority element (appears more than n/2 times) in an array.\n\nExample:\nInput: [3,2,3] → Output: 3\nInput: [2,2,1,1,1,2,2] → Output: 2`,
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
    problem: `Reverse a singly linked list.\n\nExample:\nInput: 1→2→3→4→5→null\nOutput: 5→4→3→2→1→null`,
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
    problem: `Given an integer array nums, return true if any value appears at least twice.\n\nExample:\nInput: [1,2,3,1] → Output: true\nInput: [1,2,3,4] → Output: false`,
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
    problem: `Given two strings s and t, return true if t is an anagram of s (same characters, same frequency).\n\nExample:\nInput: s="anagram", t="nagaram" → Output: true\nInput: s="rat", t="car" → Output: false`,
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
    problem: `Given array nums containing n distinct numbers from [0, n], return the only missing number.\n\nExample:\nInput: [3,0,1] → Output: 2\nInput: [9,6,4,2,3,5,7,0,1] → Output: 8`,
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
    problem: `Given array nums, move all 0s to the end while maintaining the relative order of non-zero elements. Must do it in-place.\n\nExample:\nInput: [0,1,0,3,12] → Output: [1,3,12,0,0]`,
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
    problem: `Reverse a string in-place. Input is a list of characters.\n\nExample:\nInput: ['h','e','l','l','o'] → Output: ['o','l','l','e','h']`,
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
    problem: `Find intersection of two arrays. Each element in result should appear as many times as it shows in both arrays.\n\nExample:\nInput: nums1=[1,2,2,1], nums2=[2,2] → Output: [2,2]\nInput: nums1=[4,9,5], nums2=[9,4,9,8,4] → Output: [4,9]`,
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
    problem: `For integers 1 to n:\n- "FizzBuzz" if divisible by 3 AND 5\n- "Fizz" if divisible by 3\n- "Buzz" if divisible by 5\n- The number itself otherwise\n\nExample:\nInput: n=15\nOutput: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]`,
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
    problem: `Given array nums of n integers where nums[i] is in [1,n], find all integers in [1,n] that don't appear in nums.\n\nExample:\nInput: [4,3,2,7,8,2,3,1] → Output: [5,6]`,
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
    problem: `F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2) for n>1.\nReturn F(n).\n\nExample:\nF(4) = F(3)+F(2) = 3`,
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
    problem: `Given sorted array of distinct integers and a target, return the index if found, or -1 if not.\n\nExample:\nInput: nums=[-1,0,3,5,9,12], target=9 → Output: 4\nInput: nums=[-1,0,3,5,9,12], target=2 → Output: -1`,
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
    problem: `Find the middle node of a linked list.\n\nExample:\nInput: 1→2→3→4→5 → Output: Node 3\nInput: 1→2→3→4→5→6 → Output: Node 4 (second middle)`,
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
    problem: `Given sorted array of integers, return sorted array of squares of each number.\n\nExample:\nInput: [-4,-1,0,3,10] → Output: [0,1,9,16,100]\nInput: [-7,-3,2,3,11] → Output: [4,9,9,49,121]`,
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
  const [tab, setTab] = useState("solution"); // solution | related | explain
  const [aiLoading, setAiLoading] = useState(false);
  const [aiAnswer, setAiAnswer] = useState("");
  const [userQuestion, setUserQuestion] = useState("");
  const [solvedSet, setSolvedSet] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem("solved") || "[]")); }
    catch { return new Set(); }
  });

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
    setAiLoading(true);
    setAiAnswer("");
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: `You are a helpful coding mentor for a beginner Python learner. Explain in simple, friendly language. Question context: "${selectedQ?.title}" - ${selectedQ?.problem}\n\nUser question: ${prompt}` }]
        })
      });
      const data = await r.json();
      setAiAnswer(data.content?.[0]?.text || "Sorry, couldn't get an answer.");
    } catch { setAiAnswer("Error fetching answer. Please try again."); }
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
    detailWrap: { maxWidth: 900, margin: "0 auto", padding: "0 24px 60px" },
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
          </div>
        </nav>
        <div style={styles.detailWrap}>
          <div style={{ paddingTop: 24 }}>
            <button style={styles.backBtn} onClick={() => setView("list")}>← Back to Problems</button>
            <div style={styles.detailHeader}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <div style={styles.detailNum}>Problem #{q.num}</div>
                  <h1 style={styles.detailTitle}>{q.title}</h1>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
                    <span style={styles.badge("#22c55e")}>Easy</span>
                    {q.mostAsked && <span style={styles.badge("#ef4444")}>🔥 Most Asked</span>}
                    {q.topic.map(t => <span key={t} style={styles.badge("#0090ff")}>{t}</span>)}
                    <span style={{ fontSize: 12, color: "#64748b", marginLeft: 4 }}>~{(q.askCount/1000).toFixed(1)}k asks</span>
                  </div>
                </div>
                <button style={{ ...styles.checkBtn(solvedSet.has(q.id)), width: "auto", padding: "8px 16px", fontSize: 13 }} onClick={() => toggleSolved(q.id)}>
                  {solvedSet.has(q.id) ? "✓ Solved" : "Mark Solved"}
                </button>
              </div>
              <div style={styles.problemBox}>{q.problem}</div>
            </div>

            <div style={styles.tabRow}>
              {["solution", "explain", "related", "ai"].map(t => (
                <button key={t} style={styles.tabBtn(tab === t)} onClick={() => setTab(t)}>
                  {t === "solution" ? "💻 Solution" : t === "explain" ? "📚 Deep Dive" : t === "related" ? "🔗 Related" : "🤖 Ask AI"}
                </button>
              ))}
            </div>

            {tab === "solution" && (
              <div>
                <div style={styles.card}>
                  <div style={styles.cardTitle}>🐍 Python Solution</div>
                  <div style={styles.codeBlock}>{q.solution}</div>
                  <div style={styles.complexityRow}>
                    <span style={styles.complexityBadge("#22c55e")}>⏱ Time: {q.timeComplexity}</span>
                    <span style={styles.complexityBadge("#0090ff")}>💾 Space: {q.spaceComplexity}</span>
                  </div>
                </div>
                <div style={styles.card}>
                  <div style={styles.cardTitle}>💡 Why This Approach?</div>
                  <p style={styles.explainText}>{q.whyMethod}</p>
                </div>
                <div style={styles.card}>
                  <div style={styles.cardTitle}>🔄 How It Works (Step by Step)</div>
                  <p style={styles.explainText}>{q.howMethod}</p>
                </div>
              </div>
            )}

            {tab === "explain" && (
              <div>
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
                    <span style={styles.highlight}>Time Complexity: {q.timeComplexity}</span> — {q.timeComplexity === "O(1)" ? "Constant time, fastest possible!" : q.timeComplexity === "O(n)" ? "Linear time — we visit each element once." : q.timeComplexity === "O(log n)" ? "Logarithmic time — we halve the search space each step." : "Polynomial time — multiple passes through the data."}<br/><br/>
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
    );
  }

  return <div style={styles.app}><div style={{ padding: 40, textAlign: "center", color: "#94a3b8" }}>Loading...</div></div>;
}

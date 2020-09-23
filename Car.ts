const order = ["point", "circle", "line", "rectangle"],
    mapClasses = {
        "vector": vector,
        "point": point,
        "line": line,
        "circle": circle,
        "rectangle": rectangle,
        "car": car
    }, carColors = {
        "red": "carRed.png",
        "blue": "carBlue.png",
        "cyan": "carCyan.png",
        "green": "carGreen.png",
        "orange": "carOrange.png",
        "purple": "carPurple.png",
        "yellow": "carYellow.png",
    }, triggerfunctions = {
        increaseCounter: (counter, amount = 1) => {

        }, endGame: () => {

        }
    };
var canvas = document.getElementById("canvas") as HTMLCanvasElement,
    [fw1, bw1, tl1, tr1, fw2, bw2, tl2, tr2, fw3, bw3, tl3, tr3] = (new Array(12) as any).fill(false);
let context = canvas.getContext("2d"),
    height = window.innerHeight,
    width = window.innerWidth,
    menu = document.getElementById("menu") as HTMLDivElement,
    fireImg = new Image(),
    Cars: Array<car> = [],
    objectsToDraw: Array<element> = [],
    elementToMove: element,
    lineEndToMove: point,
    selectedElement: element,
    clickMouseX: number,
    clickMouseY: number,
    oldMouseX = 0,
    oldMouseY = 0,
    startingFunction = demo,
    rainbow = "text-shadow: -1px -1px hsl(0,100%,50%), 1px 1px hsl(5.4, 100%, 50%), 3px 2px hsl(10.8, 100%, 50%), 5px 3px hsl(16.2, 100%, 50%), 7px 4px hsl(21.6, 100%, 50%), 9px 5px hsl(27, 100%, 50%), 11px 6px hsl(32.4, 100%, 50%), 13px 7px hsl(37.8, 100%, 50%), 14px 8px hsl(43.2, 100%, 50%), 16px 9px hsl(48.6, 100%, 50%), 18px 10px hsl(54, 100%, 50%), 20px 11px hsl(59.4, 100%, 50%), 22px 12px hsl(64.8, 100%, 50%), 23px 13px hsl(70.2, 100%, 50%), 25px 14px hsl(75.6, 100%, 50%), 27px 15px hsl(81, 100%, 50%), 28px 16px hsl(86.4, 100%, 50%), 30px 17px hsl(91.8, 100%, 50%), 32px 18px hsl(97.2, 100%, 50%), 33px 19px hsl(102.6, 100%, 50%), 35px 20px hsl(108, 100%, 50%), 36px 21px hsl(113.4, 100%, 50%), 38px 22px hsl(118.8, 100%, 50%), 39px 23px hsl(124.2, 100%, 50%), 41px 24px hsl(129.6, 100%, 50%), 42px 25px hsl(135, 100%, 50%), 43px 26px hsl(140.4, 100%, 50%), 45px 27px hsl(145.8, 100%, 50%), 46px 28px hsl(151.2, 100%, 50%), 47px 29px hsl(156.6, 100%, 50%), 48px 30px hsl(162, 100%, 50%), 49px 31px hsl(167.4, 100%, 50%), 50px 32px hsl(172.8, 100%, 50%), 51px 33px hsl(178.2, 100%, 50%), 52px 34px hsl(183.6, 100%, 50%), 53px 35px hsl(189, 100%, 50%), 54px 36px hsl(194.4, 100%, 50%), 55px 37px hsl(199.8, 100%, 50%), 55px 38px hsl(205.2, 100%, 50%), 56px 39px hsl(210.6, 100%, 50%), 57px 40px hsl(216, 100%, 50%), 57px 41px hsl(221.4, 100%, 50%), 58px 42px hsl(226.8, 100%, 50%), 58px 43px hsl(232.2, 100%, 50%), 58px 44px hsl(237.6, 100%, 50%), 59px 45px hsl(243, 100%, 50%), 59px 46px hsl(248.4, 100%, 50%), 59px 47px hsl(253.8, 100%, 50%), 59px 48px hsl(259.2, 100%, 50%), 59px 49px hsl(264.6, 100%, 50%), 60px 50px hsl(270, 100%, 50%), 59px 51px hsl(275.4, 100%, 50%), 59px 52px hsl(280.8, 100%, 50%), 59px 53px hsl(286.2, 100%, 50%), 59px 54px hsl(291.6, 100%, 50%), 59px 55px hsl(297, 100%, 50%), 58px 56px hsl(302.4, 100%, 50%), 58px 57px hsl(307.8, 100%, 50%), 58px 58px hsl(313.2, 100%, 50%), 57px 59px hsl(318.6, 100%, 50%), 57px 60px hsl(324, 100%, 50%), 56px 61px hsl(329.4, 100%, 50%), 55px 62px hsl(334.8, 100%, 50%), 55px 63px hsl(340.2, 100%, 50%), 54px 64px hsl(345.6, 100%, 50%), 53px 65px hsl(351, 100%, 50%), 52px 66px hsl(356.4, 100%, 50%), 51px 67px hsl(361.8, 100%, 50%), 50px 68px hsl(367.2, 100%, 50%), 49px 69px hsl(372.6, 100%, 50%), 48px 70px hsl(378, 100%, 50%), 47px 71px hsl(383.4, 100%, 50%), 46px 72px hsl(388.8, 100%, 50%), 45px 73px hsl(394.2, 100%, 50%), 43px 74px hsl(399.6, 100%, 50%), 42px 75px hsl(405, 100%, 50%), 41px 76px hsl(410.4, 100%, 50%), 39px 77px hsl(415.8, 100%, 50%), 38px 78px hsl(421.2, 100%, 50%), 36px 79px hsl(426.6, 100%, 50%), 35px 80px hsl(432, 100%, 50%), 33px 81px hsl(437.4, 100%, 50%), 32px 82px hsl(442.8, 100%, 50%), 30px 83px hsl(448.2, 100%, 50%), 28px 84px hsl(453.6, 100%, 50%), 27px 85px hsl(459, 100%, 50%), 25px 86px hsl(464.4, 100%, 50%), 23px 87px hsl(469.8, 100%, 50%), 22px 88px hsl(475.2, 100%, 50%), 20px 89px hsl(480.6, 100%, 50%), 18px 90px hsl(486, 100%, 50%), 16px 91px hsl(491.4, 100%, 50%), 14px 92px hsl(496.8, 100%, 50%), 13px 93px hsl(502.2, 100%, 50%), 11px 94px hsl(507.6, 100%, 50%), 9px 95px hsl(513, 100%, 50%), 7px 96px hsl(518.4, 100%, 50%), 5px 97px hsl(523.8, 100%, 50%), 3px 98px hsl(529.2, 100%, 50%), 1px 99px hsl(534.6, 100%, 50%), 7px 100px hsl(540, 100%, 50%), -1px 101px hsl(545.4, 100%, 50%), -3px 102px hsl(550.8, 100%, 50%), -5px 103px hsl(556.2, 100%, 50%), -7px 104px hsl(561.6, 100%, 50%), -9px 105px hsl(567, 100%, 50%), -11px 106px hsl(572.4, 100%, 50%), -13px 107px hsl(577.8, 100%, 50%), -14px 108px hsl(583.2, 100%, 50%), -16px 109px hsl(588.6, 100%, 50%), -18px 110px hsl(594, 100%, 50%), -20px 111px hsl(599.4, 100%, 50%), -22px 112px hsl(604.8, 100%, 50%), -23px 113px hsl(610.2, 100%, 50%), -25px 114px hsl(615.6, 100%, 50%), -27px 115px hsl(621, 100%, 50%), -28px 116px hsl(626.4, 100%, 50%), -30px 117px hsl(631.8, 100%, 50%), -32px 118px hsl(637.2, 100%, 50%), -33px 119px hsl(642.6, 100%, 50%), -35px 120px hsl(648, 100%, 50%), -36px 121px hsl(653.4, 100%, 50%), -38px 122px hsl(658.8, 100%, 50%), -39px 123px hsl(664.2, 100%, 50%), -41px 124px hsl(669.6, 100%, 50%), -42px 125px hsl(675, 100%, 50%), -43px 126px hsl(680.4, 100%, 50%), -45px 127px hsl(685.8, 100%, 50%), -46px 128px hsl(691.2, 100%, 50%), -47px 129px hsl(696.6, 100%, 50%), -48px 130px hsl(702, 100%, 50%), -49px 131px hsl(707.4, 100%, 50%), -50px 132px hsl(712.8, 100%, 50%), -51px 133px hsl(718.2, 100%, 50%), -52px 134px hsl(723.6, 100%, 50%), -53px 135px hsl(729, 100%, 50%), -54px 136px hsl(734.4, 100%, 50%), -55px 137px hsl(739.8, 100%, 50%), -55px 138px hsl(745.2, 100%, 50%), -56px 139px hsl(750.6, 100%, 50%), -57px 140px hsl(756, 100%, 50%), -57px 141px hsl(761.4, 100%, 50%), -58px 142px hsl(766.8, 100%, 50%), -58px 143px hsl(772.2, 100%, 50%), -58px 144px hsl(777.6, 100%, 50%), -59px 145px hsl(783, 100%, 50%), -59px 146px hsl(788.4, 100%, 50%), -59px 147px hsl(793.8, 100%, 50%), -59px 148px hsl(799.2, 100%, 50%), -59px 149px hsl(804.6, 100%, 50%), -60px 150px hsl(810, 100%, 50%), -59px 151px hsl(815.4, 100%, 50%), -59px 152px hsl(820.8, 100%, 50%), -59px 153px hsl(826.2, 100%, 50%), -59px 154px hsl(831.6, 100%, 50%), -59px 155px hsl(837, 100%, 50%), -58px 156px hsl(842.4, 100%, 50%), -58px 157px hsl(847.8, 100%, 50%), -58px 158px hsl(853.2, 100%, 50%), -57px 159px hsl(858.6, 100%, 50%), -57px 160px hsl(864, 100%, 50%), -56px 161px hsl(869.4, 100%, 50%), -55px 162px hsl(874.8, 100%, 50%), -55px 163px hsl(880.2, 100%, 50%), -54px 164px hsl(885.6, 100%, 50%), -53px 165px hsl(891, 100%, 50%), -52px 166px hsl(896.4, 100%, 50%), -51px 167px hsl(901.8, 100%, 50%), -50px 168px hsl(907.2, 100%, 50%), -49px 169px hsl(912.6, 100%, 50%), -48px 170px hsl(918, 100%, 50%), -47px 171px hsl(923.4, 100%, 50%), -46px 172px hsl(928.8, 100%, 50%), -45px 173px hsl(934.2, 100%, 50%), -43px 174px hsl(939.6, 100%, 50%), -42px 175px hsl(945, 100%, 50%), -41px 176px hsl(950.4, 100%, 50%), -39px 177px hsl(955.8, 100%, 50%), -38px 178px hsl(961.2, 100%, 50%), -36px 179px hsl(966.6, 100%, 50%), -35px 180px hsl(972, 100%, 50%), -33px 181px hsl(977.4, 100%, 50%), -32px 182px hsl(982.8, 100%, 50%), -30px 183px hsl(988.2, 100%, 50%), -28px 184px hsl(993.6, 100%, 50%), -27px 185px hsl(999, 100%, 50%), -25px 186px hsl(1004.4, 100%, 50%), -23px 187px hsl(1009.8, 100%, 50%), -22px 188px hsl(1015.2, 100%, 50%), -20px 189px hsl(1020.6, 100%, 50%), -18px 190px hsl(1026, 100%, 50%), -16px 191px hsl(1031.4, 100%, 50%), -14px 192px hsl(1036.8, 100%, 50%), -13px 193px hsl(1042.2, 100%, 50%), -11px 194px hsl(1047.6, 100%, 50%), -9px 195px hsl(1053, 100%, 50%), -7px 196px hsl(1058.4, 100%, 50%), -5px 197px hsl(1063.8, 100%, 50%), -3px 198px hsl(1069.2, 100%, 50%), -1px 199px hsl(1074.6, 100%, 50%), -1px 200px hsl(1080, 100%, 50%), 1px 201px hsl(1085.4, 100%, 50%), 3px 202px hsl(1090.8, 100%, 50%), 5px 203px hsl(1096.2, 100%, 50%), 7px 204px hsl(1101.6, 100%, 50%), 9px 205px hsl(1107, 100%, 50%), 11px 206px hsl(1112.4, 100%, 50%), 13px 207px hsl(1117.8, 100%, 50%), 14px 208px hsl(1123.2, 100%, 50%), 16px 209px hsl(1128.6, 100%, 50%), 18px 210px hsl(1134, 100%, 50%), 20px 211px hsl(1139.4, 100%, 50%), 22px 212px hsl(1144.8, 100%, 50%), 23px 213px hsl(1150.2, 100%, 50%), 25px 214px hsl(1155.6, 100%, 50%), 27px 215px hsl(1161, 100%, 50%), 28px 216px hsl(1166.4, 100%, 50%), 30px 217px hsl(1171.8, 100%, 50%), 32px 218px hsl(1177.2, 100%, 50%), 33px 219px hsl(1182.6, 100%, 50%), 35px 220px hsl(1188, 100%, 50%), 36px 221px hsl(1193.4, 100%, 50%),38px 222px hsl(1198.8, 100 %, 50 %), 39px 223px hsl(1204.2, 100 %, 50 %), 41px 224px hsl(1209.6, 100 %, 50 %), 42px 225px hsl(1215, 100 %, 50 %), 43px 226px hsl(1220.4, 100 %, 50 %), 45px 227px hsl(1225.8, 100 %, 50 %), 46px 228px hsl(1231.2, 100 %, 50 %), 47px 229px hsl(1236.6, 100 %, 50 %), 48px 230px hsl(1242, 100 %, 50 %), 49px 231px hsl(1247.4, 100 %, 50 %), 50px 232px hsl(1252.8, 100 %, 50 %), 51px 233px hsl(1258.2, 100 %, 50 %), 52px 234px hsl(1263.6, 100 %, 50 %), 53px 235px hsl(1269, 100 %, 50 %), 54px 236px hsl(1274.4, 100 %, 50 %), 55px 237px hsl(1279.8, 100 %, 50 %), 55px 238px hsl(1285.2, 100 %, 50 %), 56px 239px hsl(1290.6, 100 %, 50 %), 57px 240px hsl(1296, 100 %, 50 %), 57px 241px hsl(1301.4, 100 %, 50 %), 58px 242px hsl(1306.8, 100 %, 50 %), 58px 243px hsl(1312.2, 100 %, 50 %), 58px 244px hsl(1317.6, 100 %, 50 %), 59px 245px hsl(1323, 100 %, 50 %), 59px 246px hsl(1328.4, 100 %, 50 %), 59px 247px hsl(1333.8, 100 %, 50 %), 59px 248px hsl(1339.2, 100 %, 50 %), 59px 249px hsl(1344.6, 100 %, 50 %), 60px 250px hsl(1350, 100 %, 50 %), 59px 251px hsl(1355.4, 100 %, 50 %), 59px 252px hsl(1360.8, 100 %, 50 %), 59px 253px hsl(1366.2, 100 %, 50 %), 59px 254px hsl(1371.6, 100 %, 50 %), 59px 255px hsl(1377, 100 %, 50 %), 58px 256px hsl(1382.4, 100 %, 50 %), 58px 257px hsl(1387.8, 100 %, 50 %), 58px 258px hsl(1393.2, 100 %, 50 %), 57px 259px hsl(1398.6, 100 %, 50 %), 57px 260px hsl(1404, 100 %, 50 %), 56px 261px hsl(1409.4, 100 %, 50 %), 55px 262px hsl(1414.8, 100 %, 50 %), 55px 263px hsl(1420.2, 100 %, 50 %), 54px 264px hsl(1425.6, 100 %, 50 %), 53px 265px hsl(1431, 100 %, 50 %), 52px 266px hsl(1436.4, 100 %, 50 %), 51px 267px hsl(1441.8, 100 %, 50 %), 50px 268px hsl(1447.2, 100 %, 50 %), 49px 269px hsl(1452.6, 100 %, 50 %), 48px 270px hsl(1458, 100 %, 50 %), 47px 271px hsl(1463.4, 100 %, 50 %), 46px 272px hsl(1468.8, 100 %, 50 %), 45px 273px hsl(1474.2, 100 %, 50 %), 43px 274px hsl(1479.6, 100 %, 50 %), 42px 275px hsl(1485, 100 %, 50 %), 41px 276px hsl(1490.4, 100 %, 50 %), 39px 277px hsl(1495.8, 100 %, 50 %), 38px 278px hsl(1501.2, 100 %, 50 %), 36px 279px hsl(1506.6, 100 %, 50 %), 35px 280px hsl(1512, 100 %, 50 %), 33px 281px hsl(1517.4, 100 %, 50 %), 32px 282px hsl(1522.8, 100 %, 50 %), 30px 283px hsl(1528.2, 100 %, 50 %), 28px 284px hsl(1533.6, 100 %, 50 %), 27px 285px hsl(1539, 100 %, 50 %), 25px 286px hsl(1544.4, 100 %, 50 %), 23px 287px hsl(1549.8, 100 %, 50 %), 22px 288px hsl(1555.2, 100 %, 50 %), 20px 289px hsl(1560.6, 100 %, 50 %), 18px 290px hsl(1566, 100 %, 50 %), 16px 291px hsl(1571.4, 100 %, 50 %), 14px 292px hsl(1576.8, 100 %, 50 %), 13px 293px hsl(1582.2, 100 %, 50 %), 11px 294px hsl(1587.6, 100 %, 50 %), 9px 295px hsl(1593, 100 %, 50 %), 7px 296px hsl(1598.4, 100 %, 50 %), 5px 297px hsl(1603.8, 100 %, 50 %), 3px 298px hsl(1609.2, 100 %, 50 %), 1px 299px hsl(1614.6, 100 %, 50 %), 2px 300px hsl(1620, 100 %, 50 %), -1px 301px hsl(1625.4, 100 %, 50 %), -3px 302px hsl(1630.8, 100 %, 50 %), -5px 303px hsl(1636.2, 100 %, 50 %), -7px 304px hsl(1641.6, 100 %, 50 %), -9px 305px hsl(1647, 100 %, 50 %), -11px 306px hsl(1652.4, 100 %, 50 %), -13px 307px hsl(1657.8, 100 %, 50 %), -14px 308px hsl(1663.2, 100 %, 50 %), -16px 309px hsl(1668.6, 100 %, 50 %), -18px 310px hsl(1674, 100 %, 50 %), -20px 311px hsl(1679.4, 100 %, 50 %), -22px 312px hsl(1684.8, 100 %, 50 %), -23px 313px hsl(1690.2, 100 %, 50 %), -25px 314px hsl(1695.6, 100 %, 50 %), -27px 315px hsl(1701, 100 %, 50 %), -28px 316px hsl(1706.4, 100 %, 50 %), -30px 317px hsl(1711.8, 100 %, 50 %), -32px 318px hsl(1717.2, 100 %, 50 %), -33px 319px hsl(1722.6, 100 %, 50 %), -35px 320px hsl(1728, 100 %, 50 %), -36px 321px hsl(1733.4, 100 %, 50 %), -38px 322px hsl(1738.8, 100 %, 50 %), -39px 323px hsl(1744.2, 100 %, 50 %), -41px 324px hsl(1749.6, 100 %, 50 %), -42px 325px hsl(1755, 100 %, 50 %), -43px 326px hsl(1760.4, 100 %, 50 %), -45px 327px hsl(1765.8, 100 %, 50 %), -46px 328px hsl(1771.2, 100 %, 50 %), -47px 329px hsl(1776.6, 100 %, 50 %), -48px 330px hsl(1782, 100 %, 50 %), -49px 331px hsl(1787.4, 100 %, 50 %), -50px 332px hsl(1792.8, 100 %, 50 %), -51px 333px hsl(1798.2, 100 %, 50 %), -52px 334px hsl(1803.6, 100 %, 50 %), -53px 335px hsl(1809, 100 %, 50 %), -54px 336px hsl(1814.4, 100 %, 50 %), -55px 337px hsl(1819.8, 100 %, 50 %), -55px 338px hsl(1825.2, 100 %, 50 %), -56px 339px hsl(1830.6, 100 %, 50 %), -57px 340px hsl(1836, 100 %, 50 %), -57px 341px hsl(1841.4, 100 %, 50 %), -58px 342px hsl(1846.8, 100 %, 50 %), -58px 343px hsl(1852.2, 100 %, 50 %), -58px 344px hsl(1857.6, 100 %, 50 %), -59px 345px hsl(1863, 100 %, 50 %), -59px 346px hsl(1868.4, 100 %, 50 %), -59px 347px hsl(1873.8, 100 %, 50 %), -59px 348px hsl(1879.2, 100 %, 50 %), -59px 349px hsl(1884.6, 100 %, 50 %), -60px 350px hsl(1890, 100 %, 50 %), -59px 351px hsl(1895.4, 100 %, 50 %), -59px 352px hsl(1900.8, 100 %, 50 %), -59px 353px hsl(1906.2, 100 %, 50 %), -59px 354px hsl(1911.6, 100 %, 50 %), -59px 355px hsl(1917, 100 %, 50 %), -58px 356px hsl(1922.4, 100 %, 50 %), -58px 357px hsl(1927.8, 100 %, 50 %), -58px 358px hsl(1933.2, 100 %, 50 %), -57px 359px hsl(1938.6, 100 %, 50 %), -57px 360px hsl(1944, 100 %, 50 %), -56px 361px hsl(1949.4, 100 %, 50 %), -55px 362px hsl(1954.8, 100 %, 50 %), -55px 363px hsl(1960.2, 100 %, 50 %), -54px 364px hsl(1965.6, 100 %, 50 %), -53px 365px hsl(1971, 100 %, 50 %), -52px 366px hsl(1976.4, 100 %, 50 %), -51px 367px hsl(1981.8, 100 %, 50 %), -50px 368px hsl(1987.2, 100 %, 50 %), -49px 369px hsl(1992.6, 100 %, 50 %), -48px 370px hsl(1998, 100 %, 50 %), -47px 371px hsl(2003.4, 100 %, 50 %), -46px 372px hsl(2008.8, 100 %, 50 %), -45px 373px hsl(2014.2, 100 %, 50 %), -43px 374px hsl(2019.6, 100 %, 50 %), -42px 375px hsl(2025, 100 %, 50 %), -41px 376px hsl(2030.4, 100 %, 50 %), -39px 377px hsl(2035.8, 100 %, 50 %), -38px 378px hsl(2041.2, 100 %, 50 %), -36px 379px hsl(2046.6, 100 %, 50 %), -35px 380px hsl(2052, 100 %, 50 %), -33px 381px hsl(2057.4, 100 %, 50 %), -32px 382px hsl(2062.8, 100 %, 50 %), -30px 383px hsl(2068.2, 100 %, 50 %), -28px 384px hsl(2073.6, 100 %, 50 %), -27px 385px hsl(2079, 100 %, 50 %), -25px 386px hsl(2084.4, 100 %, 50 %), -23px 387px hsl(2089.8, 100 %, 50 %), -22px 388px hsl(2095.2, 100 %, 50 %), -20px 389px hsl(2100.6, 100 %, 50 %), -18px 390px hsl(2106, 100 %, 50 %), -16px 391px hsl(2111.4, 100 %, 50 %), -14px 392px hsl(2116.8, 100 %, 50 %), -13px 393px hsl(2122.2, 100 %, 50 %), -11px 394px hsl(2127.6, 100 %, 50 %), -9px 395px hsl(2133, 100 %, 50 %), -7px 396px hsl(2138.4, 100 %, 50 %), -5px 397px hsl(2143.8, 100 %, 50 %), -3px 398px hsl(2149.2, 100 %, 50 %), -1px 399px hsl(2154.6, 100 %, 50 %); font - size: 40px; ",
    settings = {
        drawPoints: false,
        collisionStop: false,
        updateCollisions: true,
        drawUpdates: true,
        darkMode: false,
        allowBoosting: false,
        isGameRunning: true,
        isGamePaused: false,
    };

canvas.oncontextmenu = (e) => { e.preventDefault(); e.stopPropagation(); };
menu.oncontextmenu = (e) => { e.preventDefault(); e.stopPropagation(); };
fireImg.src = "flame.png";
canvas.height = height;
canvas.width = width;
//let lol = context.createPattern(carImg, "repeat");

let car1: car, car2: car, car3: car;
let c1: circle, c2: circle, r1: rectangle, r2: rectangle, anchor: point, moon: rectangle, spot: point, l1: line, l2: line;

startingFunction();

function testing() {
    Cars = [];
    objectsToDraw = [];
    l1 = new line(300, 500, 30),
        l2 = new line(600, 500, 400);
    settings.drawPoints = true;
    objectsToDraw.push(l1, l2);
}

function standard() {
    Cars = [];
    objectsToDraw = [];
    car1 = new car(width / 2, height / 2, 25, 45);
    car1.speed = 0.5;
    car1.collisionBox = new rectangle(car1.position.x, car1.position.y, car1.width, car1.height);
    setColorToFirstAvailable(car1);
    Cars.push(car1);

    settings.drawPoints = false;
    spot = new point(100, 100, "black"),
        c1 = new circle(300, 500, 30),
        r1 = new rectangle(160, 70, 75, 90),
        r2 = new rectangle(600, 100, 150, 200);
    r2.children.push(c1);
    objectsToDraw.push(c1, r1, r2, spot);
}

function demo() { //one of each objects (ark noah intensifies a little bit)
    Cars = [];
    objectsToDraw = [];
    spot = new point(width / 2, height / 2, "black"),
        c1 = new circle(width / 2 - 200, height / 2, 30),
        r1 = new rectangle(width / 2 + 200, height / 2, 75, 90),
        car1 = new car(width / 2, height / 2 - 100, 25, 45),
        l1 = new line(width / 2, height / 2 + 100, 400);
    objectsToDraw.push(spot, c1, r1, l1);

    car1.speed = 0.5;
    car1.collisionBox = new rectangle(car1.position.x, car1.position.y, car1.width, car1.height);
    setColorToFirstAvailable(car1);
    Cars.push(car1);
}

function eskalation() {
    Cars = [];
    objectsToDraw = [];
    car1 = new car(width / 2, height / 2, 25, 45);
    car1.speed = 0.5;
    car1.collisionBox = new rectangle(car1.position.x, car1.position.y, car1.width, car1.height);
    Cars.push(car1);

    c1 = new circle(300, 500, 30),
        r1 = new rectangle(100, 70, 75, 90, undefined, undefined, 0.1, undefined, 1),
        r2 = new rectangle(600, 100, 150, 200, undefined, undefined, 0.1, undefined, 1),
        anchor = new point(Cars[0].position.x, Cars[0].position.y - 36, undefined, undefined, 0.1, undefined, 1),
        moon = new rectangle(anchor.position.x + 100, anchor.position.y, 20, 20, "LightSlateGrey");
    r2.children.push(c1);
    r1.children.push(r2);
    moon.children.push(r1);
    anchor.children.push(moon);
    Cars[0].children.push(anchor);
    objectsToDraw.push(c1, r1, r2, anchor, moon);
}

function addCar() {
    let carNew = new car(width / 2, height / 2, 25, 45);
    carNew.speed = 0.5;
    carNew.collisionBox = new rectangle(carNew.position.x, carNew.position.y, carNew.width, carNew.height);
    setColorToFirstAvailable(car1);
    Cars.push(carNew);
}

document.onmousedown = event => {
    clickMouseX = event.clientX;
    clickMouseY = event.clientY;
    oldMouseX = event.clientX;
    oldMouseY = event.clientY;
    elementToMove = undefined;
    let clickPoint = new point(clickMouseX, clickMouseY);
    function clickedInsideMenu(): boolean {
        let pos1 = parseInt(menu.style.left),
            pos2 = parseInt(menu.style.top);
        if (clickMouseX > pos1 && clickMouseX < pos1 + 400 && clickMouseY > pos2 && clickMouseY < pos2 + 400) {
            return true;
        }
        return false;
    }
    switch (event.button) {
        case 0: //Left Mousebutton clicked
            if (clickedInsideMenu()) {
                return;
            } else {
                menu.setAttribute("style", "display:none;");
                objectsToDraw.forEach(element => {
                    let fun = "collide_point_" + element.constructor.name;
                    if (element.constructor.name == "point") {
                        fun += "_Radius"
                    }
                    if (window[fun](clickPoint, element)) {
                        elementToMove = element;
                        if (element.constructor.name == "line") {
                            if (window["collide_point_point_Radius"](clickPoint, (element as line).pos1)) {
                                lineEndToMove = (element as line).pos1;
                            } else if (window["collide_point_point_Radius"](clickPoint, (element as line).pos2)) {
                                lineEndToMove = (element as line).pos2;
                            }
                        }
                    }
                });
                Cars.forEach(element => {
                    let fun = "collide_point_" + (element.collisionBox.constructor as any).name;
                    if (window[fun](clickPoint, element)) {
                        elementToMove = element;
                    }
                });
                if (!elementToMove) {
                    selectedElement = undefined;
                }
            }
            break;
        case 1: //Mousewheelclick
            menu.setAttribute("style", "display:none;");
            objectsToDraw.forEach(element => {
                let fun = "collide_" + "point_" + element.constructor.name;
                if (window[fun](clickPoint, element)) {
                    elementToMove = element;
                }
            });

            Cars.forEach(element => {
                let fun = "collide_" + "point_" + (element.collisionBox.constructor as any).name;
                if (window[fun](clickPoint, element)) {
                    elementToMove = element;
                }
            });

            if (elementToMove == selectedElement) {
                elementToMove.rotation += Math.PI / 16;
            } else {
                if (elementToMove.constructor.name == "line") {
                    (elementToMove as line).rotateOnce(Math.PI / 8);
                } else {
                    elementToMove.angle += Math.PI / 8;
                }
            }
            elementToMove = undefined;
            break;
        case 2: //Right Mousebutton clicked
            selectedElement = undefined;
            objectsToDraw.forEach(element => {
                let fun = "collide_" + "point_" + element.constructor.name;
                if (element.constructor.name == "point") {
                    fun += "_Radius"
                }
                if (window[fun](clickPoint, element)) {
                    selectedElement = element;
                }
            });

            Cars.forEach(element => {
                let fun = "collide_" + "point_" + (element.collisionBox.constructor as any).name;
                if (window[fun](clickPoint, element)) {
                    selectedElement = element;
                }
            });
            if (selectedElement) {
                menu.setAttribute("style", `left: ${Math.min(clickMouseX, width - 400)}px; top: ${Math.min(clickMouseY, height - 400)}px; width: 400px; height: 400px; display:block; position: absolute; background-color: ${settings.darkMode ? "rgba(150, 150, 150, 0.8)" : "rgba(50, 50, 50, 0.8)"};`);
                while (menu.firstChild) {
                    menu.removeChild(menu.lastChild);
                }
                let title = document.createElement("p");
                title.innerHTML = selectedElement.type.toUpperCase();
                title.setAttribute("style", "display:inline-block;");
                let centering = document.createElement("center");
                centering.appendChild(title);
                menu.appendChild(centering);
                let label: HTMLElement;
                let value;
                (Object as any).entries(selectedElement).forEach(property => {
                    switch (property[1].constructor.name) {
                        case "Number":
                            label = document.createElement("p");
                            label.style.marginLeft = "16px";
                            label.innerHTML = property[0];
                            label.setAttribute("style", "display:inline-block; margin-left: 16px; color:white;");
                            value = document.createElement("input");
                            value.value = property[1];

                            menu.appendChild(label);
                            menu.appendChild(value);
                            menu.appendChild(document.createElement("br"));
                            break;
                        case "String":
                            label = document.createElement("p");
                            label.style.marginLeft = "16px";
                            label.innerHTML = property[0];
                            label.setAttribute("style", "display:inline-block; margin-left: 16px; color:white;");
                            value = document.createElement("input");
                            value.value = property[1];

                            menu.appendChild(label);
                            menu.appendChild(value);
                            menu.appendChild(document.createElement("br"));
                            break;
                        case "vector":
                            // console.log(property[0] + ": ");
                            // console.log(property[1]);
                            break;
                    }
                });
            } else {
                menu.setAttribute("style", "display:none; width: 0px; height: 0px;");
            }
            break;
        default:
            break;
    }
}

document.onmousemove = event => {
    let MouseX = event.clientX;
    let MouseY = event.clientY;
    if (elementToMove && MouseY > 0) {
        let movement = new vector(MouseX - oldMouseX, MouseY - oldMouseY);
        if (elementToMove == selectedElement) {
            if (lineEndToMove) {
                (elementToMove as line).accelerate(movement.divide_Return(8), lineEndToMove);
            } else {
                elementToMove.accelerate(movement.divide_Return(8));
            }
        } else {
            if (lineEndToMove) {
                (elementToMove as line).add_Position(movement, lineEndToMove);
            } else {
                elementToMove.add_Position(movement);
            }
        }
    }
    oldMouseX = MouseX;
    oldMouseY = MouseY;
}

document.onmouseup = event => {
    let pos1 = parseInt(menu.style.left),
        pos2 = parseInt(menu.style.top);
    if (clickMouseX > pos1 && clickMouseX < pos1 + parseInt(menu.style.width) && clickMouseY > pos2 && clickMouseY < pos2 + parseInt(menu.style.height)) {
        return;
    }
    if (clickMouseX == oldMouseX && clickMouseY == oldMouseY && event.button == 0) {
        selectedElement = elementToMove;
    }
    if (event.button != 1) {
        elementToMove = undefined;
        lineEndToMove = undefined;
    }
}

document.body.addEventListener("keydown", event => {
    // console.log(event.code);
    switch (event.code) {
        case "KeyW":
            fw1 = true;
            break;
        case "KeyA":
            tl1 = true;
            break;
        case "KeyS":
            bw1 = true;
            break;
        case "KeyD":
            tr1 = true;
            break;
        case "ArrowLeft":
            tl2 = true;
            break;
        case "ArrowUp":
            fw2 = true;
            break;
        case "ArrowRight":
            tr2 = true;
            break;
        case "ArrowDown":
            bw2 = true;
            break;
        case "Numpad4":
            tl3 = true;
            break;
        case "Numpad8":
            fw3 = true;
            break;
        case "Numpad6":
            tr3 = true;
            break;
        case "Numpad5":
            bw3 = true;
            break;
        case "Space":
            toggle("isGamePaused");
            break;
        case "KeyB":
            for (let car of Cars) {
                car.velocity.x = 0;
                car.velocity.y = 0;
            }
            break;
        case "Delete":
            remove();
            break;
        case "Escape":
            window.location.href = "index.html";
            break;
        case "KeyJ":
            duplicate();
            break;
        case "KeyK":
            save();
            break;
        case "KeyL":
            document.getElementById("file-input").click();
            break;
        default:
            break;
    }
})

document.body.addEventListener("keyup", event => {
    switch (event.code) {
        case "KeyW":
            fw1 = false;
            break;
        case "KeyA":
            tl1 = false;
            break;
        case "KeyS":
            bw1 = false;
            break;
        case "KeyD":
            tr1 = false;
            break;
        case "ArrowLeft":
            tl2 = false;
            break;
        case "ArrowUp":
            fw2 = false;
            break;
        case "ArrowRight":
            tr2 = false;
            break;
        case "ArrowDown":
            bw2 = false;
            break;
        case "Numpad4":
            tl3 = false;
            break;
        case "Numpad8":
            fw3 = false;
            break;
        case "Numpad6":
            tr3 = false;
            break;
        case "Numpad5":
            bw3 = false;
            break;
        default:
            break;
    }
})

function update() {
    if (settings.drawUpdates) {
        context.clearRect(0, 0, width, height);
    }

    if (settings.darkMode) {
        context.fillStyle = "rgba(30, 30, 30)";
        context.rect(0, 0, width, height);
        context.fill();
    }

    for (let i = 0; i < Cars.length; i++) {
        let currentCar = Cars[i];
        if (window["fw" + (i + 1)] && !window["bw" + (i + 1)]) {
            let v = new vector(0, 0);
            if (settings.allowBoosting) {
                if (window["tl" + (i + 1)] && window["tr" + (i + 1)]) { //trying to boost
                    if (currentCar.currentBoost > 5) { //boosting
                        v.set_Length(currentCar.speed * 2.5);
                        currentCar.currentBoost -= 5;
                        currentCar.boosting = true;
                    } else { //not able to boost
                        v.set_Length(currentCar.speed);
                        currentCar.boosting = false;
                    }
                } else { //not trying boosting
                    v.set_Length(currentCar.speed);
                    currentCar.boosting = false;
                    if (currentCar.currentBoost < currentCar.maxBoost) {
                        currentCar.currentBoost++;
                    }
                }
            } else {
                v.set_Length(currentCar.speed);
            }
            v.set_Angle(currentCar.angle + 3 * Math.PI / 2);
            currentCar.accelerate(v);
        } else if (!window["fw" + (i + 1)] && window["bw" + (i + 1)]) {
            let v = new vector(0, 0);
            v.set_Length(0.1);
            v.set_Angle(currentCar.angle + Math.PI / 2);
            currentCar.accelerate(v);
            currentCar.boosting = false;
        } else {
            currentCar.boosting = false;
            if (currentCar.currentBoost < currentCar.maxBoost) {
                currentCar.currentBoost++;
            }
        }
        if (window["tl" + (i + 1)] && !window["tr" + (i + 1)]) { //turning left 
            currentCar.rotation = -0.03 * Math.PI / 2;
        } else if (!window["tl" + (i + 1)] && window["tr" + (i + 1)]) { //turning right
            currentCar.rotation = 0.03 * Math.PI / 2;
        }
    }
    if (settings.updateCollisions) {
        update_Collisions();
    }

    //update and draw the other shapes
    for (let thing of objectsToDraw) {
        thing.update();
        if (thing == selectedElement) {
            thing.draw("LawnGreen");
        } else {
            if (thing.collision) {
                thing.draw("red");
                if (settings.collisionStop) {
                    thing.velocity = new vector(0, 0);
                }
            } else {
                thing.draw();
            }
        }

    }
    //update and draw the car(s)
    Cars.forEach((car) => {
        car.update();
        car.draw();
    });
    if (settings.isGameRunning) {
        window.requestAnimationFrame(update);
    } else if (settings.isGamePaused) {

    }
}

function update_Collisions() {
    objectsToDraw.forEach(element => {
        element.collision = false;
    });

    Cars.forEach(element => {
        element.collisionBox.collision = false;
    });

    objectsToDraw.forEach(testObject => {
        for (let i = objectsToDraw.indexOf(testObject) + 1; i < objectsToDraw.length; i++) {
            let order = get_Order(testObject, objectsToDraw[i]);
            if (window[order.fun](order.first, order.second, settings.drawPoints)) {
                order.first.collision = true;
                order.second.collision = true;
            }
        };
        for (let testCar of Cars) {
            let name1 = testObject.constructor.name,
                name2: Function = testCar.collisionBox.constructor;
            if (window["collide_" + name1 + "_" + name2.name](testObject, testCar.collisionBox, settings.drawPoints)) {
                testObject.collision = true;
                testCar.collisionBox.collision = true;
            }
        }
    });
}

function get_Order(obj1: element, obj2: element) {
    if (order.indexOf((obj1.constructor as Function).name) <= order.indexOf((obj2.constructor as Function).name)) {
        return { first: obj1, second: obj2, fun: "collide_" + (obj1.constructor as Function).name + "_" + (obj2.constructor as Function).name };
    } else {
        return { first: obj2, second: obj1, fun: "collide_" + (obj2.constructor as Function).name + "_" + (obj1.constructor as Function).name };
    }
}

function remove() {
    if (selectedElement) {
        if (objectsToDraw.indexOf(selectedElement) > -1) {
            objectsToDraw.splice(objectsToDraw.indexOf(selectedElement), 1);
        } else if (Cars.indexOf(selectedElement as car) > -1) {
            Cars.splice(Cars.indexOf(selectedElement as car), 1);
        }
    }
}

function duplicate() {
    if (selectedElement instanceof element) {
        function mapping(obj: element) {
            let objNew = new mapClasses[obj.type]();
            if (obj.type == "car") { //testing
                console.log(objNew);
            }
            (Object as any).entries(obj).forEach((keys: object) => {
                let type: string = keys[1].type;
                if (type == "vector" || type == "rectangle" || type == "circle" || type == "point") {
                    objNew[keys[0]] = mapping(keys[1]);
                } else if (keys[1] instanceof Array) {
                    keys[1].forEach(element => {
                        mapping(element);
                    });
                } else {
                    if (keys[0] == "carImg") {
                        objNew[keys[0]] = (obj as car).carImg.src;
                    }
                    objNew[keys[0]] = keys[1];
                }
            });
            return objNew;
        }
        let temp = mapping(selectedElement);
        temp.add_Position(new vector(20, -20));
        if (selectedElement instanceof car) {
            Cars.push(temp);
        } else {
            objectsToDraw.push(temp);
        }
    } else {
        console.warn("Only elements can be duplicated. Maybe you have not selected an element?")
    }
}

function toggle(setToToggle: string) {
    if (settings[setToToggle] != undefined) {
        settings[setToToggle] = !settings[setToToggle];
        console.log(`The setting "%c${setToToggle}%c" was changed to "%c${settings[setToToggle]}%c"`, "color: orange;", "color: white", `color: ${settings[setToToggle] ? "green" : "red"}`, "color: white");
    }
}

function setColorToFirstAvailable(unpainted: car) {
    for (let color in carColors) {
        let available = true;
        for (let testCar of Cars) {
            if (testCar.carImg.src.indexOf(carColors[color]) >= 0) {
                available = false;
            }
        }
        if (available) {
            unpainted.color = color;
            unpainted.carImg.src = carColors[color];
        }
    }
    unpainted.color = "red";
    unpainted.carImg.src = carColors["red"]; // default if all other Colors are taken
}

function save() {
    let element = document.createElement('a');
    let json = JSON.stringify({ "objects": objectsToDraw, "cars": Cars }, undefined, 2);
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(json));
    element.setAttribute('download', "CarSimulator");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function load() {
    if ((document.getElementById("file-input") as HTMLInputElement).files.length == 0) {
        alert("E R R O R : Please select a valid .txt-file");
        return;
    }
    let file = (document.getElementById("file-input") as HTMLInputElement).files[0];
    var reader = new FileReader();
    reader.onloadend = () => {
        let data;
        try {
            data = JSON.parse(reader.result as string);
        } catch (err) {
            console.error(err);
            alert("E R R O R : Please select a valid .txt-file");
            return;
        }
        function mapping(obj) {
            let objNew = new mapClasses[obj.type]();
            if (obj.type == "car") {
                console.log(objNew);
            }
            (Object as any).entries(obj).forEach((keys: object) => {
                if (keys[1].type == "vector" || keys[1].type == "rectangle" || keys[1].type == "circle" || keys[1].type == "point") {
                    objNew[keys[0]] = mapping(keys[1]);
                } else if (keys[1] instanceof Array) {
                    keys[1].forEach(element => {
                        mapping(element);
                    });
                } else {
                    if (keys[0] == "carImg") {
                        return;
                    }
                    objNew[keys[0]] = keys[1];
                }
            });
            return objNew;
        }
        objectsToDraw = (data.objects as Array<element>).map((obj) => mapping(obj));
        Cars = (data.cars as Array<element>).map((obj) => { let temp = mapping(obj); console.log(obj); return temp; });
        for (let giveColor of Cars) {
            setColorToFirstAvailable(giveColor);
        }
    };
    reader.addEventListener("error", function () {
        alert("E R R O R : Failed to read file");
    });
    reader.readAsText(file);
}
document.getElementById("file-input").onchange = load;
update();

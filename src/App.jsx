import React, { useState, useEffect, useMemo } from "react";
import { Dumbbell, LogOut, Settings, Save, Check, Play } from "lucide-react";

const MONTHS_DATA = {"5": {"month": 5, "blocks": [{"day": "PIEPT/UMERI/BRATE", "week_labels": ["Get us", "Add volume", "Add kg; decrease vol", "DELOAD"], "sets_label": ["3x", "4x", "4x", "2x"], "exercises": [{"name": "Impins plan drept presa", "link": "https://youtube.com/shorts/HwR-tCgR23U", "reps": ["X6", "X6", "X4-5", "X6"], "pauza": "2,5m"}, {"name": "Impins plan inclinat gantere", "link": "https://youtube.com/shorts/EdObJ_9Jzk0", "reps": ["X8", "X8", "X8", "X8"], "pauza": "2m"}, {"name": "Fluturari de jos in sus (piept)", "link": "https://youtube.com/shorts/uaxVRTTrbi8", "reps": ["max", "max", "max", "max"], "pauza": "1m"}, {"name": "Fluturari de la niv umerilor (piept)", "link": "https://youtube.com/shorts/AGTVWjC40zc", "reps": ["max", "max", "max", "max"], "pauza": "1m"}, {"name": "Ridicari laterale", "link": "https://youtube.com/shorts/LhHd3MeqBa8", "reps": ["RF", "RF", "RF", "RF"], "pauza": "90s"}, {"name": "Biceps bara stand", "link": "https://youtu.be/aLwBoZvkrCE", "reps": [8, 8, 8, 8], "pauza": "90s"}, {"name": "Biceps ciocane", "link": "https://youtube.com/shorts/6KpwnFbBISo", "reps": ["Max", "Max", "Max", "Max"], "pauza": "90s"}]}, {"day": "SPATE/TRICEPS", "week_labels": ["Get us", "Add volume", "Add kg; decrease vol", "DELOAD"], "sets_label": ["3x", "4x", "4x", "2x"], "exercises": [{"name": "Tractiuni helcometru", "link": "https://youtube.com/shorts/1BnXz_RF_Dk", "reps": ["X6", "X6", "X4-5", "X6"], "pauza": "2,5m"}, {"name": "Ramat 1 mana cablu/aparat", "link": "https://youtube.com/shorts/KIsjJALvnC0", "reps": ["max", "max", "max", "max"], "pauza": "2m"}, {"name": "Pulldown cablu", "link": "https://youtube.com/shorts/jq6TZxqcoWA", "reps": ["max", "max", "max", "max"], "pauza": "1m"}, {"name": "Ramat priza larga din sezut", "link": "https://youtube.com/shorts/o3HJC9TvnMc", "reps": ["max", "max", "max", "max"], "pauza": "1m"}, {"name": "Fluturari din aplecat", "link": "https://youtube.com/shorts/uDnSf0v3WHw", "reps": ["max", "max", "max", "max"], "pauza": "90s"}, {"name": "Triceps cablu", "link": "https://youtube.com/shorts/3kL2khWjchc", "reps": [8, 8, 8, 8], "pauza": "90s"}, {"name": "Triceps aparat", "link": "https://youtube.com/shorts/GXr3VXnC_lo", "reps": ["max", "max", "max", "max"], "pauza": "1m"}]}, {"day": "PICIOARE/ABDOMEN", "week_labels": ["Get us", "Add volume", "Add kg; decrease vol", "DELOAD"], "sets_label": ["3x", "4x", "4x", "2x"], "exercises": [{"name": "Hacksquat/legpress/genuflexiuni", "link": "https://youtu.be/HSPis3Cwrjw", "reps": ["X6", "X6", "X4-5", "X6"], "pauza": "2,5m"}, {"name": "Extensii cvadriceps", "link": "https://youtube.com/shorts/p8vm5aqmQ8k", "reps": ["max", "max", "max", "max"], "pauza": "90s"}, {"name": "Mers fandat", "link": "https://youtube.com/shorts/O-ZKGaRcoO0", "reps": ["max", "max", "max", "max"], "pauza": "1m"}, {"name": "RDL", "link": "https://youtube.com/shorts/L2wndlOGUaA", "reps": ["X6", "X6", "X6", "X6"], "pauza": "2m"}, {"name": "Flexii femurali", "link": "https://youtube.com/shorts/Ckj7j_fNW48", "reps": ["max", "max", "max", "max"], "pauza": "1m"}, {"name": "Gambe stand", "link": "https://youtube.com/shorts/-dxxLUTvRF0", "reps": ["max", "max", "max", "max"], "pauza": "15s"}, {"name": "Ridicari de picioare", "link": "https://youtube.com/shorts/uMCPIvO5WSI", "reps": [16, 16, 16, 16], "pauza": "15s"}, {"name": "Abdomene scurte", "link": "https://youtu.be/t_LYyarCrWw", "reps": ["max", "max", "max", "max"], "pauza": "2m"}]}, {"day": "UPPER", "week_labels": ["Get us", "Add volume", "Add kg; decrease vol", "DELOAD"], "sets_label": ["3x", "3x", "3x", "2x"], "exercises": [{"name": "Impins plan drept presa", "link": "https://youtube.com/shorts/HwR-tCgR23U", "reps": ["max", "max", "max", "max"], "pauza": "20s"}, {"name": "Ramat cablu priza supinata", "link": "https://youtube.com/shorts/fO8RncVzAxY", "reps": ["max", "max", "max", "max"], "pauza": "2m"}, {"name": "Impins plan inclinat gantere", "link": "https://youtube.com/shorts/EdObJ_9Jzk0", "reps": ["max", "max", "max", "max"], "pauza": "20s"}, {"name": "Ramat umeri cablu", "link": "https://youtube.com/shorts/JVadcfCXVXw", "reps": ["max", "max", "max", "max"], "pauza": "2m"}, {"name": "Impins umeri presa", "link": "https://youtube.com/shorts/Mx9U-2Ifg_g", "reps": ["max", "max", "max", "max"], "pauza": "20s"}, {"name": "Tractiuni helcometru/aparat", "link": "https://youtube.com/shorts/LPCrVP997SQ", "reps": ["max", "max", "max", "max"], "pauza": "2m"}, {"name": "Biceps gantere", "link": "https://youtube.com/shorts/nkOuaHpRDY0", "reps": ["max", "max", "max", "max"], "pauza": "20s"}, {"name": "Triceps cablu", "link": "https://youtube.com/shorts/3kL2khWjchc", "reps": ["max", "max", "max", "max"], "pauza": "20s"}, {"name": "Fluturari umeri aparat", "link": "https://youtube.com/shorts/Lm0rq55EMsk", "reps": ["max", "max", "max", "max"], "pauza": "2m"}]}], "glossary": {"DROPSET": "Se executa nr prescris de repetari cu cea mai mare greutate folosita in faza precedenta la exercitiul propriuzis pana la esec, dupa care cu minimum de pauza posibila se reduce 10% din greutatea initial folosita (G1) si se executa pana la esec nr de repetari posibil, dupa care se scade 10% din greutatea 2 (G2) folosita, si se executa inca odata nr de repetari posibil pana la esec muscular cu G3. FARA AJUTOR EXTERN (decat la scazut greutati).", "max": "Nr de repetari maxim posibil cu greutatea folosita in ultima saptamana de incarcare din luna precedenta.", "RF": "Cu cea mai mare greutate folosita in luna precedenta in saptamana de varf, vei executa pana la epuizare, dupa care partenerul va face partea concentrica a executiei, iar tu vei controla partea excentrica a executiei, unde vei incerca sa o incetinesti cat de mult poti (greutatile). Intre 3-8 repetari la fiecare serie."}}, "3": {"month": 3, "blocks": [{"day": "Piept/umeri/biceps", "exercises": [{"name": "Impins plan drept presa", "link": "https://youtube.com/shorts/HwR-tCgR23U", "reps": [12, 12, 12, 12], "pauza": "2m"}, {"name": "Flotari", "link": "https://youtube.com/shorts/cVztPBLf9Ac", "reps": [12, 12, 12, 12], "pauza": "15s"}, {"name": "Skull crushers", "link": "https://youtu.be/Erv2ZILZd2c", "reps": [12, 12, 12, 12], "pauza": "2m"}, {"name": "Ridicari frontale gantere", "link": "https://youtube.com/shorts/t2KsEWsqdTk", "reps": [12, 12, 12, 12], "pauza": "2m"}, {"name": "Impins umeri presa", "link": "https://youtube.com/shorts/Mx9U-2Ifg_g", "reps": [12, 12, 12, 12], "pauza": "15s"}, {"name": "Ridicari laterele gantere", "link": "https://youtube.com/shorts/a07sFgop3Ug", "reps": [12, 12, 12, 12], "pauza": "2m"}, {"name": "Flexii biceps gantere/bara stand", "link": "https://youtube.com/shorts/RvNQjYaDHjI", "reps": [12, 12, 12, 12], "pauza": "2m"}]}, {"day": "Spate/triceps", "exercises": [{"name": "Tractiuni helcometru", "link": "https://youtube.com/shorts/1BnXz_RF_Dk", "reps": [12, 12, 12, 12], "pauza": "15s"}, {"name": "Pulldown cablu cu bara", "link": "https://youtu.be/jq6TZxqcoWA", "reps": [12, 12, 12, 12], "pauza": "2m"}, {"name": "Ramat priza larga", "link": "https://youtube.com/shorts/o3HJC9TvnMc", "reps": [12, 12, 12, 12], "pauza": "2m"}, {"name": "Facepulls", "link": "https://youtube.com/shorts/cuiTTcIR11Y", "reps": [12, 12, 12, 12], "pauza": "15s"}, {"name": "Fluturari din aplecat", "link": "https://youtube.com/shorts/uDnSf0v3WHw", "reps": [12, 12, 12, 12], "pauza": "2m"}, {"name": "Extensia tricepsului cu gantere la ceafa", "link": "https://youtu.be/Aym9lgoPQv4", "reps": [12, 12, 12, 12], "pauza": "2m"}, {"name": "Extensia tricepsului aparat", "link": "https://youtube.com/shorts/GXr3VXnC_lo", "reps": [12, 12, 12, 12], "pauza": "2m"}]}, {"day": "Picioare/abdomen", "exercises": [{"name": "Presa", "link": "https://youtu.be/HSPis3Cwrjw", "reps": [10, 10, 10, 10], "pauza": "15s"}, {"name": "Extensii cvadriceps", "link": "https://youtube.com/shorts/p8vm5aqmQ8k", "reps": [15, 15, 15, 15], "pauza": "2,5m"}, {"name": "Fandare statica", "link": "https://youtube.com/shorts/cNV3z8iTnJw", "reps": [12, 12, 12, 12], "pauza": "20s/90s"}, {"name": "RDL", "link": "https://youtube.com/shorts/B-2HA86HN0E", "reps": [12, 12, 12, 8], "pauza": "15s"}, {"name": "Flexii femurali aparat", "link": "https://youtube.com/shorts/Ckj7j_fNW48", "reps": [15, 15, 15, 15], "pauza": "2m"}, {"name": "Ridicari de varfuri din sezut", "link": "https://youtube.com/shorts/-dxxLUTvRF0", "reps": [15, 15, 15, 15], "pauza": "2m"}, {"name": "Abdomene lungi", "link": "https://youtu.be/xWMWAMiF8lk", "reps": [15, 15, 15, 15], "pauza": "15s"}, {"name": "Abdomene scurte", "link": "https://youtu.be/t_LYyarCrWw", "reps": [15, 15, 15, 15], "pauza": "2m"}]}, {"day": "Piept/spate/umeri/brate", "exercises": [{"name": "Impins plan inclinat gantere", "link": "https://youtube.com/shorts/EdObJ_9Jzk0", "reps": [12, 12, 12, 12], "pauza": "15s"}, {"name": "Fluturari piept aparat", "link": "https://youtube.com/shorts/AGTVWjC40zc", "reps": [12, 12, 12, 12], "pauza": "2m"}, {"name": "Pull over", "link": "https://youtu.be/mKOqT_SG4sA", "reps": [12, 12, 12, 12], "pauza": "15s"}, {"name": "Fluturari umeri gantere", "link": "https://youtube.com/shorts/FELVhaJU6K4", "reps": [12, 12, 12, 12], "pauza": "2m"}, {"name": "Tractiuni helco neutru", "link": "https://youtube.com/shorts/LPCrVP997SQ", "reps": [12, 12, 12, 12], "pauza": "15s"}, {"name": "Facepulls cablu", "link": "https://youtube.com/shorts/cuiTTcIR11Y", "reps": [12, 12, 12, 12], "pauza": "2m"}, {"name": "Ramat din sezut cablu priza larga", "link": "https://youtube.com/shorts/o3HJC9TvnMc", "reps": [12, 12, 12, 12], "pauza": "15s"}, {"name": "Ridicari frontale cu ganterele", "link": "https://youtube.com/shorts/t2KsEWsqdTk", "reps": [12, 12, 12, 12], "pauza": "2m"}, {"name": "Flexii biceps aparat", "link": "https://youtube.com/shorts/dtVNhqoXaFQ", "reps": [15, 12, 10, 12], "pauza": "15s"}, {"name": "Extensia tricepsului gantere din culcat", "link": "https://youtube.com/shorts/Erv2ZILZd2c", "reps": [15, 12, 10, 12], "pauza": "2m"}]}], "glossary": {}}, "13": {"month": 13, "label": "Razvan gob 2(4 zile)", "blocks": [{"day": "Chest + Tricep", "exercises": [{"name": "Incline hammer strength bench press", "link": "https://youtu.be/sEyUfFDAXHI", "reps": [12, 12, 10, 10], "pauza": "2m"}, {"name": "Champagnes press", "link": "https://youtu.be/z0Pl7gDb-Ig", "reps": [12, 12, 10, 10], "pauza": "2m"}, {"name": "Decline chest press", "link": "https://youtu.be/1nQV42mFYPM", "reps": [12, 12, 10, 10], "pauza": "2m"}, {"name": "Chest press", "link": "https://youtu.be/PLG5GJyPjK8", "reps": [12, 15, 15, 15], "pauza": "2m"}, {"name": "Peck deck machine", "link": "https://youtu.be/t8rbphSGuS4", "reps": [12, 12, 10, 10], "pauza": "2m"}, {"name": "Triceps extension with V grip", "link": "https://youtu.be/Z52jDaEoKuQ", "reps": [12, 12, 10, 10], "pauza": "2m"}]}, {"day": "Legs", "exercises": [{"name": "Leg extension", "link": "https://youtube.com/shorts/dJ8kemt3bDI", "reps": [15, 15, 12, 12], "pauza": "2m"}, {"name": "Leg press with paused", "link": "https://youtube.com/shorts/FQDta9jzajI", "reps": [15, 15, 12, 12], "pauza": "2m"}, {"name": "Dumbbell sumo squat elevated", "link": "https://youtube.com/shorts/WG7l_0WGpeg", "reps": [15, 15, 12, 12], "pauza": "2m"}, {"name": "Barbell stiff legged deadlifts", "link": "https://youtube.com/shorts/v97y-LHQTkQ", "reps": [12, 12, 10, 10], "pauza": "2m"}, {"name": "Leg curls machine", "link": "https://youtube.com/shorts/PsAPiMDcvL0", "reps": [12, 12, 10, 10], "pauza": "2m"}, {"name": "Single leg press", "link": "https://youtube.com/shorts/OsCy47iXU1g", "reps": [15, 15, 15, 15], "pauza": "2m"}, {"name": "Seated calf raise", "link": "https://youtube.com/shorts/-dxxLUTvRF0", "reps": [15, 15, 15, 15], "pauza": "2m"}]}, {"day": "Back + Bicep", "exercises": [{"name": "Hammer strength low row machine", "link": "https://youtu.be/MikGZOkBREM", "reps": [12, 12, 10, 10], "pauza": "2m"}, {"name": "Dumbbell rows for lower lats", "link": "https://youtu.be/73xzzjpOPQU", "reps": [12, 12, 10, 10], "pauza": "2m"}, {"name": "Lat pull down (with a pause)", "link": "https://youtu.be/dnqfzgf_kqM", "reps": [12, 12, 10, 10], "pauza": "2m"}, {"name": "Wide grip lat pulldown, leaning back", "link": "https://youtu.be/EaNoQppBMEg", "reps": [12, 12, 10, 10], "pauza": "2m"}, {"name": "Pullover with a bar wide grip", "link": "https://youtu.be/sWG7QEX15fo", "reps": [15, 15, 15, 15], "pauza": "2m"}, {"name": "Biceps curls with a rope", "link": "https://youtu.be/vDKbfMnjVVg", "reps": [12, 12, 10, 10], "pauza": "2m"}, {"name": "Biceps curls with a bar", "link": "https://youtu.be/ZOZBvBU3nYc", "reps": [12, 12, 10, 10], "pauza": "2m"}]}, {"day": "Shoulders", "exercises": [{"name": "Traditional standing lateral", "link": "https://youtu.be/ga-orMq8uVQ", "reps": [12, 12, 10, 10], "pauza": "2m"}, {"name": "Seated cable row for rear delts", "link": "https://youtu.be/Y5cK3LduRRY", "reps": [12, 12, 10, 10], "pauza": "2m"}, {"name": "Barbell upright row braced against bench", "link": "https://youtu.be/bc2UzkQFZiM", "reps": [12, 12, 10, 10], "pauza": "2m"}, {"name": "Standing front raises with dumbbells", "link": "https://youtu.be/-xVOSW_muEs", "reps": [12, 12, 10, 10], "pauza": "2m"}, {"name": "Smith machine press behind the neck", "link": "https://youtu.be/QRgxPSV5M_w", "reps": [15, 15, 15, 15], "pauza": "2m"}]}], "glossary": {}}, "4": {"month": 4, "blocks": [{"day": "Piept/umeri/biceps", "exercises": [{"name": "Impins plan drept bara", "link": "https://youtube.com/shorts/iK_w87KNjiQ", "reps": ["3x6 + AO", "4x6 + AO", "4x6 + AO", 10], "pauza": "2,5m"}, {"name": "Impins plan inclinat gantere", "link": "https://youtube.com/shorts/EdObJ_9Jzk0", "reps": [6, 6, 6, 10], "pauza": "90s"}, {"name": "Fluturari piept aparat/cablu", "link": "https://youtube.com/shorts/AGTVWjC40zc", "reps": ["RP", "RP", "RP", "RP"], "pauza": "90s"}, {"name": "Împins umeri smith", "link": "https://youtube.com/shorts/QRgxPSV5M_w?feature=share", "reps": [10, 10, 10, 10], "pauza": "R&P"}, {"name": "Ridicari laterale", "link": "https://youtube.com/shorts/a07sFgop3Ug", "reps": ["RP", "RP", "RP", "RP"], "pauza": "R&P"}, {"name": "Biceps funie", "link": "https://youtube.com/shorts/vDKbfMnjVVg?feature=share", "reps": [10, 10, 8, 10], "pauza": "90s"}, {"name": "Biceps preacher peste cap", "link": "https://youtube.com/shorts/dQc48iDia6c?feature=share", "reps": ["max", "max", "max", "max"], "pauza": "90s"}]}, {"day": "Spate/triceps", "exercises": [{"name": "Tractiuni liber/elevator", "link": "https://youtube.com/shorts/xTPtCezuXVo", "reps": ["3x6 + AO", "4x6 + AO", "4x5 + AO", 10], "pauza": "2,5m"}, {"name": "Tractiune priza largă", "link": "https://youtube.com/shorts/EaNoQppBMEg?feature=share", "reps": ["max", "max", "max", 10], "pauza": "60s"}, {"name": "Pulldown sfoara", "link": "https://youtube.com/shorts/jq6TZxqcoWA", "reps": ["RP", "RP", "RP", "RP"], "pauza": "R&P"}, {"name": "Ramat cablu cu funia", "link": "https://youtube.com/shorts/rBTwn5QDWwU?feature=share", "reps": [8, 8, 6, 10], "pauza": "90s"}, {"name": "Fluturari deltoid posterior cablu", "link": "https://youtube.com/shorts/4xa7fHpPWV4?feature=share", "reps": ["RP", "RP", "RP", "RP"], "pauza": "R&P"}, {"name": "Dips triceps", "link": "https://youtube.com/shorts/DD0n2nJlbY4?feature=share", "reps": [10, 10, 10, 10], "pauza": "90s"}, {"name": "Extensia tricepsului  cablu", "link": "https://youtube.com/shorts/3kL2khWjchc", "reps": ["max", "max", "max", "max"], "pauza": "90s"}]}, {"day": "PICIOARE/ABDOMEN", "exercises": [{"name": "Hacksquat", "link": "https://youtube.com/shorts/5cY2JOx9xcg", "reps": ["3x6 + AO", "4x6 + AO", "4x6 + AO", 10], "pauza": "2,5m"}, {"name": "Extensii cvadriceps", "link": "https://youtube.com/shorts/p8vm5aqmQ8k", "reps": ["RP", "RP", "RP", 10], "pauza": "R&P"}, {"name": "Mers fandat", "link": "https://youtube.com/shorts/O-ZKGaRcoO0", "reps": ["max", "max", "max", "RP"], "pauza": "90s"}, {"name": "RDL", "link": "https://youtube.com/shorts/9nh9HpFNjaQ", "reps": [10, 10, 10, 10], "pauza": "2,5m"}, {"name": "Flexii femurali", "link": "https://youtube.com/shorts/Ckj7j_fNW48", "reps": ["RP", "RP", "RP", "RP"], "pauza": "R&P"}, {"name": "Ridicari pe varfuri aparat", "link": "https://youtube.com/shorts/-dxxLUTvRF0", "reps": [20, 20, 20, 20], "pauza": "90s"}, {"name": "Abdomene funie", "link": "https://youtube.com/shorts/sPFkRtBJ7-g?feature=share", "reps": [20, 20, 20, 20], "pauza": "90s"}, {"name": "Crunch oblici la cablu", "link": "https://youtube.com/shorts/bvtpHrv45xk?feature=share", "reps": [20, 20, 20, 20], "pauza": "90s"}]}, {"day": "UPPER", "exercises": [{"name": "Impins plan drept bara", "link": "https://youtube.com/shorts/iK_w87KNjiQ", "reps": ["max", "max", "Max", "Max"], "pauza": "20s"}, {"name": "Ramat cablu priza sup", "link": "https://youtube.com/shorts/fO8RncVzAxY", "reps": ["max", "max", "Max", "Max"], "pauza": "2m"}, {"name": "Impins plan drept gantere", "link": "https://youtu.be/XzPeXKXPYMg", "reps": ["max", "max", "Max", "Max"], "pauza": "20s"}, {"name": "Ramat 1 mana", "link": "https://youtube.com/shorts/KIsjJALvnC0", "reps": ["max", "max", "Max", "Max"], "pauza": "2m"}, {"name": "Impins inclinat gantere", "link": "https://youtube.com/shorts/EdObJ_9Jzk0", "reps": ["max", "max", "Max", "Max"], "pauza": "20s"}, {"name": "Tractiuni helcometru supinatie", "link": "https://youtube.com/shorts/1BnXz_RF_Dk", "reps": ["max", "max", "Max", "Max"], "pauza": "2m"}, {"name": "Biceps gantere", "link": "https://youtube.com/shorts/nkOuaHpRDY0", "reps": ["max", "max", "Max", "Max"], "pauza": "2m"}, {"name": "Triceps gantere", "link": "https://youtu.be/Aym9lgoPQv4", "reps": ["max", "max", "Max", "Max"], "pauza": "20s"}, {"name": "Ridicari laterale", "link": "https://youtube.com/shorts/a07sFgop3Ug", "reps": ["max", "max", "Max", "Max"], "pauza": "2m"}]}], "glossary": {"ao": "All out sets – dupa ultima serie grea, 90 de secunde pauza; scazi 30% din greutatea folosita la ultima serie de lucru grea si executi pana la esec fara tempo dar cu amplitudine de miscare maxima.", "R&P": "Rest&Pause technique – se executa nr prescris de rep pana la esec, se ia pauza 20 de sec si se mai executa cu aceasi greutate inca odata cate repetari merg pana la esec. Dupa care pauza 90s.", "max": "Maximum de repetari pana la esec, folosind greutatile cele mai mari din luna precedenta la exercitiul prescris."}}};

// Admin demo: cod client -> luna curenta
const DEFAULT_CLIENTS = {
  "ANDREI23": { name: "Andrei", month: "5" },
};

const RED = "#8C0202";
const KG_STEP = 0.5;
const KG_OPTIONS = Array.from({ length: 480 }, (_, i) => ((i + 1) * KG_STEP).toFixed(1));

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSOJ5YX6giZWHAzl5vnsLRdEmoNgiCWmb6FUlRYSL5UbaFU9mo2JleW7Bo2jn5Wl0CrXjElUovcr5h_/pub?output=csv";

const SHEET_FETCH_URL = SHEET_CSV_URL;

function parseClientsCsv(csvText) {
  const lines = csvText.split(/\r?\n/).filter((l) => l.trim() !== "");
  if (lines.length < 2) return {};
  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
  const codeIdx = headers.indexOf("cod");
  const nameIdx = headers.indexOf("nume");
  const monthIdx = headers.indexOf("luna");
  if (codeIdx === -1 || nameIdx === -1 || monthIdx === -1) return {};

  const result = {};
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(",").map((c) => c.trim());
    const code = (cols[codeIdx] || "").toUpperCase();
    const name = cols[nameIdx] || "";
    const month = (cols[monthIdx] || "").trim();
    if (code && name && month) {
      result[code] = { name, month };
    }
  }
  return result;
}

function useStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch (e) {
      return initial;
    }
  });
  const [loaded, setLoaded] = useState(true);

  const update = async (newVal) => {
    setValue(newVal);
    try {
      localStorage.setItem(key, JSON.stringify(newVal));
    } catch (e) {
      console.error("Storage save failed", e);
    }
  };

  return [value, update, loaded];
}

function WeightDropdown({ value, onChange }) {
  return (
    <select
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value === "" ? null : e.target.value)}
      style={{
        width: "100%",
        padding: "4px 2px",
        fontSize: 13,
        border: "1px solid #d1d5db",
        borderRadius: 4,
        background: value ? "#fff7f7" : "#fff",
        color: "#111",
      }}
    >
      <option value="">–</option>
      {KG_OPTIONS.map((kg) => (
        <option key={kg} value={kg}>{kg}</option>
      ))}
    </select>
  );
}

function ExerciseRow({ exercise, exIdx, blockIdx, weights, onWeightChange, onTermClick, glossary }) {
  const isKnownTerm = (val) => {
    if (val == null) return false;
    const key = String(val).trim();
    return glossary && Object.keys(glossary).some((g) => g.toLowerCase() === key.toLowerCase());
  };

  return (
    <tr style={{ borderBottom: "1px solid #eee" }}>
      <td style={{ padding: "10px 12px", minWidth: 200 }}>
        <a
          href={exercise.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#1d4ed8",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: 14,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          {exercise.name}
          <Play size={13} style={{ flexShrink: 0, opacity: 0.6 }} />
        </a>
      </td>
      {[0, 1, 2, 3].map((wk) => {
        const repVal = exercise.reps[wk];
        const known = isKnownTerm(repVal);
        return (
          <td key={wk} style={{ padding: "8px 8px", textAlign: "center", minWidth: 90 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
              {known ? (
                <button
                  onClick={() => onTermClick(repVal)}
                  style={{
                    fontSize: 12,
                    color: "#8C0202",
                    fontWeight: 700,
                    background: "none",
                    border: "none",
                    textDecoration: "underline",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  {repVal}
                </button>
              ) : (
                <span style={{ fontSize: 12, color: "#6b7280" }}>
                  {repVal != null ? String(repVal) : "–"}
                </span>
              )}
              <WeightDropdown
                value={weights?.[`${blockIdx}-${exIdx}-${wk}`]}
                onChange={(v) => onWeightChange(`${blockIdx}-${exIdx}-${wk}`, v)}
              />
            </div>
          </td>
        );
      })}
      <td style={{ padding: "8px 12px", textAlign: "center", fontSize: 12, color: "#6b7280" }}>
        {exercise.pauza || "–"}
      </td>
    </tr>
  );
}

function DayBlock({ block, blockIdx, weights, onWeightChange, onTermClick, glossary }) {
  const weekLabels = block.week_labels || ["Sapt1", "Sapt2", "Sapt3", "Sapt4"];
  return (
    <div style={{ marginBottom: 28, border: "1px solid #e5e7eb", borderRadius: 10, overflow: "hidden" }}>
      <div
        style={{
          background: RED,
          color: "#f2f2f2",
          padding: "10px 16px",
          fontWeight: 700,
          fontSize: 15,
          letterSpacing: 0.3,
        }}
      >
        {block.day}
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 620 }}>
          <thead>
            <tr style={{ background: "#f9fafb", borderBottom: "2px solid #e5e7eb" }}>
              <th style={{ textAlign: "left", padding: "8px 12px", fontSize: 12, color: "#374151" }}>Exercițiu</th>
              {weekLabels.map((label, i) => (
                <th key={i} style={{ padding: "8px 8px", fontSize: 12, color: "#374151" }}>{label}</th>
              ))}
              <th style={{ padding: "8px 12px", fontSize: 12, color: "#374151" }}>Pauză</th>
            </tr>
          </thead>
          <tbody>
            {block.exercises.map((ex, exIdx) => (
              <ExerciseRow
                key={exIdx}
                exercise={ex}
                exIdx={exIdx}
                blockIdx={blockIdx}
                weights={weights}
                onWeightChange={onWeightChange}
                onTermClick={onTermClick}
                glossary={glossary}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function GlossaryModal({ term, glossary, onClose }) {
  if (!term) return null;
  const showAll = term === "__ALL__";
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 14,
          padding: 24,
          maxWidth: 460,
          width: "100%",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: RED }}>
            {showAll ? "Termeni & Explicații" : term}
          </h3>
          <button onClick={onClose} style={{ border: "none", background: "none", fontSize: 20, cursor: "pointer", color: "#9ca3af" }}>
            ✕
          </button>
        </div>
        {showAll ? (
          Object.entries(glossary).map(([k, v]) => (
            <div key={k} style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#111", marginBottom: 4 }}>{k}</div>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: "#374151", margin: 0 }}>{v}</p>
            </div>
          ))
        ) : (
          <p style={{ fontSize: 14, lineHeight: 1.6, color: "#374151", margin: 0 }}>
            {glossary[Object.keys(glossary).find((g) => g.toLowerCase() === String(term).toLowerCase())] ||
              "Nu există explicație pentru acest termen."}
          </p>
        )}
      </div>
    </div>
  );
}

function ClientView({ client, code, onLogout, logoutLabel = "Deconectare" }) {
  const storageKey = `weights:${code}:${client.month}`;
  const [weights, setWeights, loaded] = useStorage(storageKey, {});
  const [savedFlash, setSavedFlash] = useState(false);
  const [activeTerm, setActiveTerm] = useState(null);
  const monthData = MONTHS_DATA[client.month];
  const glossary = monthData?.glossary || {};

  const handleWeightChange = async (cellKey, value) => {
    const updated = { ...weights, [cellKey]: value };
    await setWeights(updated);
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1200);
  };

  if (!monthData) {
    return (
      <div style={{ padding: 40, textAlign: "center", color: "#6b7280" }}>
        Nu există program încărcat pentru luna {client.month}.
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 16px 60px" }}>
      <GlossaryModal term={activeTerm} glossary={glossary} onClose={() => setActiveTerm(null)} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 0",
          borderBottom: "2px solid #f0f0f0",
          marginBottom: 24,
        }}
      >
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#111" }}>
            {client.name}
          </div>
          <div style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>
            Luna {client.month} de program
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {savedFlash && (
            <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#16a34a", fontWeight: 600 }}>
              <Check size={14} /> Salvat
            </span>
          )}
          {Object.keys(glossary).length > 0 && (
            <button
              onClick={() => setActiveTerm("__ALL__")}
              style={{
                border: "1px solid #d1d5db",
                background: "#fff7f7",
                borderRadius: 8,
                padding: "8px 12px",
                fontSize: 13,
                color: RED,
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Termeni
            </button>
          )}
          <button
            onClick={onLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "none",
              border: "1px solid #d1d5db",
              borderRadius: 8,
              padding: "8px 14px",
              fontSize: 13,
              color: "#374151",
              cursor: "pointer",
            }}
          >
            <LogOut size={14} /> {logoutLabel}
          </button>
        </div>
      </div>

      {!loaded ? (
        <div style={{ textAlign: "center", padding: 40, color: "#9ca3af" }}>Se încarcă...</div>
      ) : (
        monthData.blocks.map((block, idx) => (
          <DayBlock
            key={idx}
            block={block}
            blockIdx={idx}
            weights={weights}
            onWeightChange={handleWeightChange}
            onTermClick={setActiveTerm}
            glossary={glossary}
          />
        ))
      )}

      <div style={{ fontSize: 12, color: "#9ca3af", textAlign: "center", marginTop: 20 }}>
        Apasă pe numele exercițiului pentru a vedea execuția corectă pe YouTube.
      </div>
    </div>
  );
}

function AdminPanel({ clients, onUpdateClients, onClose, onSync, syncStatus, onPreviewMonth }) {
  const [local, setLocal] = useState(clients);
  const [previewMonth, setPreviewMonth] = useState(Object.keys(MONTHS_DATA)[0] || "1");

  useEffect(() => {
    setLocal(clients);
  }, [clients]);

  const updateClient = (code, field, value) => {
    setLocal({ ...local, [code]: { ...local[code], [field]: value } });
  };

  const addClient = () => {
    const newCode = `CLIENT${Object.keys(local).length + 1}`;
    setLocal({ ...local, [newCode]: { name: "Client nou", month: "1" } });
  };

  const removeClient = (code) => {
    const { [code]: _, ...rest } = local;
    setLocal(rest);
  };

  const save = () => {
    onUpdateClients(local);
    onClose();
  };

  const sortedMonths = Object.keys(MONTHS_DATA).sort((a, b) => Number(a) - Number(b));

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 24, border: "1px solid #e5e7eb", borderRadius: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Panou Admin — Clienți</h2>
        <button onClick={onClose} style={{ border: "none", background: "none", color: "#6b7280", cursor: "pointer", fontSize: 13 }}>
          Înapoi
        </button>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
          background: "#fff7f7",
          border: "1px solid #f3d4d4",
          borderRadius: 10,
          padding: "10px 14px",
          marginBottom: 14,
        }}
      >
        <div style={{ fontSize: 13, color: "#374151" }}>
          Previzualizează o lună (fără cod de client)
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <select
            value={previewMonth}
            onChange={(e) => setPreviewMonth(e.target.value)}
            style={{ border: "1px solid #d1d5db", borderRadius: 8, padding: "6px 10px", fontSize: 13 }}
          >
            {sortedMonths.map((m) => (
              <option key={m} value={m}>
                Luna {m}{MONTHS_DATA[m].label ? ` — ${MONTHS_DATA[m].label}` : ""}
              </option>
            ))}
          </select>
          <button
            onClick={() => onPreviewMonth(previewMonth)}
            style={{ border: "none", background: RED, color: "#fff", borderRadius: 8, padding: "6px 14px", fontSize: 13, cursor: "pointer", fontWeight: 600 }}
          >
            Vezi
          </button>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#f9fafb",
          border: "1px solid #e5e7eb",
          borderRadius: 10,
          padding: "10px 14px",
          marginBottom: 18,
        }}
      >
        <div style={{ fontSize: 13, color: "#374151" }}>
          {syncStatus === "syncing" && "Se sincronizează cu Google Sheet..."}
          {syncStatus === "success" && "✅ Sincronizat cu Google Sheet"}
          {syncStatus === "error" && "⚠️ Nu s-a putut sincroniza (verifică linkul/internetul)"}
          {syncStatus === "idle" && "Sursa de adevăr: Google Sheet"}
        </div>
        <button
          onClick={onSync}
          style={{
            border: "1px solid #d1d5db",
            background: "#fff",
            borderRadius: 8,
            padding: "6px 12px",
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          Sincronizează acum
        </button>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
            <th style={{ textAlign: "left", padding: "6px 8px", fontSize: 12, color: "#6b7280" }}>Cod acces</th>
            <th style={{ textAlign: "left", padding: "6px 8px", fontSize: 12, color: "#6b7280" }}>Nume</th>
            <th style={{ textAlign: "left", padding: "6px 8px", fontSize: 12, color: "#6b7280" }}>Luna</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(local).map(([code, c]) => (
            <tr key={code} style={{ borderBottom: "1px solid #f3f4f6" }}>
              <td style={{ padding: "6px 8px", fontFamily: "monospace", fontSize: 13 }}>{code}</td>
              <td style={{ padding: "6px 8px" }}>
                <input
                  value={c.name}
                  onChange={(e) => updateClient(code, "name", e.target.value)}
                  style={{ border: "1px solid #d1d5db", borderRadius: 6, padding: "4px 8px", fontSize: 13, width: "100%" }}
                />
              </td>
              <td style={{ padding: "6px 8px" }}>
                <select
                  value={c.month}
                  onChange={(e) => updateClient(code, "month", e.target.value)}
                  style={{ border: "1px solid #d1d5db", borderRadius: 6, padding: "4px 8px", fontSize: 13 }}
                >
                  {Object.keys(MONTHS_DATA).sort((a,b)=>Number(a)-Number(b)).map((m) => (
                    <option key={m} value={m}>
                      Luna {m}{MONTHS_DATA[m].label ? ` — ${MONTHS_DATA[m].label}` : ""}
                    </option>
                  ))}
                </select>
              </td>
              <td style={{ padding: "6px 8px" }}>
                <button onClick={() => removeClient(code)} style={{ border: "none", background: "none", color: "#dc2626", cursor: "pointer", fontSize: 12 }}>
                  Șterge
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
        <button
          onClick={addClient}
          style={{ border: "1px solid #d1d5db", background: "#fff", borderRadius: 8, padding: "8px 14px", fontSize: 13, cursor: "pointer" }}
        >
          + Adaugă client
        </button>
        <button
          onClick={save}
          style={{ display: "flex", alignItems: "center", gap: 6, border: "none", background: RED, color: "#fff", borderRadius: 8, padding: "8px 14px", fontSize: 13, cursor: "pointer", fontWeight: 600 }}
        >
          <Save size={14} /> Salvează
        </button>
      </div>
      <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 14 }}>
        Editarea clienților aici e temporară — la fiecare sincronizare cu Google Sheet, lista se rescrie cu datele din Sheet. Pentru modificări permanente, editează direct Sheet-ul.
        <br />
        Lunile noi (reformate manual): {Object.keys(MONTHS_DATA).sort((a,b)=>Number(a)-Number(b)).join(", ")}. Se adaugă pe rând, verificate înainte de încărcare.
      </div>
    </div>
  );
}

export default function App() {
  const [clients, setClients, clientsLoaded] = useStorage("clients_map", DEFAULT_CLIENTS);
  const [codeInput, setCodeInput] = useState("");
  const [activeCode, setActiveCode] = useState(null);
  const [error, setError] = useState("");
  const [showAdmin, setShowAdmin] = useState(false);
  const [previewMonth, setPreviewMonth] = useState(null);
  const [syncStatus, setSyncStatus] = useState("idle"); // idle | syncing | success | error

  const syncFromSheet = async () => {
    setSyncStatus("syncing");
    try {
      const res = await fetch(SHEET_FETCH_URL, { cache: "no-store" });
      if (!res.ok) throw new Error("fetch failed");
      const text = await res.text();
      const parsed = parseClientsCsv(text);
      if (Object.keys(parsed).length > 0) {
        await setClients(parsed);
        setSyncStatus("success");
      } else {
        setSyncStatus("error");
      }
    } catch (e) {
      setSyncStatus("error");
    }
  };

  useEffect(() => {
    if (clientsLoaded) {
      syncFromSheet();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientsLoaded]);

  const handleLogin = () => {
    const trimmed = codeInput.trim().toUpperCase();
    if (clients[trimmed]) {
      setActiveCode(trimmed);
      setError("");
    } else {
      setError("Cod invalid. Verifică și încearcă din nou.");
    }
  };

  if (previewMonth) {
    return (
      <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: "#fff", minHeight: "100vh" }}>
        <ClientView
          client={{ name: `Previzualizare`, month: previewMonth }}
          code={`__preview_${previewMonth}`}
          onLogout={() => { setPreviewMonth(null); setShowAdmin(true); }}
          logoutLabel="Înapoi la Admin"
        />
      </div>
    );
  }

  if (showAdmin) {
    return (
      <AdminPanel
        clients={clients}
        onUpdateClients={(c) => setClients(c)}
        onClose={() => setShowAdmin(false)}
        onSync={syncFromSheet}
        syncStatus={syncStatus}
        onPreviewMonth={(m) => { setPreviewMonth(m); setShowAdmin(false); }}
      />
    );
  }

  if (activeCode && clients[activeCode]) {
    return (
      <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: "#fff", minHeight: "100vh" }}>
        <ClientView
          client={clients[activeCode]}
          code={activeCode}
          onLogout={() => { setActiveCode(null); setCodeInput(""); }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        fontFamily: "system-ui, -apple-system, sans-serif",
        minHeight: "100vh",
        background: "#fafafa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div style={{ width: "100%", maxWidth: 380 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: RED,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 14px",
            }}
          >
            <Dumbbell color="#fff" size={28} />
          </div>
          <h1 style={{ fontSize: 20, fontWeight: 800, margin: 0, color: "#111" }}>
            Programul tău de antrenament
          </h1>
          <p style={{ fontSize: 13, color: "#6b7280", marginTop: 6 }}>
            Introdu codul de acces primit de la antrenor
          </p>
        </div>

        <input
          value={codeInput}
          onChange={(e) => setCodeInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          placeholder="Cod acces (ex: ANDREI23)"
          style={{
            width: "100%",
            padding: "12px 14px",
            fontSize: 15,
            border: "1px solid #d1d5db",
            borderRadius: 10,
            marginBottom: 10,
            boxSizing: "border-box",
            textTransform: "uppercase",
          }}
        />
        {error && <div style={{ color: "#dc2626", fontSize: 13, marginBottom: 10 }}>{error}</div>}

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "12px 14px",
            background: RED,
            color: "#fff",
            border: "none",
            borderRadius: 10,
            fontSize: 15,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Intră în program
        </button>

        <button
          onClick={() => setShowAdmin(true)}
          style={{
            width: "100%",
            marginTop: 16,
            padding: "8px",
            background: "none",
            border: "none",
            color: "#9ca3af",
            fontSize: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            cursor: "pointer",
          }}
        >
          <Settings size={13} /> Panou Admin (antrenor)
        </button>

        <div
          style={{
            fontSize: 11,
            color: syncStatus === "error" ? "#dc2626" : "#c4c4c4",
            textAlign: "center",
            marginTop: 18,
          }}
        >
          {syncStatus === "syncing" && "Se actualizează lista de clienți..."}
          {syncStatus === "success" && "Listă de clienți actualizată"}
          {syncStatus === "error" && "Nu s-a putut actualiza lista — se folosesc datele salvate anterior"}
        </div>
      </div>
    </div>
  );
}

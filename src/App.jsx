import React, { useState, useEffect } from "react";
import { LogOut, Settings, Save, Check, Play } from "lucide-react";

const RED = "#8C0202";
const KG_STEP = 0.5;
const KG_OPTIONS = Array.from({ length: 480 }, (_, i) => ((i + 1) * KG_STEP).toFixed(1));

const DEFAULT_CLIENTS = {
  "ANDREI23": { name: "Andrei", month: "5" },
};

const MONTHS_DATA = {"5": {"month": 5, "blocks": [{"day": "Piept/umeri/biceps", "exercises": [{"name": "Impins plan drept bara", "link": "https://youtube.com/shorts/iK_w87KNjiQ", "weeks": [{"cells": [{"type": "normal", "label": "6"}, {"type": "normal", "label": "6"}, {"type": "normal", "label": "6"}, {"type": "ao", "label": "AO"}]}, {"cells": [{"type": "normal", "label": "6"}, {"type": "normal", "label": "6"}, {"type": "normal", "label": "6"}, {"type": "normal", "label": "6"}, {"type": "ao", "label": "AO"}]}, {"cells": [{"type": "normal", "label": "6"}, {"type": "normal", "label": "6"}, {"type": "normal", "label": "6"}, {"type": "normal", "label": "6"}, {"type": "ao", "label": "AO"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}], "pauza": "2,5m"}, {"name": "Impins plan inclinat gantere", "link": "https://youtube.com/shorts/EdObJ_9Jzk0", "weeks": [{"cells": [{"type": "normal", "label": "6"}]}, {"cells": [{"type": "normal", "label": "6"}]}, {"cells": [{"type": "normal", "label": "6"}]}, {"cells": [{"type": "normal", "label": "10"}]}], "pauza": "90s"}, {"name": "Fluturari piept aparat/cablu", "link": "https://youtube.com/shorts/AGTVWjC40zc", "weeks": [{"cells": [{"type": "term", "label": "RP"}]}, {"cells": [{"type": "term", "label": "RP"}]}, {"cells": [{"type": "term", "label": "RP"}]}, {"cells": [{"type": "term", "label": "RP"}]}], "pauza": "90s"}, {"name": "Împins umeri smith", "link": "https://youtube.com/shorts/QRgxPSV5M_w?feature=share", "weeks": [{"cells": [{"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}]}], "pauza": "R&P"}, {"name": "Ridicari laterale", "link": "https://youtube.com/shorts/a07sFgop3Ug", "weeks": [{"cells": [{"type": "term", "label": "RP"}]}, {"cells": [{"type": "term", "label": "RP"}]}, {"cells": [{"type": "term", "label": "RP"}]}, {"cells": [{"type": "term", "label": "RP"}]}], "pauza": "R&P"}, {"name": "Biceps funie", "link": "https://youtube.com/shorts/vDKbfMnjVVg?feature=share", "weeks": [{"cells": [{"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "8"}]}, {"cells": [{"type": "normal", "label": "10"}]}], "pauza": "90s"}, {"name": "Biceps preacher peste cap", "link": "https://youtube.com/shorts/dQc48iDia6c?feature=share", "weeks": [{"cells": [{"type": "term", "label": "max"}]}, {"cells": [{"type": "term", "label": "max"}]}, {"cells": [{"type": "term", "label": "max"}]}, {"cells": [{"type": "term", "label": "max"}]}], "pauza": "90s"}]}, {"day": "Spate/triceps", "exercises": [{"name": "Tractiuni liber/elevator", "link": "https://youtube.com/shorts/xTPtCezuXVo", "weeks": [{"cells": [{"type": "normal", "label": "6"}, {"type": "normal", "label": "6"}, {"type": "normal", "label": "6"}, {"type": "ao", "label": "AO"}]}, {"cells": [{"type": "normal", "label": "6"}, {"type": "normal", "label": "6"}, {"type": "normal", "label": "6"}, {"type": "normal", "label": "6"}, {"type": "ao", "label": "AO"}]}, {"cells": [{"type": "normal", "label": "5"}, {"type": "normal", "label": "5"}, {"type": "normal", "label": "5"}, {"type": "normal", "label": "5"}, {"type": "ao", "label": "AO"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}], "pauza": "2,5m"}, {"name": "Tractiune priza largă", "link": "https://youtube.com/shorts/EaNoQppBMEg?feature=share", "weeks": [{"cells": [{"type": "term", "label": "max"}]}, {"cells": [{"type": "term", "label": "max"}]}, {"cells": [{"type": "term", "label": "max"}]}, {"cells": [{"type": "normal", "label": "10"}]}], "pauza": "60s"}, {"name": "Pulldown sfoara", "link": "https://youtube.com/shorts/jq6TZxqcoWA", "weeks": [{"cells": [{"type": "term", "label": "RP"}]}, {"cells": [{"type": "term", "label": "RP"}]}, {"cells": [{"type": "term", "label": "RP"}]}, {"cells": [{"type": "term", "label": "RP"}]}], "pauza": "R&P"}, {"name": "Ramat cablu cu funia", "link": "https://youtube.com/shorts/rBTwn5QDWwU?feature=share", "weeks": [{"cells": [{"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}]}], "pauza": "90s"}, {"name": "Fluturari deltoid posterior cablu", "link": "https://youtube.com/shorts/4xa7fHpPWV4?feature=share", "weeks": [{"cells": [{"type": "term", "label": "RP"}]}, {"cells": [{"type": "term", "label": "RP"}]}, {"cells": [{"type": "term", "label": "RP"}]}, {"cells": [{"type": "term", "label": "RP"}]}], "pauza": "R&P"}, {"name": "Dips triceps", "link": "https://youtube.com/shorts/DD0n2nJlbY4?feature=share", "weeks": [{"cells": [{"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}]}], "pauza": "90s"}, {"name": "Extensia tricepsului cablu", "link": "https://youtube.com/shorts/3kL2khWjchc", "weeks": [{"cells": [{"type": "term", "label": "max"}]}, {"cells": [{"type": "term", "label": "max"}]}, {"cells": [{"type": "term", "label": "max"}]}, {"cells": [{"type": "term", "label": "max"}]}], "pauza": "90s"}]}, {"day": "PICIOARE/ABDOMEN", "exercises": [{"name": "Hacksquat", "link": "https://youtube.com/shorts/5cY2JOx9xcg", "weeks": [{"cells": [{"type": "normal", "label": "6"}, {"type": "normal", "label": "6"}, {"type": "normal", "label": "6"}, {"type": "ao", "label": "AO"}]}, {"cells": [{"type": "normal", "label": "6"}, {"type": "normal", "label": "6"}, {"type": "normal", "label": "6"}, {"type": "normal", "label": "6"}, {"type": "ao", "label": "AO"}]}, {"cells": [{"type": "normal", "label": "6"}, {"type": "normal", "label": "6"}, {"type": "normal", "label": "6"}, {"type": "normal", "label": "6"}, {"type": "ao", "label": "AO"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}], "pauza": "2,5m"}, {"name": "Extensii cvadriceps", "link": "https://youtube.com/shorts/p8vm5aqmQ8k", "weeks": [{"cells": [{"type": "term", "label": "RP"}]}, {"cells": [{"type": "term", "label": "RP"}]}, {"cells": [{"type": "term", "label": "RP"}]}, {"cells": [{"type": "normal", "label": "10"}]}], "pauza": "R&P"}, {"name": "Mers fandat", "link": "https://youtube.com/shorts/O-ZKGaRcoO0", "weeks": [{"cells": [{"type": "term", "label": "max"}]}, {"cells": [{"type": "term", "label": "max"}]}, {"cells": [{"type": "term", "label": "max"}]}, {"cells": [{"type": "term", "label": "RP"}]}], "pauza": "90s"}, {"name": "RDL", "link": "https://youtube.com/shorts/9nh9HpFNjaQ", "weeks": [{"cells": [{"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}]}], "pauza": "2,5m"}, {"name": "Flexii femurali", "link": "https://youtube.com/shorts/Ckj7j_fNW48", "weeks": [{"cells": [{"type": "term", "label": "RP"}]}, {"cells": [{"type": "term", "label": "RP"}]}, {"cells": [{"type": "term", "label": "RP"}]}, {"cells": [{"type": "term", "label": "RP"}]}], "pauza": "R&P"}, {"name": "Ridicari pe varfuri aparat", "link": "https://youtube.com/shorts/-dxxLUTvRF0", "weeks": [{"cells": [{"type": "normal", "label": "20"}]}, {"cells": [{"type": "normal", "label": "20"}]}, {"cells": [{"type": "normal", "label": "20"}]}, {"cells": [{"type": "normal", "label": "20"}]}], "pauza": "90s"}, {"name": "Abdomene funie", "link": "https://youtube.com/shorts/sPFkRtBJ7-g?feature=share", "weeks": [{"cells": [{"type": "normal", "label": "20"}]}, {"cells": [{"type": "normal", "label": "20"}]}, {"cells": [{"type": "normal", "label": "20"}]}, {"cells": [{"type": "normal", "label": "20"}]}], "pauza": "90s"}, {"name": "Crunch oblici la cablu", "link": "https://youtube.com/shorts/bvtpHrv45xk?feature=share", "weeks": [{"cells": [{"type": "normal", "label": "20"}]}, {"cells": [{"type": "normal", "label": "20"}]}, {"cells": [{"type": "normal", "label": "20"}]}, {"cells": [{"type": "normal", "label": "20"}]}], "pauza": "90s"}]}, {"day": "UPPER", "exercises": [{"name": "Impins plan drept bara", "link": "https://youtube.com/shorts/iK_w87KNjiQ", "weeks": [{"cells": [{"type": "term", "label": "max"}]}, {"cells": [{"type": "term", "label": "max"}]}, {"cells": [{"type": "term", "label": "max"}]}, {"cells": [{"type": "term", "label": "Max"}]}], "pauza": "20s"}, {"name": "Ramat cablu priza sup", "link": "https://youtube.com/shorts/fO8RncVzAxY", "weeks": [{"cells": [{"type": "term", "label": "max"}]}, {"cells": [{"type": "term", "label": "max"}]}, {"cells": [{"type": "term", "label": "max"}]}, {"cells": [{"type": "term", "label": "Max"}]}], "pauza": "2m"}, {"name": "Impins plan drept gantere", "link": "https://youtu.be/XzPeXKXPYMg", "weeks": [{"cells": [{"type": "term", "label": "max"}]}, {"cells": [{"type": "term", "label": "max"}]}, {"cells": [{"type": "term", "label": "max"}]}, {"cells": [{"type": "term", "label": "Max"}]}], "pauza": "20s"}, {"name": "Ramat 1 mana", "link": "https://youtube.com/shorts/KIsjJALvnC0", "weeks": [{"cells": [{"type": "term", "label": "max"}]}, {"cells": [{"type": "term", "label": "max"}]}, {"cells": [{"type": "term", "label": "max"}]}, {"cells": [{"type": "term", "label": "Max"}]}], "pauza": "2m"}, {"name": "Impins inclinat gantere", "link": "https://youtube.com/shorts/EdObJ_9Jzk0", "weeks": [{"cells": [{"type": "term", "label": "max"}]}, {"cells": [{"type": "term", "label": "max"}]}, {"cells": [{"type": "term", "label": "max"}]}, {"cells": [{"type": "term", "label": "Max"}]}], "pauza": "20s"}, {"name": "Tractiuni helcometru supinatie", "link": "https://youtube.com/shorts/1BnXz_RF_Dk", "weeks": [{"cells": [{"type": "term", "label": "max"}]}, {"cells": [{"type": "term", "label": "max"}]}, {"cells": [{"type": "term", "label": "max"}]}, {"cells": [{"type": "term", "label": "Max"}]}], "pauza": "2m"}, {"name": "Biceps gantere", "link": "https://youtube.com/shorts/nkOuaHpRDY0", "weeks": [{"cells": [{"type": "term", "label": "max"}]}, {"cells": [{"type": "term", "label": "max"}]}, {"cells": [{"type": "term", "label": "max"}]}, {"cells": [{"type": "term", "label": "Max"}]}], "pauza": "2m"}, {"name": "Triceps gantere", "link": "https://youtu.be/Aym9lgoPQv4", "weeks": [{"cells": [{"type": "term", "label": "max"}]}, {"cells": [{"type": "term", "label": "max"}]}, {"cells": [{"type": "term", "label": "max"}]}, {"cells": [{"type": "term", "label": "Max"}]}], "pauza": "20s"}, {"name": "Ridicari laterale", "link": "https://youtube.com/shorts/a07sFgop3Ug", "weeks": [{"cells": [{"type": "term", "label": "max"}]}, {"cells": [{"type": "term", "label": "max"}]}, {"cells": [{"type": "term", "label": "max"}]}, {"cells": [{"type": "term", "label": "Max"}]}], "pauza": "2m"}]}], "glossary": {"ao": "All out sets – dupa ultima serie grea, 90 de secunde pauza; scazi 30% din greutatea folosita la ultima serie de lucru grea si executi pana la esec fara tempo dar cu amplitudine de miscare maxima.", "R&P": "Rest&Pause technique – se executa nr prescris de rep pana la esec, se ia pauza 20 de sec si se mai executa cu aceasi greutate inca odata cate repetari merg pana la esec. Dupa care pauza 90s.", "max": "Maximum de repetari pana la esec, folosind greutatile cele mai mari din luna precedenta la exercitiul prescris."}}, "3": {"month": 3, "blocks": [{"day": "Piept/umeri/biceps", "exercises": [{"name": "Impins plan drept presa", "link": "https://youtube.com/shorts/HwR-tCgR23U", "pauza": "2m", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}]}, {"name": "Flotari", "link": "https://youtube.com/shorts/cVztPBLf9Ac", "pauza": "15s", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}]}, {"name": "Skull crushers", "link": "https://youtu.be/Erv2ZILZd2c", "pauza": "2m", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}]}, {"name": "Ridicari frontale gantere", "link": "https://youtube.com/shorts/t2KsEWsqdTk", "pauza": "2m", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}]}, {"name": "Impins umeri presa", "link": "https://youtube.com/shorts/Mx9U-2Ifg_g", "pauza": "15s", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}]}, {"name": "Ridicari laterele gantere", "link": "https://youtube.com/shorts/a07sFgop3Ug", "pauza": "2m", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}]}, {"name": "Flexii biceps gantere/bara stand", "link": "https://youtube.com/shorts/RvNQjYaDHjI", "pauza": "2m", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}]}]}, {"day": "Spate/triceps", "exercises": [{"name": "Tractiuni helcometru", "link": "https://youtube.com/shorts/1BnXz_RF_Dk", "pauza": "15s", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}]}, {"name": "Pulldown cablu cu bara", "link": "https://youtu.be/jq6TZxqcoWA", "pauza": "2m", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}]}, {"name": "Ramat priza larga", "link": "https://youtube.com/shorts/o3HJC9TvnMc", "pauza": "2m", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}]}, {"name": "Facepulls", "link": "https://youtube.com/shorts/cuiTTcIR11Y", "pauza": "15s", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}]}, {"name": "Fluturari din aplecat", "link": "https://youtube.com/shorts/uDnSf0v3WHw", "pauza": "2m", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}]}, {"name": "Extensia tricepsului cu gantere la ceafa", "link": "https://youtu.be/Aym9lgoPQv4", "pauza": "2m", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}]}, {"name": "Extensia tricepsului aparat", "link": "https://youtube.com/shorts/GXr3VXnC_lo", "pauza": "2m", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}]}]}, {"day": "Picioare/abdomen", "exercises": [{"name": "Presa", "link": "https://youtu.be/HSPis3Cwrjw", "pauza": "15s", "weeks": [{"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}, {"name": "Extensii cvadriceps", "link": "https://youtube.com/shorts/p8vm5aqmQ8k", "pauza": "2,5m", "weeks": [{"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}]}, {"name": "Fandare statica", "link": "https://youtube.com/shorts/cNV3z8iTnJw", "pauza": "20s/90s", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}]}, {"name": "RDL", "link": "https://youtube.com/shorts/B-2HA86HN0E", "pauza": "15s", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "8"}, {"type": "normal", "label": "8"}, {"type": "normal", "label": "8"}, {"type": "normal", "label": "8"}]}]}, {"name": "Flexii femurali aparat", "link": "https://youtube.com/shorts/Ckj7j_fNW48", "pauza": "2m", "weeks": [{"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}]}, {"name": "Ridicari de varfuri din sezut", "link": "https://youtube.com/shorts/-dxxLUTvRF0", "pauza": "2m", "weeks": [{"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}]}, {"name": "Abdomene lungi", "link": "https://youtu.be/xWMWAMiF8lk", "pauza": "15s", "weeks": [{"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}]}, {"name": "Abdomene scurte", "link": "https://youtu.be/t_LYyarCrWw", "pauza": "2m", "weeks": [{"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}]}]}, {"day": "Piept/spate/umeri/brate", "exercises": [{"name": "Impins plan inclinat gantere", "link": "https://youtube.com/shorts/EdObJ_9Jzk0", "pauza": "15s", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}]}, {"name": "Fluturari piept aparat", "link": "https://youtube.com/shorts/AGTVWjC40zc", "pauza": "2m", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}]}, {"name": "Pull over", "link": "https://youtu.be/mKOqT_SG4sA", "pauza": "15s", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}]}, {"name": "Fluturari umeri gantere", "link": "https://youtube.com/shorts/FELVhaJU6K4", "pauza": "2m", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}]}, {"name": "Tractiuni helco neutru", "link": "https://youtube.com/shorts/LPCrVP997SQ", "pauza": "15s", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}]}, {"name": "Facepulls cablu", "link": "https://youtube.com/shorts/cuiTTcIR11Y", "pauza": "2m", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}]}, {"name": "Ramat din sezut cablu priza larga", "link": "https://youtube.com/shorts/o3HJC9TvnMc", "pauza": "15s", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}]}, {"name": "Ridicari frontale cu ganterele", "link": "https://youtube.com/shorts/t2KsEWsqdTk", "pauza": "2m", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}]}, {"name": "Flexii biceps aparat", "link": "https://youtube.com/shorts/dtVNhqoXaFQ", "pauza": "15s", "weeks": [{"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}]}, {"name": "Extensia tricepsului gantere din culcat", "link": "https://youtube.com/shorts/Erv2ZILZd2c", "pauza": "2m", "weeks": [{"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}]}]}], "glossary": {}}, "13": {"month": 13, "label": "Razvan gob 2(4 zile)", "blocks": [{"day": "Chest + Tricep", "exercises": [{"name": "Incline hammer strength bench press", "link": "https://youtu.be/sEyUfFDAXHI", "pauza": "2m", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}, {"name": "Champagnes press", "link": "https://youtu.be/z0Pl7gDb-Ig", "pauza": "2m", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}, {"name": "Decline chest press", "link": "https://youtu.be/1nQV42mFYPM", "pauza": "2m", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}, {"name": "Chest press", "link": "https://youtu.be/PLG5GJyPjK8", "pauza": "2m", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}]}, {"name": "Peck deck machine", "link": "https://youtu.be/t8rbphSGuS4", "pauza": "2m", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}, {"name": "Triceps extension with V grip", "link": "https://youtu.be/Z52jDaEoKuQ", "pauza": "2m", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}]}, {"day": "Legs", "exercises": [{"name": "Leg extension", "link": "https://youtube.com/shorts/dJ8kemt3bDI", "pauza": "2m", "weeks": [{"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}]}, {"name": "Leg press with paused", "link": "https://youtube.com/shorts/FQDta9jzajI", "pauza": "2m", "weeks": [{"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}]}, {"name": "Dumbbell sumo squat elevated", "link": "https://youtube.com/shorts/WG7l_0WGpeg", "pauza": "2m", "weeks": [{"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}]}, {"name": "Barbell stiff legged deadlifts", "link": "https://youtube.com/shorts/v97y-LHQTkQ", "pauza": "2m", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}, {"name": "Leg curls machine", "link": "https://youtube.com/shorts/PsAPiMDcvL0", "pauza": "2m", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}, {"name": "Single leg press", "link": "https://youtube.com/shorts/OsCy47iXU1g", "pauza": "2m", "weeks": [{"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}]}, {"name": "Seated calf raise", "link": "https://youtube.com/shorts/-dxxLUTvRF0", "pauza": "2m", "weeks": [{"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}]}]}, {"day": "Back + Bicep", "exercises": [{"name": "Hammer strength low row machine", "link": "https://youtu.be/MikGZOkBREM", "pauza": "2m", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}, {"name": "Dumbbell rows for lower lats", "link": "https://youtu.be/73xzzjpOPQU", "pauza": "2m", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}, {"name": "Lat pull down (with a pause)", "link": "https://youtu.be/dnqfzgf_kqM", "pauza": "2m", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}, {"name": "Wide grip lat pulldown, leaning back", "link": "https://youtu.be/EaNoQppBMEg", "pauza": "2m", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}, {"name": "Pullover with a bar wide grip", "link": "https://youtu.be/sWG7QEX15fo", "pauza": "2m", "weeks": [{"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}]}, {"name": "Biceps curls with a rope", "link": "https://youtu.be/vDKbfMnjVVg", "pauza": "2m", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}, {"name": "Biceps curls with a bar", "link": "https://youtu.be/ZOZBvBU3nYc", "pauza": "2m", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}]}, {"day": "Shoulders", "exercises": [{"name": "Traditional standing lateral", "link": "https://youtu.be/ga-orMq8uVQ", "pauza": "2m", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}, {"name": "Seated cable row for rear delts", "link": "https://youtu.be/Y5cK3LduRRY", "pauza": "2m", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}, {"name": "Barbell upright row braced against bench", "link": "https://youtu.be/bc2UzkQFZiM", "pauza": "2m", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}, {"name": "Standing front raises with dumbbells", "link": "https://youtu.be/-xVOSW_muEs", "pauza": "2m", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}, {"name": "Smith machine press behind the neck", "link": "https://youtu.be/QRgxPSV5M_w", "pauza": "2m", "weeks": [{"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}]}]}], "glossary": {}}, "14": {"month": 14, "label": "Razvan gob 1 (4zile)", "week_labels": ["Crestere volum", "Crestere volum", "Crestere greutate", "DELOAD"], "blocks": [{"day": "Chest", "exercises": [{"name": "dips", "link": "https://youtube.com/shorts/R1dq9Mkop40?feature=share", "pauza": "90s", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}, {"name": "Guillotine incline press", "link": "https://youtube.com/shorts/9oGXz_FTHT4?feature=share", "pauza": "90s", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}, {"name": "Chest press bench", "link": "https://youtube.com/shorts/2TCZ34-JeQY?feature=share", "pauza": "90s", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}, {"name": "decline hammer strength bench press", "link": "https://youtube.com/shorts/66Yxlms96Vg?feature=share", "pauza": "90s", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}, {"name": "Chest flys", "link": "https://youtube.com/shorts/AGTVWjC40zc?feature=share", "pauza": "90s", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}]}, {"name": "rear delt moment on cybex cable stand", "link": "https://youtube.com/shorts/4xa7fHpPWV4?feature=share", "pauza": "90s", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}, {"name": "side lateral rais on incline bench", "link": "https://youtu.be/qjaVZvpS9qE", "pauza": "90s", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}, {"name": "standing barbell front press with paused presses", "link": "https://youtube.com/shorts/KBAb00eN4Nc?feature=share", "pauza": "90s", "weeks": [{"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}]}]}, {"day": "Legs", "exercises": [{"name": "Extensii cvadricepsi cu deschiderea vârfurilor", "link": "https://youtube.com/shorts/dJ8kemt3bDI?feature=share", "pauza": "90s", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}, {"name": "Presa picioare cu pauză jos priza largă vârfuri îndepărtate", "link": "https://youtube.com/shorts/FQDta9jzajI?feature=share", "pauza": "90s", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}, {"name": "Geno cu greutate elevat cu picioarele depărtate", "link": "https://youtube.com/shorts/WG7l_0WGpeg?feature=share", "pauza": "90s", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}, {"name": "Îndreptări românești cu picioare drepte", "link": "https://youtube.com/shorts/v97y-LHQTkQ?feature=share", "pauza": "90s", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}, {"name": "Flexii femurali aparat", "link": "https://youtube.com/shorts/PsAPiMDcvL0?feature=share", "pauza": "90s", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}, {"name": "Presa cu un picior pe lateral", "link": "https://youtube.com/shorts/OsCy47iXU1g?feature=share", "pauza": "90s", "weeks": [{"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}]}, {"name": "21 curls", "link": "https://youtube.com/shorts/GUWmGRuh1P4?feature=share", "pauza": "90s", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}, {"name": "încline dumbbell hummer biceps curls", "link": "https://youtube.com/shorts/WJIZ2O_OQ90?feature=share", "pauza": "90s", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}, {"name": "preacher curl biceps", "link": "https://youtube.com/shorts/uCAot-NRNaE?feature=share", "pauza": "90s", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}]}, {"day": "Back", "exercises": [{"name": "behind the head lat pull down", "link": "https://youtube.com/shorts/4xolENqMSPY?feature=share", "pauza": "90s", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}, {"name": "seated cable row with a rope handle", "link": "https://youtube.com/shorts/rBTwn5QDWwU?feature=share", "pauza": "90s", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}, {"name": "high rows", "link": "https://youtube.com/shorts/4aK_CjnyVik?feature=share", "pauza": "90s", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}, {"name": "dumbbell rows for lower lats", "link": "https://youtube.com/shorts/G2FNXfoqhNU?feature=share", "pauza": "90s", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}, {"name": "Back Partial Deadlifts", "link": "https://youtube.com/shorts/EePUwGqlzAg?feature=share", "pauza": "90s", "weeks": [{"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}, {"cells": [{"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}, {"type": "normal", "label": "15"}]}]}, {"name": "narrow grip ez bar tricp pusdown", "link": "https://youtube.com/shorts/PxeR6lCLYKE?feature=share", "pauza": "90s", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}, {"name": "straight barbell french press", "link": "https://youtube.com/shorts/-5uNnxPiuJI?feature=share", "pauza": "90s", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}, {"name": "Triceps dips", "link": "https://youtube.com/shorts/DD0n2nJlbY4?feature=share", "pauza": "90s", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}]}, {"day": "Shoulders and arms", "exercises": [{"name": "rear delt moment on cybex cable stand", "link": "https://youtube.com/shorts/4xa7fHpPWV4?feature=share", "pauza": "90s", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}, {"name": "cable upright row with pad", "link": "https://youtube.com/shorts/2m7P6Lrz8j4?feature=share", "pauza": "90s", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}, {"name": "traditional standing lateral", "link": "https://youtube.com/shorts/91KdvlthCSQ?feature=share", "pauza": "90s", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}, {"name": "21 curls", "link": "https://youtube.com/shorts/GUWmGRuh1P4?feature=share", "pauza": "90s", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}, {"name": "încline dumbbell hummer biceps curls", "link": "https://youtube.com/shorts/WJIZ2O_OQ90?feature=share", "pauza": "90s", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}, {"name": "preacher curl biceps", "link": "https://youtube.com/shorts/uCAot-NRNaE?feature=share", "pauza": "90s", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}, {"name": "narrow grip ez bar tricp pusdown", "link": "https://youtube.com/shorts/PxeR6lCLYKE?feature=share", "pauza": "90s", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}, {"name": "straight barbell french press", "link": "https://youtube.com/shorts/-5uNnxPiuJI?feature=share", "pauza": "90s", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}, {"name": "Triceps dips", "link": "https://youtube.com/shorts/DD0n2nJlbY4?feature=share", "pauza": "90s", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}]}]}], "glossary": {}}, "6": {"month": 6, "week_labels": ["Get us", "Add volume", "Add kg-decrease vol", "Get us"], "use_rowspan_groups": true, "blocks": [{"day": "PIEPT/UMERI/BRATE", "exercises": [{"name": "Impins plan drept presa", "group_id": "impins_piept", "link": "https://youtube.com/shorts/HwR-tCgR23U?feature=share", "weeks": [{"cells": [{"type": "normal", "label": "5"}, {"type": "normal", "label": "5"}, {"type": "normal", "label": "5"}]}, {"cells": [{"type": "normal", "label": "5"}, {"type": "normal", "label": "5"}, {"type": "normal", "label": "5"}]}, {"cells": [{"type": "normal", "label": "5"}, {"type": "normal", "label": "5"}, {"type": "normal", "label": "5"}]}, {"cells": [{"type": "normal", "label": "5"}, {"type": "normal", "label": "5"}, {"type": "normal", "label": "5"}]}], "pauza": "90s"}, {"name": "Impins plan drept presa", "group_id": "impins_piept", "link": "https://youtube.com/shorts/HwR-tCgR23U?feature=share", "weeks": [{"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}], "pauza": null}, {"name": "Impins plan drept presa", "group_id": "impins_piept", "link": "https://youtube.com/shorts/HwR-tCgR23U?feature=share", "weeks": [{"cells": [{"type": "normal", "label": "20"}, {"type": "normal", "label": "20"}]}, {"cells": [{"type": "normal", "label": "20"}, {"type": "normal", "label": "20"}]}, {"cells": [{"type": "normal", "label": "20"}, {"type": "normal", "label": "20"}]}, {"cells": [{"type": "normal", "label": "20"}, {"type": "normal", "label": "20"}]}], "pauza": null}, {"name": "Impins plan inclinat", "link": "https://youtube.com/shorts/9vqkpWlSPXU?feature=share", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "90s"}, {"name": "Fluturari piept sus in jos", "link": "https://youtube.com/shorts/0YvvKTF9RX8?feature=share", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "90s"}, {"name": "Fluturari piept aparat umeriilor", "link": "https://youtube.com/shorts/AGTVWjC40zc?feature=share", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "90s"}, {"name": "Face pulls", "link": "https://youtube.com/shorts/cuiTTcIR11Y?feature=share", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "90s"}, {"name": "Ridicari laterale", "link": "https://youtube.com/shorts/LhHd3MeqBa8?feature=share", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "90s"}, {"name": "Flexii Biceps bara/gantere", "link": "https://youtube.com/shorts/nkOuaHpRDY0?feature=share", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "90s"}, {"name": "Flexii biceps tip Ciocan", "link": "https://youtube.com/shorts/6KpwnFbBISo?feature=share", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "90s"}]}, {"day": "Spate/tri", "exercises": [{"name": "Tractiuni liber/elevator", "group_id": "tractiuni_spate", "link": "https://youtube.com/shorts/woAEZ6y4f1A?feature=share", "weeks": [{"cells": [{"type": "normal", "label": "5"}, {"type": "normal", "label": "5"}, {"type": "normal", "label": "5"}]}, {"cells": [{"type": "normal", "label": "5"}, {"type": "normal", "label": "5"}, {"type": "normal", "label": "5"}]}, {"cells": [{"type": "normal", "label": "5"}, {"type": "normal", "label": "5"}, {"type": "normal", "label": "5"}]}, {"cells": [{"type": "normal", "label": "5"}, {"type": "normal", "label": "5"}, {"type": "normal", "label": "5"}]}], "pauza": "90s"}, {"name": "Tractiuni liber/elevator", "group_id": "tractiuni_spate", "link": "https://youtube.com/shorts/woAEZ6y4f1A?feature=share", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": null}, {"name": "Tractiuni helcometru supinat", "link": "https://youtube.com/shorts/1BnXz_RF_Dk?feature=share", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "90s"}, {"name": "Pulldown cablu", "link": "https://youtube.com/shorts/jq6TZxqcoWA?feature=share", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "90s"}, {"name": "Ramat cablu sezut priza supinata", "link": "https://youtube.com/shorts/fO8RncVzAxY?feature=share", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "90s"}, {"name": "Fluturari spate alternativ", "link": "https://youtube.com/shorts/--aMHqDHI_I?feature=share", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "90s"}, {"name": "Triceps extension la ceafa cu gantera", "link": "https://youtu.be/Aym9lgoPQv4", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "90s"}, {"name": "Triceps extension aparat", "link": "https://youtube.com/shorts/GXr3VXnC_lo?feature=share", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "90s"}]}, {"day": "Picioare/ABS", "exercises": [{"name": "Hacksquat/Presa picioare", "group_id": "hacksquat", "link": "https://youtube.com/shorts/5cY2JOx9xcg?feature=share", "weeks": [{"cells": [{"type": "normal", "label": "5"}, {"type": "normal", "label": "5"}, {"type": "normal", "label": "5"}]}, {"cells": [{"type": "normal", "label": "5"}, {"type": "normal", "label": "5"}, {"type": "normal", "label": "5"}]}, {"cells": [{"type": "normal", "label": "5"}, {"type": "normal", "label": "5"}, {"type": "normal", "label": "5"}]}, {"cells": [{"type": "normal", "label": "5"}, {"type": "normal", "label": "5"}, {"type": "normal", "label": "5"}]}], "pauza": "90s"}, {"name": "Hacksquat/Presa picioare", "group_id": "hacksquat", "link": "https://youtube.com/shorts/5cY2JOx9xcg?feature=share", "weeks": [{"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}, {"cells": [{"type": "normal", "label": "10"}, {"type": "normal", "label": "10"}]}], "pauza": null}, {"name": "Hacksquat/Presa picioare", "group_id": "hacksquat", "link": "https://youtube.com/shorts/5cY2JOx9xcg?feature=share", "weeks": [{"cells": [{"type": "normal", "label": "20"}, {"type": "normal", "label": "20"}]}, {"cells": [{"type": "normal", "label": "20"}, {"type": "normal", "label": "20"}]}, {"cells": [{"type": "normal", "label": "20"}, {"type": "normal", "label": "20"}]}, {"cells": [{"type": "normal", "label": "20"}, {"type": "normal", "label": "20"}]}], "pauza": null}, {"name": "Extensii cvadriceps", "link": "https://youtube.com/shorts/p8vm5aqmQ8k?feature=share", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "90s"}, {"name": "RDL", "link": "https://youtube.com/shorts/L2wndlOGUaA?feature=share", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "90s"}, {"name": "Flexii femurali", "link": "https://youtube.com/shorts/Ckj7j_fNW48?feature=share", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "90s"}, {"name": "Ridicari pe varfuri", "link": "https://youtube.com/shorts/-dxxLUTvRF0?feature=share", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "90s"}, {"name": "Abdomene lungi", "link": "https://youtube.com/shorts/c9H9VHzjXzA?feature=share", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "90s"}, {"name": "Abdomene scurte", "link": "https://youtu.be/t_LYyarCrWw", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "90s"}]}, {"day": "UPPER", "exercises": [{"name": "Impins plan drept presa", "link": "https://youtube.com/shorts/HwR-tCgR23U?feature=share", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "90s"}, {"name": "Impins plan inclinat", "link": "https://youtube.com/shorts/9vqkpWlSPXU?feature=share", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "90s"}, {"name": "Fluturari piept de jos in sus", "link": "https://youtube.com/shorts/uaxVRTTrbi8?feature=share", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "90s"}, {"name": "Ramat sezut cablu priza supinata", "link": "https://youtube.com/shorts/fO8RncVzAxY?feature=share", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "90s"}, {"name": "Tractiuni helcometru/aparat", "link": "https://youtube.com/shorts/1BnXz_RF_Dk?feature=share", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "90s"}, {"name": "Pulldown cablu", "link": "https://youtube.com/shorts/jq6TZxqcoWA?feature=share", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "90s"}, {"name": "Flexii Biceps bara/gantere", "link": "https://youtube.com/shorts/nkOuaHpRDY0?feature=share", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "90s"}, {"name": "Triceps extension aparat", "link": "https://youtube.com/shorts/GXr3VXnC_lo?feature=share", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "90s"}, {"name": "Ridicari laterale", "link": "https://youtube.com/shorts/LhHd3MeqBa8?feature=share", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "90s"}]}], "glossary": {"Tempo": "Respecti tempo-ul de 3 sec excentric, 1 izometrie in pozitia prescrisa si 1 sec pe concentric. Doar 2 serii in fiecare saptamana.", "Intensitate": "Incearca sa maresti tempo-ul pe excentric sau adauga 1 sec in pozitia de izometrie recomandata! Seriile trebuie sa fie super controlate si greutatile cele mai mari inregistrate de pana acum.", "Greutate mica": "Greutate mica probabil 30% din greutatea maxima pe care o gestionezi; executi fara tempo dar cu amplitudinea miscarii maxima, NU SCURTEZI CURSA, repetarile sa fie foarte energice."}}, "7": {"month": 7, "week_labels": ["Get us", "Add volume", "Get us", "Add volume"], "use_rowspan_groups": true, "blocks": [{"day": "PIEPT/UMERI/BRATE", "exercises": [{"name": "Impins plan drept presa", "link": "https://youtube.com/shorts/HwR-tCgR23U", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "20s", "group_id": "giant_1_1", "pauza_display": false}, {"name": "Impins plan inclinat gantere", "link": "https://youtube.com/shorts/EdObJ_9Jzk0", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "20s", "group_id": "giant_1_1", "pauza_display": false}, {"name": "Fluturari piept presa", "link": "https://youtube.com/shorts/AGTVWjC40zc", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "120s", "group_id": "giant_1_1", "pauza_display": true}, {"name": "Impins umeri presa", "link": "https://youtube.com/shorts/Mx9U-2Ifg_g", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "20s", "group_id": "giant_1_2", "pauza_display": false}, {"name": "Ridicari frontale gantere", "link": "https://youtube.com/shorts/t2KsEWsqdTk", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "20s", "group_id": "giant_1_2", "pauza_display": false}, {"name": "Ridicari laterale cablu", "link": "https://youtube.com/shorts/a07sFgop3Ug", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "120s", "group_id": "giant_1_2", "pauza_display": true}, {"name": "Flotari cu ridicare palme", "link": "https://youtube.com/shorts/szrD1Cy56d4", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "20s", "group_id": "giant_1_3", "pauza_display": false}, {"name": "Biceps alternative iso hold", "link": "https://youtube.com/shorts/q2lW3UkBH6E", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "20s", "group_id": "giant_1_3", "pauza_display": false}, {"name": "Biceps aparat", "link": "https://youtube.com/shorts/dtVNhqoXaFQ", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "120s", "group_id": "giant_1_3", "pauza_display": true}]}, {"day": "SPATE/TRI", "exercises": [{"name": "Tractiuni la liber/elevator", "link": "https://youtube.com/shorts/woAEZ6y4f1A", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "20s", "group_id": "giant_2_1", "pauza_display": false}, {"name": "Tractiune priza supinata", "link": "https://youtube.com/shorts/1BnXz_RF_Dk", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "20s", "group_id": "giant_2_1", "pauza_display": false}, {"name": "Ramat priza neutra", "link": "https://youtube.com/shorts/oAqAd1uahPU", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "120s", "group_id": "giant_2_1", "pauza_display": true}, {"name": "Pulldown cablu", "link": "https://youtube.com/shorts/jq6TZxqcoWA", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "20s", "group_id": "giant_2_2", "pauza_display": false}, {"name": "Face pulls", "link": "https://youtube.com/shorts/cuiTTcIR11Y", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "20s", "group_id": "giant_2_2", "pauza_display": false}, {"name": "Fluturari din aplecat/aparat", "link": "https://youtube.com/shorts/uDnSf0v3WHw", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "120s", "group_id": "giant_2_2", "pauza_display": true}, {"name": "Ramat umeri aparat", "link": "https://youtube.com/shorts/JVadcfCXVXw", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "20s", "group_id": "giant_2_3", "pauza_display": false}, {"name": "Ext tricepsului la ceafa", "link": "https://youtu.be/Aym9lgoPQv4", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "20s", "group_id": "giant_2_3", "pauza_display": false}, {"name": "Pushdown cu bara triceps cablu", "link": "https://youtube.com/shorts/3kL2khWjchc", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "120s", "group_id": "giant_2_3", "pauza_display": true}]}, {"day": "PICIOARE/ABS", "exercises": [{"name": "Hacksquat", "link": "https://youtube.com/shorts/5cY2JOx9xcg", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "20s", "group_id": "giant_3_1", "pauza_display": false}, {"name": "Mers fandat", "link": "https://youtube.com/shorts/O-ZKGaRcoO0", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "20s", "group_id": "giant_3_1", "pauza_display": false}, {"name": "Extensii cvadriceps", "link": "https://youtube.com/shorts/p8vm5aqmQ8k", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "120s", "group_id": "giant_3_1", "pauza_display": true}, {"name": "Adductori", "link": "https://youtube.com/shorts/EiyabFDCyRU", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "20s", "group_id": "giant_3_2", "pauza_display": false}, {"name": "RDL", "link": "https://youtube.com/shorts/L2wndlOGUaA", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "20s", "group_id": "giant_3_2", "pauza_display": false}, {"name": "Flexii femurali", "link": "https://youtube.com/shorts/Ckj7j_fNW48", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "120s", "group_id": "giant_3_2", "pauza_display": true}, {"name": "Ridicari pe varfuri", "link": "https://youtube.com/shorts/-dxxLUTvRF0", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "20s", "group_id": "giant_3_3", "pauza_display": false}, {"name": "Ridicari picioare", "link": "https://youtube.com/shorts/uMCPIvO5WSI", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "20s", "group_id": "giant_3_3", "pauza_display": false}, {"name": "Russian twist", "link": "https://youtube.com/shorts/lpjpPZt63X4", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "120s", "group_id": "giant_3_3", "pauza_display": true}]}, {"day": "UPPER", "exercises": [{"name": "Impins plan inc presa", "link": "https://youtube.com/shorts/9vqkpWlSPXU", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "20s", "group_id": "super_4_1", "pauza_display": false}, {"name": "Ramat priza larga", "link": "https://youtube.com/shorts/o3HJC9TvnMc", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "2m", "group_id": "super_4_1", "pauza_display": true}, {"name": "Tractiuni helcometru neutru", "link": "https://youtube.com/shorts/LPCrVP997SQ", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "20s", "group_id": "super_4_2", "pauza_display": false}, {"name": "Impins umeri presa", "link": "https://youtube.com/shorts/Mx9U-2Ifg_g", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "2m", "group_id": "super_4_2", "pauza_display": true}, {"name": "Fluturari umeri gantere", "link": "https://youtube.com/shorts/a07sFgop3Ug", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "20s", "group_id": "super_4_3", "pauza_display": false}, {"name": "Biceps gantere", "link": "https://youtube.com/shorts/nkOuaHpRDY0", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "2m", "group_id": "super_4_3", "pauza_display": true}, {"name": "Triceps aparat", "link": "https://youtube.com/shorts/GXr3VXnC_lo", "weeks": [{"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}, {"cells": [{"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}, {"type": "normal", "label": "12"}]}], "pauza": "90s", "pauza_display": true}]}], "glossary": {"Giant Set": "Primele 3 zile sunt organizate ca giant set: executi câte 3 exercitii consecutive fara pauza intre ele, pauza se ia doar dupa toate cele 3 exercitii.", "Get us": "Saptamana de obisnuire: 3 serii per exercitiu, focus pe forma corecta.", "Add volume": "Saptamana de crestere a volumului: 4 serii per exercitiu.", "Superset Ziua 4": "La ziua 4 (UPPER), primele 6 exercitii se executa in superset: 2 exercitii consecutive fara pauza intre ele (ex. Impins + Ramat), pauza se ia dupa ambele. Ultimul exercitiu (Triceps aparat) se executa singur."}}, "8": {"month": 8, "week_labels": ["Sapt1 x3", "Sapt2 x4", "Sapt3 x4", "Sapt4 x3"], "use_rowspan_groups": true, "blocks": [{"day": "PIEPT/UMERI/BRATE", "exercises": [{"name": "Impins plan drept bara/presa", "group_id": "impins_piept_8", "link": "https://youtube.com/shorts/HwR-tCgR23U", "label": "clauster", "weeks": [{"cells": [{"type": "term", "label": "clauster"}, {"type": "normal", "label": "4-4-4"}, {"type": "normal", "label": "4-4-4"}, {"type": "normal", "label": "4-4-4"}]}, {"cells": [{"type": "term", "label": "clauster"}, {"type": "normal", "label": "4-4-4"}, {"type": "normal", "label": "4-4-4"}, {"type": "normal", "label": "4-4-4"}, {"type": "normal", "label": "4-4-4"}]}, {"cells": [{"type": "term", "label": "clauster"}, {"type": "normal", "label": "4-4-4"}, {"type": "normal", "label": "4-4-4"}, {"type": "normal", "label": "4-4-4"}, {"type": "normal", "label": "4-4-4"}]}, {"cells": [{"type": "term", "label": "clauster"}, {"type": "normal", "label": "4-4-4"}, {"type": "normal", "label": "4-4-4"}, {"type": "normal", "label": "4-4-4"}]}], "pauza": "90s"}, {"name": "Impins plan drept bara/presa", "group_id": "impins_piept_8", "link": "https://youtube.com/shorts/HwR-tCgR23U", "label": "met", "weeks": [{"cells": [{"type": "term", "label": "met"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "met"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "met"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "met"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}], "pauza": null}, {"name": "Impins inclinat gantere/presa", "link": "https://youtube.com/shorts/9vqkpWlSPXU", "label": "max", "weeks": [{"cells": [{"type": "term", "label": "max"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "max"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "max"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "max"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}], "pauza": "90s"}, {"name": "Fluturari aparat/cablu/gantere", "link": "https://youtube.com/shorts/AGTVWjC40zc", "label": "max", "weeks": [{"cells": [{"type": "term", "label": "max"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "max"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "max"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "max"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}], "pauza": "90s"}, {"name": "Ridicari laterale cu gantere", "link": "https://youtube.com/shorts/LhHd3MeqBa8", "label": "DROP", "weeks": [{"cells": [{"type": "term", "label": "DROP"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "DROP"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "DROP"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "DROP"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}], "pauza": "90s"}, {"name": "Biceps 21", "link": "https://youtube.com/shorts/nkOuaHpRDY0", "label": "7 7 7", "weeks": [{"cells": [{"type": "term", "label": "7 7 7"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "7 7 7"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "7 7 7"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "7 7 7"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}], "pauza": "90s"}]}, {"day": "Spate/Tri", "exercises": [{"name": "Tractiuni liber/elevator/helcometru neutru", "group_id": "tractiuni_8", "link": "https://youtube.com/shorts/woAEZ6y4f1A", "label": "clauster", "weeks": [{"cells": [{"type": "term", "label": "clauster"}, {"type": "normal", "label": "4-4-4"}, {"type": "normal", "label": "4-4-4"}, {"type": "normal", "label": "4-4-4"}]}, {"cells": [{"type": "term", "label": "clauster"}, {"type": "normal", "label": "4-4-4"}, {"type": "normal", "label": "4-4-4"}, {"type": "normal", "label": "4-4-4"}, {"type": "normal", "label": "4-4-4"}]}, {"cells": [{"type": "term", "label": "clauster"}, {"type": "normal", "label": "4-4-4"}, {"type": "normal", "label": "4-4-4"}, {"type": "normal", "label": "4-4-4"}, {"type": "normal", "label": "4-4-4"}]}, {"cells": [{"type": "term", "label": "clauster"}, {"type": "normal", "label": "4-4-4"}, {"type": "normal", "label": "4-4-4"}, {"type": "normal", "label": "4-4-4"}]}], "pauza": "90s"}, {"name": "Tractiuni liber/elevator/helcometru neutru", "group_id": "tractiuni_8", "link": "https://youtube.com/shorts/woAEZ6y4f1A", "label": "met", "weeks": [{"cells": [{"type": "term", "label": "met"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "met"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "met"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "met"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}], "pauza": null}, {"name": "Ramat cablu priza larga", "link": "https://youtube.com/shorts/fO8RncVzAxY", "label": "8", "weeks": [{"cells": [{"type": "term", "label": "8"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "8"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "8"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "8"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}], "pauza": "90s"}, {"name": "Fluturari din aplecat/aparat spate", "link": "https://youtube.com/shorts/--aMHqDHI_I", "label": "DROP", "weeks": [{"cells": [{"type": "term", "label": "DROP"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "DROP"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "DROP"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "DROP"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}], "pauza": "90s"}, {"name": "Extensia tricepsului cu gantera la ceafa", "link": "https://youtu.be/Aym9lgoPQv4", "label": "10+", "weeks": [{"cells": [{"type": "term", "label": "10+"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "10+"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "10+"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "10+"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}], "pauza": "90s"}, {"name": "Extensia tricepsului cu 2 sfori cablu", "link": "https://youtube.com/shorts/GXr3VXnC_lo", "label": "max", "weeks": [{"cells": [{"type": "term", "label": "max"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "max"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "max"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "max"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}], "pauza": "90s"}]}, {"day": "PICIOARE/ABS", "exercises": [{"name": "Presa/Hacksquat", "group_id": "presa_8", "link": "https://youtube.com/shorts/5cY2JOx9xcg", "label": "clauster", "weeks": [{"cells": [{"type": "term", "label": "clauster"}, {"type": "normal", "label": "4-4-4"}, {"type": "normal", "label": "4-4-4"}, {"type": "normal", "label": "4-4-4"}]}, {"cells": [{"type": "term", "label": "clauster"}, {"type": "normal", "label": "4-4-4"}, {"type": "normal", "label": "4-4-4"}, {"type": "normal", "label": "4-4-4"}, {"type": "normal", "label": "4-4-4"}]}, {"cells": [{"type": "term", "label": "clauster"}, {"type": "normal", "label": "4-4-4"}, {"type": "normal", "label": "4-4-4"}, {"type": "normal", "label": "4-4-4"}, {"type": "normal", "label": "4-4-4"}]}, {"cells": [{"type": "term", "label": "clauster"}, {"type": "normal", "label": "4-4-4"}, {"type": "normal", "label": "4-4-4"}, {"type": "normal", "label": "4-4-4"}]}], "pauza": "90s"}, {"name": "Presa/Hacksquat", "group_id": "presa_8", "link": "https://youtube.com/shorts/5cY2JOx9xcg", "label": "met", "weeks": [{"cells": [{"type": "term", "label": "met"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "met"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "met"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "met"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}], "pauza": null}, {"name": "Leg extension", "link": "https://youtube.com/shorts/p8vm5aqmQ8k", "label": "DROP", "weeks": [{"cells": [{"type": "term", "label": "DROP"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "DROP"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "DROP"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "DROP"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}], "pauza": "90s"}, {"name": "RDL/Hipthrust", "link": "https://youtube.com/shorts/L2wndlOGUaA", "label": "8", "weeks": [{"cells": [{"type": "term", "label": "8"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "8"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "8"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "8"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}], "pauza": "90s"}, {"name": "Flexii aparat", "link": "https://youtube.com/shorts/Ckj7j_fNW48", "label": "max", "weeks": [{"cells": [{"type": "term", "label": "max"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "max"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "max"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "max"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}], "pauza": "90s"}, {"name": "Ridicari pe varfuri la aparat", "link": "https://youtube.com/shorts/-dxxLUTvRF0", "label": "max", "weeks": [{"cells": [{"type": "term", "label": "max"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "max"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "max"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "max"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}], "pauza": "90s"}, {"name": "Abdomene aparat", "link": "https://youtube.com/shorts/c9H9VHzjXzA", "label": "max", "weeks": [{"cells": [{"type": "term", "label": "max"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "max"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "max"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "max"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}], "pauza": "90s"}, {"name": "Abdomene oblici cu greutate", "link": "https://youtu.be/t_LYyarCrWw", "label": "max", "weeks": [{"cells": [{"type": "term", "label": "max"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "max"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "max"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "max"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}], "pauza": "90s"}]}, {"day": "Umeri/Brate", "exercises": [{"name": "Impins umeri presa", "link": "https://youtube.com/shorts/Mx9U-2Ifg_g", "label": "8", "weeks": [{"cells": [{"type": "term", "label": "8"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "8"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "8"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "8"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}], "pauza": "90s"}, {"name": "Ridicari laterale gantere", "link": "https://youtube.com/shorts/LhHd3MeqBa8", "label": "12+", "weeks": [{"cells": [{"type": "term", "label": "12+"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "12+"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "12+"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "12+"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}], "pauza": "90s"}, {"name": "Ridicare frontala cu discul/cablu sfoara", "link": "https://youtube.com/shorts/t2KsEWsqdTk", "label": "12+", "weeks": [{"cells": [{"type": "term", "label": "12+"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "12+"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "12+"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "12+"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}], "pauza": "90s"}, {"name": "Ramat umeri bara ez/gantere", "link": "https://youtube.com/shorts/JVadcfCXVXw", "label": "12+", "weeks": [{"cells": [{"type": "term", "label": "12+"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "12+"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "12+"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "12+"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}], "pauza": "90s"}, {"name": "Ridicari laterale la cablu in cross", "link": "https://youtube.com/shorts/a07sFgop3Ug", "label": "max", "weeks": [{"cells": [{"type": "term", "label": "max"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "max"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "max"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "max"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}], "pauza": "90s"}, {"name": "Flexii Biceps alternative cu iso hold", "link": "https://youtube.com/shorts/q2lW3UkBH6E", "label": "max", "weeks": [{"cells": [{"type": "term", "label": "max"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "max"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "max"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "max"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}], "pauza": "90s"}, {"name": "Triceps pressdown cablu bara", "link": "https://youtube.com/shorts/3kL2khWjchc", "label": "12+", "weeks": [{"cells": [{"type": "term", "label": "12+"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "12+"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "12+"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}, {"cells": [{"type": "term", "label": "12+"}, {"type": "normal", "label": "–"}, {"type": "normal", "label": "–"}]}], "pauza": "90s"}]}], "glossary": {"clauster": "Cluster set: faci 4 repetari, pauza scurta de 10-15 sec, apoi inca 4 repetari. Greutatea ramane aceeasi, pauza scurta iti permite sa folosesti greutati mai mari decat normal.", "met": "Serie metabolica: 2 serii executate pana la epuizare (cat mai multe repetari posibile). Folosesti 35% mai putin decat la ultima serie de cluster, executie rapida si energica.", "DROP": "Dropset executat la fiecare serie: incepi cu greutate mare (6 rep), fara pauza scazi greutatea si faci 8 rep, fara pauza scazi din nou si faci 12 rep cu greutate mica. Total 3 greutati consecutive.", "max": "Executa cat mai multe repetari cu forma corecta pana la epuizare.", "7 7 7": "Biceps 21: primele 7 repetari lente (sus si jos), urmatoarele 7 mai rapide, ultimele 7 cat poti sa le duci la capat.", "10+": "Minim 10 repetari, continua daca poti.", "12+": "Minim 12 repetari, continua daca poti.", "8": "Executa exact 8 repetari controlat.", "X": "Seria nu se executa in aceasta saptamana."}}};

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSOJ5YX6giZWHAzl5vnsLRdEmoNgiCWmb6FUlRYSL5UbaFU9mo2JleW7Bo2jn5Wl0CrXjElUovcr5h_/pub?output=csv";

const HISTORY_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwCzVVGKgD8t1y2QrJMx_kwMRfZ46DpoxTF0omQEfh0FjvijulNQRMPB05MmoChzgGNgQ/exec";

const HISTORY_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQhMLcwtjjuIooQdRJiT_x5KEQiiApObEmipjtck_rC6ddlGuN2gEOzHA779U2UTx0KLYxhwXzDFP7e/pub?output=csv";

function parseHistoryCsv(csvText) {
  const lines = csvText.split(/\r?\n/).filter((l) => l.trim() !== "");
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
  const idx = (name) => headers.indexOf(name);
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(",");
    rows.push({
      cod_client: (cols[idx("cod_client")] || "").trim(),
      luna: (cols[idx("luna")] || "").trim(),
      exercitiu: (cols[idx("exercitiu")] || "").trim(),
      saptamana: (cols[idx("saptamana")] || "").trim(),
      serie: (cols[idx("serie")] || "").trim(),
      greutate: (cols[idx("greutate")] || "").trim(),
      data: (cols[idx("data")] || "").trim(),
    });
  }
  return rows;
}

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
  const [loaded] = useState(true);

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
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      style={{
        border: "1px solid #d1d5db",
        borderRadius: 6,
        padding: "4px 2px",
        fontSize: 12,
        width: 56,
        background: "#fff",
        color: value ? "#111" : "#9ca3af",
      }}
    >
      <option value="">–</option>
      {KG_OPTIONS.map((kg) => (
        <option key={kg} value={kg}>
          {kg}
        </option>
      ))}
    </select>
  );
}

function isKnownTerm(val, glossary) {
  if (val == null) return false;
  const key = String(val).trim();
  return glossary && Object.keys(glossary).some((g) => g.toLowerCase() === key.toLowerCase());
}

function parsePauzaSeconds(pauzaStr) {
  if (!pauzaStr) return null;
  const s = String(pauzaStr).trim().toLowerCase().replace(",", ".");
  const mMatch = s.match(/^([\d.]+)\s*m$/);
  if (mMatch) return Math.round(parseFloat(mMatch[1]) * 60);
  const sMatch = s.match(/^([\d.]+)\s*s$/);
  if (sMatch) return Math.round(parseFloat(sMatch[1]));
  return null;
}

function PauzaTimer({ pauza }) {
  const totalSeconds = parsePauzaSeconds(pauza);
  const [remaining, setRemaining] = useState(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (remaining === null) return;
    if (remaining <= 0) {
      setDone(true);
      if (navigator.vibrate) {
        navigator.vibrate([300, 100, 300]);
      }
      const resetTimer = setTimeout(() => {
        setRemaining(null);
        setDone(false);
      }, 2000);
      return () => clearTimeout(resetTimer);
    }
    const t = setTimeout(() => setRemaining(remaining - 1), 1000);
    return () => clearTimeout(t);
  }, [remaining]);

  if (totalSeconds == null) {
    return <span style={{ fontSize: 12, color: "#6b7280" }}>{pauza || "–"}</span>;
  }

  const start = () => {
    setDone(false);
    setRemaining(totalSeconds);
  };

  if (remaining === null) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
        <span style={{ fontSize: 12, color: "#6b7280" }}>{pauza}</span>
        <button
          onClick={start}
          style={{
            border: "1px solid #d1d5db",
            background: "#fff",
            borderRadius: 6,
            padding: "2px 8px",
            fontSize: 10,
            color: RED,
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Start
        </button>
      </div>
    );
  }

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const display = `${mins}:${String(secs).padStart(2, "0")}`;

  return (
    <div
      onClick={start}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        cursor: "pointer",
      }}
    >
      <span
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: done ? "#16a34a" : RED,
          animation: done ? "pulse 0.8s infinite" : "none",
        }}
      >
        {done ? "Gata!" : display}
      </span>
      <span style={{ fontSize: 9, color: "#9ca3af" }}>{done ? "" : "anulează"}</span>
    </div>
  );
}

function ExerciseRow({ exercise, exIdx, blockIdx, weights, onWeightChange, onTermClick, glossary, maxColsPerWeek }) {
  return (
    <tr style={{ borderBottom: "1px solid #eee" }}>
      <td style={{ padding: "10px 12px", minWidth: 200, whiteSpace: "nowrap" }}>
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
      {exercise.weeks.map((week, wi) => {
        const maxCols = maxColsPerWeek[wi];
        return Array.from({ length: maxCols }, (_, colIdx) => {
          const cell = week.cells[colIdx];
          const cellKey = `${blockIdx}-${exIdx}-${wi}-${colIdx}`;
          if (!cell) {
            return (
              <td
                key={`${wi}-${colIdx}`}
                style={{ padding: "8px 4px", minWidth: 64, textAlign: "center", borderLeft: colIdx === 0 ? "2px solid #f0f0f0" : "none" }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: "#d1d5db" }}>–</span>
                  <WeightDropdown value={weights?.[cellKey]} onChange={(v) => onWeightChange(cellKey, v)} />
                </div>
              </td>
            );
          }
          const isAo = cell.type === "ao";
          const isTerm = cell.type === "term";
          const isSkip = cell.type === "skip";
          const known = isKnownTerm(cell.label, glossary);
          return (
            <td
              key={`${wi}-${colIdx}`}
              style={{ padding: "8px 4px", minWidth: 64, textAlign: "center", borderLeft: colIdx === 0 ? "2px solid #f0f0f0" : "none" }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
                {isSkip ? (
                  <span style={{ fontSize: 11, color: "#d1d5db" }}>X</span>
                ) : known ? (
                  <button
                    onClick={() => onTermClick(cell.label)}
                    style={{
                      fontSize: 11,
                      color: RED,
                      fontWeight: 700,
                      background: "none",
                      border: "none",
                      textDecoration: "underline",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    {cell.label}
                  </button>
                ) : (
                  <span style={{ fontSize: 11, color: isAo ? RED : "#6b7280", fontWeight: isAo ? 700 : 400 }}>
                    {cell.label}
                  </span>
                )}
                {!isTerm && !isSkip && (
                  <WeightDropdown value={weights?.[cellKey]} onChange={(v) => onWeightChange(cellKey, v)} />
                )}
              </div>
            </td>
          );
        });
      })}
      <td style={{ padding: "8px 12px", minWidth: 80, textAlign: "center" }}>
        <PauzaTimer pauza={exercise.pauza} />
      </td>
    </tr>
  );
}

function DayBlock({ block, blockIdx, weights, onWeightChange, onTermClick, glossary }) {
  const weekLabels = block.week_labels || ["Sapt1", "Sapt2", "Sapt3", "Sapt4"];
  const numWeeks = weekLabels.length;

  const maxColsPerWeek = Array.from({ length: numWeeks }, (_, wi) =>
    Math.max(1, ...block.exercises.map((ex) => ex.weeks?.[wi]?.cells?.length || 0))
  );

  // Build groups for rowspan (only when block has use_rowspan_groups)
  const useRowspan = block.use_rowspan_groups === true;
  const buildRows = () => {
    if (!useRowspan) return block.exercises.map((ex) => ({ type: "single", ex }));
    const rows = [];
    let i = 0;
    while (i < block.exercises.length) {
      const ex = block.exercises[i];
      if (ex.group_id) {
        // collect all exercises with same group_id consecutively
        const groupExes = [ex];
        let j = i + 1;
        while (j < block.exercises.length && block.exercises[j].group_id === ex.group_id) {
          groupExes.push(block.exercises[j]);
          j++;
        }
        rows.push({ type: "group", exes: groupExes, startIdx: i });
        i = j;
      } else {
        rows.push({ type: "single", ex, startIdx: i });
        i++;
      }
    }
    return rows;
  };

  const rows = buildRows();

  const renderCells = (ex, exIdx, wi) => {
    const maxCols = maxColsPerWeek[wi];
    return Array.from({ length: maxCols }, (_, colIdx) => {
      const cell = ex.weeks[wi]?.cells[colIdx];
      const cellKey = `${blockIdx}-${exIdx}-${wi}-${colIdx}`;
      if (!cell) {
        return (
          <td key={`${wi}-${colIdx}`} style={{ padding: "8px 4px", minWidth: 64, textAlign: "center", borderLeft: colIdx === 0 ? "2px solid #f0f0f0" : "none" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
              <span style={{ fontSize: 11, color: "#d1d5db" }}>–</span>
              <WeightDropdown value={weights?.[cellKey]} onChange={(v) => onWeightChange(cellKey, v)} />
            </div>
          </td>
        );
      }
      const isAo = cell.type === "ao";
      const isTerm = cell.type === "term";
      const isSkip = cell.type === "skip";
      const known = isKnownTerm(cell.label, glossary);
      return (
        <td key={`${wi}-${colIdx}`} style={{ padding: "8px 4px", minWidth: 64, textAlign: "center", borderLeft: colIdx === 0 ? "2px solid #f0f0f0" : "none" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
            {isSkip ? (
              <span style={{ fontSize: 11, color: "#d1d5db" }}>X</span>
            ) : known ? (
              <button onClick={() => onTermClick(cell.label)} style={{ fontSize: 11, color: RED, fontWeight: 700, background: "none", border: "none", textDecoration: "underline", cursor: "pointer", padding: 0 }}>
                {cell.label}
              </button>
            ) : (
              <span style={{ fontSize: 11, color: isAo ? RED : "#6b7280", fontWeight: isAo ? 700 : 400 }}>
                {cell.label}
              </span>
            )}
            {!isTerm && !isSkip && (
              <WeightDropdown value={weights?.[cellKey]} onChange={(v) => onWeightChange(cellKey, v)} />
            )}
          </div>
        </td>
      );
    });
  };

  const renderGroupRows = (group) => {
    return group.exes.map((ex, gIdx) => {
      const exIdx = group.startIdx + gIdx;
      const isFirst = gIdx === 0;
      const rowSpan = group.exes.length;
      return (
        <tr key={exIdx} style={{ borderBottom: "1px solid #eee" }}>
          {isFirst && (
            <td rowSpan={rowSpan} style={{ padding: "10px 12px", minWidth: 200, verticalAlign: "middle", borderRight: "1px solid #f0f0f0" }}>
              <a href={ex.link} target="_blank" rel="noopener noreferrer" style={{ color: "#1d4ed8", textDecoration: "none", fontWeight: 600, fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}>
                {ex.name}
                <Play size={13} style={{ flexShrink: 0, opacity: 0.6 }} />
              </a>
            </td>
          )}
          {numWeeks > 0 && Array.from({ length: numWeeks }, (_, wi) => renderCells(ex, exIdx, wi))}
          {isFirst ? (
            <td rowSpan={rowSpan} style={{ padding: "8px 12px", minWidth: 70, textAlign: "center", fontSize: 12, color: "#6b7280", verticalAlign: "middle" }}>
              <PauzaTimer pauza={ex.pauza} />
            </td>
          ) : null}
        </tr>
      );
    });
  };

  return (
    <div style={{ marginBottom: 28, border: "1px solid #e5e7eb", borderRadius: 10, overflow: "hidden" }}>
      <div style={{ background: RED, color: "#f2f2f2", padding: "10px 16px", fontWeight: 700, fontSize: 15, letterSpacing: 0.3 }}>
        {block.day}
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", width: "100%", tableLayout: "auto" }}>
          <thead>
            <tr style={{ background: "#f9fafb", borderBottom: "2px solid #e5e7eb" }}>
              <th style={{ textAlign: "left", padding: "8px 12px", fontSize: 12, color: "#374151", minWidth: 200, whiteSpace: "nowrap" }}>
                Exercițiu
              </th>
              {weekLabels.map((label, wi) => (
                <th key={wi} colSpan={maxColsPerWeek[wi]} style={{ padding: "8px 4px", fontSize: 12, color: "#374151", borderLeft: "2px solid #e5e7eb", textAlign: "center" }}>
                  {label}
                </th>
              ))}
              <th style={{ padding: "8px 12px", fontSize: 12, color: "#374151", minWidth: 70 }}>Pauză</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => {
              if (row.type === "group") {
                return renderGroupRows(row);
              }
              return (
                <ExerciseRow
                  key={rowIdx}
                  exercise={row.ex}
                  exIdx={row.startIdx}
                  blockIdx={blockIdx}
                  weights={weights}
                  onWeightChange={onWeightChange}
                  onTermClick={onTermClick}
                  glossary={glossary}
                  maxColsPerWeek={maxColsPerWeek}
                />
              );
            })}
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

    // Send to history log (best-effort, doesn't block UI)
    try {
      const [blockIdx, exIdx, wi, colIdx] = cellKey.split("-").map(Number);
      const block = monthData.blocks[blockIdx];
      const exercise = block?.exercises?.[exIdx];
      const weekLabels = block?.week_labels || ["Sapt1", "Sapt2", "Sapt3", "Sapt4"];
      if (exercise) {
        fetch("/api/log", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cod_client: code,
            luna: client.month,
            exercitiu: exercise.name,
            saptamana: weekLabels[wi] || `Sapt${wi + 1}`,
            serie: colIdx + 1,
            greutate: value,
          }),
        }).catch((err) => { console.error("History log failed:", err); });
      }
    } catch (e) {
      // ignore history logging errors, never block the user's save
    }
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
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
      <GlossaryModal term={activeTerm} glossary={glossary} onClose={() => setActiveTerm(null)} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 0",
          borderBottom: "2px solid #f0f0f0",
          marginBottom: 24,
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#111" }}>{client.name}</div>
          <div style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>Luna {client.month} de program</div>
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
    </div>
  );
}

function AdminPanel({ clients, onUpdateClients, onClose, onSync, syncStatus, onPreviewMonth }) {
  const [local, setLocal] = useState(clients);
  const [previewMonth, setPreviewMonth] = useState(Object.keys(MONTHS_DATA)[0] || "1");
  const [showHistory, setShowHistory] = useState(false);
  const [historyClient, setHistoryClient] = useState("");
  const [historyRows, setHistoryRows] = useState([]);
  const [historyStatus, setHistoryStatus] = useState("idle");

  useEffect(() => {
    setLocal(clients);
  }, [clients]);

  const loadHistory = async () => {
    setHistoryStatus("loading");
    try {
      const res = await fetch(HISTORY_CSV_URL, { cache: "no-store" });
      if (!res.ok) throw new Error("fetch failed");
      const text = await res.text();
      setHistoryRows(parseHistoryCsv(text));
      setHistoryStatus("success");
    } catch (e) {
      setHistoryStatus("error");
    }
  };

  const updateClient = (code, field, value) => {
    setLocal({ ...local, [code]: { ...local[code], [field]: value } });
  };

  const addClient = () => {
    const newCode = `CLIENT${Object.keys(local).length + 1}`;
    setLocal({ ...local, [newCode]: { name: "Client nou", month: Object.keys(MONTHS_DATA)[0] || "1" } });
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
        <div style={{ fontSize: 13, color: "#374151" }}>Previzualizează o lună (fără cod de client)</div>
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
          background: "#f7faff",
          border: "1px solid #d4e0f3",
          borderRadius: 10,
          padding: "10px 14px",
          marginBottom: 14,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
          <div style={{ fontSize: 13, color: "#374151" }}>Istoric greutăți client</div>
          <button
            onClick={() => {
              const next = !showHistory;
              setShowHistory(next);
              if (next && historyRows.length === 0) loadHistory();
            }}
            style={{ border: "1px solid #d1d5db", background: "#fff", borderRadius: 8, padding: "6px 12px", fontSize: 12, cursor: "pointer" }}
          >
            {showHistory ? "Ascunde" : "Vezi istoric"}
          </button>
        </div>
        {showHistory && (
          <div style={{ marginTop: 12 }}>
            <select
              value={historyClient}
              onChange={(e) => setHistoryClient(e.target.value)}
              style={{ border: "1px solid #d1d5db", borderRadius: 8, padding: "6px 10px", fontSize: 13, marginBottom: 10, width: "100%" }}
            >
              <option value="">Alege un client...</option>
              {Object.keys(local).map((code) => (
                <option key={code} value={code}>
                  {code} — {local[code].name}
                </option>
              ))}
            </select>
            {historyStatus === "loading" && <div style={{ fontSize: 12, color: "#9ca3af" }}>Se încarcă...</div>}
            {historyStatus === "error" && <div style={{ fontSize: 12, color: "#dc2626" }}>Eroare la încărcare.</div>}
            {historyStatus === "success" && historyClient && (
              <div style={{ maxHeight: 300, overflowY: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                      <th style={{ textAlign: "left", padding: "4px 6px" }}>Lună</th>
                      <th style={{ textAlign: "left", padding: "4px 6px" }}>Exercițiu</th>
                      <th style={{ textAlign: "left", padding: "4px 6px" }}>Săpt.</th>
                      <th style={{ textAlign: "left", padding: "4px 6px" }}>Serie</th>
                      <th style={{ textAlign: "left", padding: "4px 6px" }}>Kg</th>
                      <th style={{ textAlign: "left", padding: "4px 6px" }}>Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyRows
                      .filter((r) => r.cod_client.toUpperCase() === historyClient.toUpperCase())
                      .reverse()
                      .map((r, i) => (
                        <tr key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
                          <td style={{ padding: "4px 6px" }}>{r.luna}</td>
                          <td style={{ padding: "4px 6px" }}>{r.exercitiu}</td>
                          <td style={{ padding: "4px 6px" }}>{r.saptamana}</td>
                          <td style={{ padding: "4px 6px" }}>{r.serie}</td>
                          <td style={{ padding: "4px 6px", fontWeight: 600 }}>{r.greutate}</td>
                          <td style={{ padding: "4px 6px", color: "#9ca3af" }}>{r.data?.slice(0, 10)}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
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
          style={{ border: "1px solid #d1d5db", background: "#fff", borderRadius: 8, padding: "6px 12px", fontSize: 12, cursor: "pointer" }}
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
                  {sortedMonths.map((m) => (
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

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
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
        Lunile încărcate momentan: {sortedMonths.join(", ")}.
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
  const [syncStatus, setSyncStatus] = useState("idle");

  const syncFromSheet = async () => {
    setSyncStatus("syncing");
    try {
      const res = await fetch(SHEET_CSV_URL, { cache: "no-store" });
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
          client={{ name: "Previzualizare", month: previewMonth }}
          code={`__preview_${previewMonth}`}
          onLogout={() => {
            setPreviewMonth(null);
            setShowAdmin(true);
          }}
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
        onPreviewMonth={(m) => {
          setPreviewMonth(m);
          setShowAdmin(false);
        }}
      />
    );
  }

  if (activeCode && clients[activeCode]) {
    return (
      <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: "#fff", minHeight: "100vh" }}>
        <ClientView
          client={clients[activeCode]}
          code={activeCode}
          onLogout={() => {
            setActiveCode(null);
            setCodeInput("");
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        fontFamily: "system-ui, -apple-system, sans-serif",
        background: "#fff",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div style={{ maxWidth: 360, width: "100%", textAlign: "center" }}>
        <div
          style={{
            width: 64,
            height: 64,
            background: RED,
            borderRadius: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
            color: "#fff",
            fontSize: 28,
          }}
        >
          🏋
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: "#111", marginBottom: 6 }}>
          Programul tău de antrenament
        </h1>
        <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 24 }}>
          Introdu codul de acces primit de la antrenor
        </p>
        <input
          value={codeInput}
          onChange={(e) => setCodeInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          placeholder="COD ACCES (EX: ANDREI23)"
          style={{
            width: "100%",
            padding: "14px 16px",
            border: "1px solid #d1d5db",
            borderRadius: 10,
            fontSize: 15,
            marginBottom: 12,
            boxSizing: "border-box",
            textAlign: "center",
            letterSpacing: 1,
          }}
        />
        {error && <div style={{ color: "#dc2626", fontSize: 13, marginBottom: 12 }}>{error}</div>}
        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "14px 16px",
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

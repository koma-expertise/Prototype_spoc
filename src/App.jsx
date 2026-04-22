import { useState } from "react";
import {
  Building2, Users, FileText, BarChart3, ShoppingCart,
  DollarSign, Calendar, MessageSquare, FolderOpen, CloudSun, Camera,
  ChevronRight, ChevronLeft, Bell, Search, Plus,
  CheckCircle2, Clock, AlertTriangle, ArrowRight, ArrowUpRight,
  Eye, Download, Upload, MapPin, Truck, Phone, Mail,
  ClipboardList, FileCheck, Send, Activity, Target,
  Briefcase, Star, Boxes, Receipt, Video, Shield, Calculator,
  Brain, Layers, TrendingUp, TrendingDown, X, Paperclip,
  Filter, Flame, AlertCircle,
  Banknote, Wallet, Sparkles,
  Lock, Unlock
} from "lucide-react";

/* ═══════════ DESIGN TOKENS ═══════════ */
const T={koma:"#18B7D2",komaD:"#0E8FA8",komaL:"#E0F5F9",komaXL:"#F2FBFD",wc:"#6BC0AA",wcD:"#4FA08B",wcL:"#E8F5F0",ink:"#0F172A",inkS:"#1E293B",g700:"#334155",g600:"#475569",g500:"#64748B",g400:"#94A3B8",g300:"#CBD5E1",g200:"#E2E8F0",g100:"#F1F5F9",g50:"#F8FAFC",w:"#FFFFFF",ok:"#059669",okL:"#D1FAE5",okBg:"#ECFDF5",warn:"#D97706",warnL:"#FEF3C7",warnBg:"#FFFBEB",err:"#DC2626",errL:"#FEE2E2",errBg:"#FEF2F2",info:"#2563EB",infoL:"#DBEAFE",infoBg:"#EFF6FF",purp:"#7C3AED",purpL:"#EDE9FE",rose:"#E11D48",roseL:"#FFE4E6",brd:"#E2E8F0",bg:"#F8FAFC",sbBg:"#0F172A"};
const fM=v=>{if(v>=1e9)return(v/1e9).toFixed(1)+"Md";if(v>=1e6)return(v/1e6).toFixed(1)+"M";if(v>=1e3)return(v/1e3).toFixed(0)+"K";return String(v)};

/* ═══════════ MOCK DATA ═══════════ */
const PJ=[
  {id:"PRJ-001",nom:"Villa Éden",loc:"Douala, Bonamoussadi",client:"Jean-Pierre Fouda",typo:"Construction neuve",phase:7,phLbl:"Construction GO",phTotal:10,statut:"Actif",av:44,budget:120e6,budgetVal:123.5e6,dep:52.8e6,engage:18.2e6,facture:52.8e6,paye:44.4e6,resteFacturer:70.7e6,resteEncaisser:79.1e6,marge:18,margeInit:22,risque:"Modéré",blocage:"Météo ven 18/04",prochEch:"Coulage R+1 — 17/04",spoc:"Marie Atangana",amoa:"S. Kamga",moe:"Arc. Njoya",moex:"BTP Cameroun",dernierEchange:"16/04 14:22",actionClient:"Payer FAC-003 (8,4M)",tempClient:72,promesse:"Rapport hebdo chaque lundi",sujetSensible:"Hausse ciment +4%",region:"Littoral",sante:68,riskPlanning:45,riskCash:55,riskQualite:20,scoreSatisf:72,soldeClient:44.4e6,soldeDispo:8.2e6,soldeBloque:36.2e6},
  {id:"PRJ-002",nom:"Résidence Kotto",loc:"Douala, Kotto",client:"Moussa Ndiaye",typo:"Construction neuve",phase:4,phLbl:"Sélection MOE",phTotal:10,statut:"En validation",av:8,budget:85e6,budgetVal:85e6,dep:2.1e6,engage:0,facture:2.1e6,paye:2.1e6,resteFacturer:82.9e6,resteEncaisser:82.9e6,marge:22,margeInit:22,risque:"Faible",blocage:"Choix MOE",prochEch:"Sélection MOE — 20/04",spoc:"Marie Atangana",amoa:"S. Kamga",moe:"—",moex:"—",dernierEchange:"11/04 16:40",actionClient:"Valider proposition MOE",tempClient:55,promesse:"3 propositions avant 20/04",sujetSensible:"—",region:"Littoral",sante:82,riskPlanning:15,riskCash:5,riskQualite:0,scoreSatisf:55,soldeClient:2.1e6,soldeDispo:0,soldeBloque:2.1e6},
  {id:"PRJ-003",nom:"Rénov. Bastos",loc:"Yaoundé, Bastos",client:"Amina Tchouangou",typo:"Rénovation",phase:1,phLbl:"Découverte",phTotal:6,statut:"Brouillon",av:0,budget:25e6,budgetVal:0,dep:0,engage:0,facture:0,paye:0,resteFacturer:25e6,resteEncaisser:25e6,marge:0,margeInit:0,risque:"Faible",blocage:"Visite terrain",prochEch:"Visite site — 22/04",spoc:"Fabien Nkoulou",amoa:"—",moe:"—",moex:"—",dernierEchange:"14/04 08:00",actionClient:"Confirmer visite",tempClient:65,promesse:"Devis sous 3 semaines",sujetSensible:"Budget serré",region:"Centre",sante:90,riskPlanning:0,riskCash:0,riskQualite:0,scoreSatisf:65,soldeClient:0,soldeDispo:0,soldeBloque:0},
  {id:"PRJ-004",nom:"Reprise Bali",loc:"Douala, Bali",client:"Patrick Essomba",typo:"Reprise chantier",phase:3,phLbl:"Devis détaillé",phTotal:6,statut:"Actif",av:28,budget:45e6,budgetVal:48e6,dep:12e6,engage:4e6,facture:12e6,paye:8e6,resteFacturer:36e6,resteEncaisser:40e6,marge:15,margeInit:20,risque:"Élevé",blocage:"Retard +8j diagnostic",prochEch:"Validation devis — URGENT",spoc:"Marie Atangana",amoa:"S. Kamga",moe:"—",moex:"Bati-Plus",dernierEchange:"12/04 10:00",actionClient:"Arbitrage devis reprise",tempClient:30,promesse:"Devis final avant 15/04",sujetSensible:"Retard non justifié",region:"Littoral",sante:35,riskPlanning:80,riskCash:60,riskQualite:30,scoreSatisf:30,soldeClient:8e6,soldeDispo:0,soldeBloque:8e6},
  {id:"PRJ-005",nom:"Agencement Akwa",loc:"Douala, Akwa",client:"Cécile Ngono",typo:"Aménagement",phase:2,phLbl:"Conception",phTotal:5,statut:"Actif",av:35,budget:18e6,budgetVal:18e6,dep:4.5e6,engage:1.2e6,facture:4.5e6,paye:4.5e6,resteFacturer:13.5e6,resteEncaisser:13.5e6,marge:25,margeInit:25,risque:"Faible",blocage:"—",prochEch:"Visuels 3D — 24/04",spoc:"Fabien Nkoulou",amoa:"—",moe:"Archi Design",moex:"—",dernierEchange:"15/04 11:00",actionClient:"Valider moodboard",tempClient:85,promesse:"Visuels 3D avant fin avril",sujetSensible:"—",region:"Littoral",sante:88,riskPlanning:10,riskCash:0,riskQualite:5,scoreSatisf:85,soldeClient:4.5e6,soldeDispo:0,soldeBloque:4.5e6},
  {id:"PRJ-006",nom:"Étude Kribi",loc:"Kribi, Océan",client:"Jean-Pierre Fouda",typo:"Études / Expertise",phase:1,phLbl:"Pré-faisabilité",phTotal:3,statut:"Actif",av:60,budget:2.5e6,budgetVal:2.5e6,dep:0.8e6,engage:0.4e6,facture:0.8e6,paye:0.8e6,resteFacturer:1.7e6,resteEncaisser:1.7e6,marge:30,margeInit:30,risque:"Faible",blocage:"—",prochEch:"Rapport — 30/04",spoc:"Marie Atangana",amoa:"S. Kamga",moe:"—",moex:"—",dernierEchange:"10/04 09:00",actionClient:"—",tempClient:80,promesse:"Rapport avant 01/05",sujetSensible:"—",region:"Sud",sante:92,riskPlanning:5,riskCash:0,riskQualite:0,scoreSatisf:80,soldeClient:0.8e6,soldeDispo:0,soldeBloque:0.8e6},
];
const LOTS=[
  {code:"LOT-I",nom:"Trav. Préparatoires",pj:"PRJ-001",pReel:100,pPlan:100,budget:4.5e6,dep:4.5e6,engage:0,marge:22,risque:"—",sections:[
    {code:"S1",nom:"Installation chantier",av:100,taches:[{code:"T-S1-01",nom:"Clôture & signalisation",av:100,resp:"BTP Cameroun",etat:"Terminée"},{code:"T-S1-02",nom:"Base vie",av:100,resp:"BTP Cameroun",etat:"Terminée"}]}
  ]},
  {code:"LOT-II",nom:"Gros Œuvre",pj:"PRJ-001",pReel:72,pPlan:78,budget:28.5e6,dep:22.3e6,engage:3.8e6,marge:16,risque:"Écart -6%",sections:[
    {code:"S2",nom:"Fondations",av:100,taches:[{code:"T-S2-01",nom:"Terrassement",av:100,resp:"BTP Cameroun",etat:"Terminée"},{code:"T-S2-02",nom:"Semelles & longrines",av:100,resp:"BTP Cameroun",etat:"Terminée"}]},
    {code:"S3",nom:"Élévation RDC",av:100,taches:[{code:"T-S3-01",nom:"Poteaux & poutres RDC",av:100,resp:"BTP Cameroun",etat:"Terminée"},{code:"T-S3-02",nom:"Murs agglos RDC",av:100,resp:"BTP Cameroun",etat:"Terminée"},{code:"T-S3-03",nom:"Plancher haut RDC",av:100,resp:"BTP Cameroun",etat:"Terminée"}]},
    {code:"S4",nom:"Élévation R+1",av:40,taches:[{code:"T-S4-01",nom:"Coffrage poteaux R+1",av:60,resp:"BTP Cameroun",etat:"En cours",ops:[{code:"OP-01",nom:"Coffrage zone A",qte:12,unite:"poteaux",pu:85000,total:1020000,avOp:80},{code:"OP-02",nom:"Coffrage zone B",qte:8,unite:"poteaux",pu:85000,total:680000,avOp:30}]},{code:"T-S4-02",nom:"Coulage longrines R+1",av:10,resp:"BTP Cameroun",etat:"Bloquée",blocage:"Météo rouge 18/04"},{code:"T-S4-03",nom:"Montage agglos R+1",av:0,resp:"BTP Cameroun",etat:"À faire",blocage:"Livraison agglos"}]}
  ]},
  {code:"LOT-III",nom:"Clos & Couvert",pj:"PRJ-001",pReel:45,pPlan:50,budget:12e6,dep:5.2e6,engage:1.8e6,marge:20,risque:"—",sections:[{code:"S5",nom:"Charpente & couverture",av:45,taches:[{code:"T-S5-01",nom:"Charpente bois",av:60,resp:"BTP Cameroun",etat:"En cours"},{code:"T-S5-02",nom:"Couverture tôle",av:30,resp:"BTP Cameroun",etat:"En cours"}]}]},
  {code:"LOT-IV",nom:"Second Œuvre",pj:"PRJ-001",pReel:18,pPlan:20,budget:15.6e6,dep:3.1e6,engage:2.4e6,marge:18,risque:"Stock carreau",sections:[{code:"S6",nom:"Revêtement sols",av:18,taches:[{code:"T-S6-01",nom:"Pose carrelage RDC",av:35,resp:"BTP Cameroun",etat:"En cours",blocage:"Rupture carreau 60×60"},{code:"T-S6-02",nom:"Pose carrelage R+1",av:0,resp:"BTP Cameroun",etat:"À faire"}]}]},
  {code:"LOT-V",nom:"Menuiseries",pj:"PRJ-001",pReel:5,pPlan:5,budget:8.4e6,dep:0,engage:0,marge:22,risque:"—",sections:[]},
  {code:"LOT-VI",nom:"Plomberie",pj:"PRJ-001",pReel:0,pPlan:0,budget:6.2e6,dep:0,engage:0,marge:22,risque:"—",sections:[]},
  {code:"LOT-VII",nom:"Électricité",pj:"PRJ-001",pReel:0,pPlan:0,budget:5.8e6,dep:0,engage:0,marge:22,risque:"—",sections:[]},
  {code:"LOT-VIII",nom:"Peinture",pj:"PRJ-001",pReel:0,pPlan:0,budget:7.1e6,dep:0,engage:0,marge:22,risque:"—",sections:[]},
  {code:"LOT-IX",nom:"VRD & Ext.",pj:"PRJ-001",pReel:0,pPlan:0,budget:3.9e6,dep:0,engage:0,marge:22,risque:"—",sections:[]},
];
const PROSP=[
  {id:"P-001",nom:"Franck Mbarga",email:"f.mbarga@pm.me",source:"Site web",typo:"Construction neuve",budget:"65M",loc:"Douala",besoin:"Villa 5P haut de gamme",maturite:"Tiède",score:55,prochAction:"Relancer — proposer visite",resp:"Marie Atangana",dernierContact:"15/04",segment:"À nourrir",jDepuis:2,terrain:true,financement:false,etudes:false,statut:"En attente",historique:[{d:"15/04",a:"Appel entrant — besoin exprimé"},{d:"10/04",a:"Formulaire soumis"}]},
  {id:"P-002",nom:"Sophie Ekane",email:"s.ekane@gmail.com",source:"Recommandation",typo:"Rénovation",budget:"30M",loc:"Yaoundé",besoin:"Rénovation T4 Bastos",maturite:"Chaud",score:78,prochAction:"Envoyer proposition AMOA",resp:"Marie Atangana",dernierContact:"12/04",segment:"À convertir vite",jDepuis:5,terrain:false,financement:true,etudes:false,statut:"En revue",historique:[{d:"12/04",a:"Appel sortant — qualification ok"},{d:"08/04",a:"Lead recommandation entrante"}]},
  {id:"P-003",nom:"David Ngo",email:"d.ngo@web.de",source:"Connect",typo:"Reprise chantier",budget:"40M",loc:"Kribi",besoin:"Reprise villa inachevée",maturite:"Chaud",score:82,prochAction:"Envoyer proposition diagnostic",resp:"Fabien Nkoulou",dernierContact:"10/04",segment:"À convertir vite",jDepuis:7,terrain:true,financement:true,etudes:true,statut:"En revue",historique:[{d:"10/04",a:"Visio — diagnostic accepté en principe"},{d:"05/04",a:"Formulaire soumis via Connect"}]},
  {id:"P-004",nom:"Claire Ateba",email:"c.ateba@free.fr",source:"Salon Paris",typo:"Construction neuve",budget:"90M",loc:"Yaoundé",besoin:"Villa R+1 — pas de terrain",maturite:"Tiède",score:38,prochAction:"Orienter vers étude foncière",resp:"Fabien Nkoulou",dernierContact:"01/04",segment:"À requalifier",jDepuis:16,terrain:false,financement:false,etudes:false,statut:"En attente",historique:[{d:"01/04",a:"Salon Paris — contact initial"}]},
  {id:"P-005",nom:"Michel Eyinga",email:"m.eyinga@yahoo.ca",source:"Salon Montréal",typo:"Immeuble R+3",budget:"250M",loc:"Yaoundé",besoin:"Immeuble R+3 locatif",maturite:"Très chaud",score:91,prochAction:"CONVERTIR — RDV cadrage",resp:"Marie Atangana",dernierContact:"08/04",segment:"À convertir vite",jDepuis:9,terrain:false,financement:true,etudes:false,statut:"Revue terminée",historique:[{d:"08/04",a:"Visio cadrage — très motivé"},{d:"02/04",a:"Salon Montréal — rencontre SPOC"},{d:"28/03",a:"Pré-inscription en ligne"}]},
];
const FACS=[
  {id:"FAC-001",pj:"PRJ-001",client:"J-P Fouda",objet:"Acompte GO",mt:14250000,s:"Payée",date:"15/02",ech:"28/02",type:"Acompte",jalon:"Démarrage GO",risque:"—",actionSpoc:"—",preuve:"PV démarrage signé",liberable:false},
  {id:"FAC-002",pj:"PRJ-001",client:"J-P Fouda",objet:"Études géotech",mt:1750000,s:"Payée",date:"20/01",ech:"05/02",type:"Études",jalon:"Pré-faisabilité",risque:"—",actionSpoc:"—",preuve:"Rapport validé AMOA",liberable:false},
  {id:"FAC-003",pj:"PRJ-001",client:"J-P Fouda",objet:"Matériaux Phase 2",mt:8400000,s:"En attente",date:"10/04",ech:"25/04",type:"Matériaux",jalon:"GO Élévation R+1",risque:"Élevé",actionSpoc:"Relancer client",preuve:"—",liberable:false},
  {id:"FAC-004",pj:"PRJ-001",client:"J-P Fouda",objet:"MO Mars",mt:3200000,s:"Validée",date:"01/04",ech:"15/04",type:"MO",jalon:"GO courant",risque:"Moyen",actionSpoc:"Relancer paiement",preuve:"Rapport MOEX validé",liberable:true},
  {id:"FAC-005",pj:"PRJ-001",client:"J-P Fouda",objet:"AMOA T1",mt:2800000,s:"Payée",date:"05/03",ech:"20/03",type:"AMOA",jalon:"Suivi global",risque:"—",actionSpoc:"—",preuve:"Livrable AMOA validé",liberable:false},
  {id:"FAC-006",pj:"PRJ-004",client:"P. Essomba",objet:"Diagnostic reprise",mt:1800000,s:"Payée",date:"01/03",ech:"15/03",type:"Études",jalon:"Diagnostic",risque:"—",actionSpoc:"—",preuve:"Rapport diagnostic",liberable:false},
  {id:"FAC-007",pj:"PRJ-004",client:"P. Essomba",objet:"Travaux Phase 1",mt:8000000,s:"En attente",date:"12/04",ech:"30/04",type:"Travaux",jalon:"Reprise fondation",risque:"Élevé",actionSpoc:"Attente arbitrage",preuve:"—",liberable:false},
  {id:"FAC-008",pj:"PRJ-002",client:"M. Ndiaye",objet:"Pré-faisabilité",mt:2100000,s:"Payée",date:"05/03",ech:"20/03",type:"Études",jalon:"Pré-faisabilité",risque:"—",actionSpoc:"—",preuve:"Rapport AMOA",liberable:false},
  {id:"FAC-009",pj:"PRJ-005",client:"C. Ngono",objet:"Honoraires conception",mt:4500000,s:"Payée",date:"10/03",ech:"25/03",type:"Honoraires",jalon:"Conception",risque:"—",actionSpoc:"—",preuve:"Visuels livrés",liberable:false},
  {id:"FAC-010",pj:"PRJ-006",client:"J-P Fouda",objet:"Études pré-faisa",mt:800000,s:"Payée",date:"01/04",ech:"15/04",type:"Études",jalon:"Pré-faisabilité",risque:"—",actionSpoc:"—",preuve:"Rapport partiel",liberable:false},
];
const PAIEMENTS=[
  {id:"PAY-001",pj:"PRJ-001",client:"J-P Fouda",mt:14250000,date:"15/02",mode:"Virement",ref:"VIR-2026-0215",fac:"FAC-001",statut:"Libéré",destLib:"BTP Cameroun",dateLib:"20/02"},
  {id:"PAY-002",pj:"PRJ-001",client:"J-P Fouda",mt:1750000,date:"28/01",mode:"Virement",ref:"VIR-2026-0128",fac:"FAC-002",statut:"Libéré",destLib:"S. Kamga (AMOA)",dateLib:"10/02"},
  {id:"PAY-003",pj:"PRJ-001",client:"J-P Fouda",mt:2800000,date:"18/03",mode:"Virement",ref:"VIR-2026-0318",fac:"FAC-005",statut:"Libéré",destLib:"S. Kamga (AMOA)",dateLib:"22/03"},
  {id:"PAY-004",pj:"PRJ-001",client:"J-P Fouda",mt:25600000,date:"01/03",mode:"Virement",ref:"VIR-2026-0301",fac:"—",statut:"Séquestre",destLib:"—",dateLib:"—"},
  {id:"PAY-005",pj:"PRJ-004",client:"P. Essomba",mt:8000000,date:"12/03",mode:"Mobile Money",ref:"MM-2026-0312",fac:"FAC-006",statut:"Libéré partiel",destLib:"AMOA / Bati-Plus",dateLib:"15/03"},
  {id:"PAY-006",pj:"PRJ-002",client:"M. Ndiaye",mt:2100000,date:"19/03",mode:"Virement",ref:"VIR-2026-0319",fac:"FAC-008",statut:"Libéré",destLib:"S. Kamga (AMOA)",dateLib:"25/03"},
];
const TACHES=[
  {code:"T-001",nom:"Coffrage poteaux R+1",pj:"PRJ-001",lot:"LOT-II",section:"S4",resp:"BTP Cameroun",etat:"En cours",av:60,dateLim:"18/04",impactDelai:"Critique",impactCash:"8,4M bloqués",impactClient:"Jalon promis",impactQualite:"—",blocage:"—",relance:"—",prochainPas:"Fin coffrage zone A",preuves:["RJ-04-16","Photos_16-04.zip"]},
  {code:"T-002",nom:"Coulage longrines R+1",pj:"PRJ-001",lot:"LOT-II",section:"S4",resp:"BTP Cameroun",etat:"Bloquée",av:10,dateLim:"22/04",impactDelai:"Élevé",impactCash:"—",impactClient:"Report possible",impactQualite:"Risque si précipité",blocage:"Météo rouge 18/04",relance:"—",prochainPas:"Attente météo",preuves:[]},
  {code:"T-003",nom:"Diagnostic structure",pj:"PRJ-004",lot:"—",section:"—",resp:"Bati-Plus",etat:"Retard",av:70,dateLim:"10/04",impactDelai:"Bloquant",impactCash:"Devis bloqué",impactClient:"Client frustré",impactQualite:"—",blocage:"+8j non justifié",relance:"Escalade AMOA 14/04",prochainPas:"Exiger livraison 19/04",preuves:["Diagnostic_Bali.pdf"]},
  {code:"T-004",nom:"Montage agglos R+1",pj:"PRJ-001",lot:"LOT-II",section:"S4",resp:"BTP Cameroun",etat:"À faire",av:0,dateLim:"28/04",impactDelai:"Moyen",impactCash:"—",impactClient:"—",impactQualite:"—",blocage:"Livraison agglos DA-004",relance:"DA-004 validée",prochainPas:"Attente livraison",preuves:[]},
  {code:"T-005",nom:"Visuels 3D salon",pj:"PRJ-005",lot:"—",section:"—",resp:"Archi Design",etat:"En cours",av:55,dateLim:"24/04",impactDelai:"Faible",impactCash:"—",impactClient:"Promesse client",impactQualite:"—",blocage:"—",relance:"—",prochainPas:"Livraison moodboard",preuves:[]},
  {code:"T-006",nom:"Rapport pré-faisabilité",pj:"PRJ-006",lot:"—",section:"—",resp:"S. Kamga",etat:"En cours",av:60,dateLim:"30/04",impactDelai:"Faible",impactCash:"—",impactClient:"—",impactQualite:"—",blocage:"—",relance:"—",prochainPas:"Finalisation",preuves:[]},
];
const ACHATS=[
  {id:"DA-001",art:"Ciment CPJ 50kg",qte:200,unite:"sacs",fourn:"CIMENCAM",mt:1040000,s:"Réceptionnée",pj:"PRJ-001",lot:"LOT-II",tache:"T-S4-01",risque:"—",impactPlan:"—",actionSpoc:"—",ficheQualite:true,blSigne:true,signatureReception:"B. Ekambi (MOEX) — 14/04"},
  {id:"DA-002",art:"Fer HA 12mm",qte:150,unite:"barres",fourn:"SOCAFER",mt:720000,s:"En transit",pj:"PRJ-001",lot:"LOT-II",tache:"T-S4-01",risque:"Retard +2j",impactPlan:"Coffrage décalé",actionSpoc:"Suivre livraison",ficheQualite:true,blSigne:false,signatureReception:"—"},
  {id:"DA-003",art:"Sable carrière",qte:30,unite:"m³",fourn:"SOCARRIG",mt:240000,s:"Commandée",pj:"PRJ-001",lot:"LOT-II",tache:"T-S4-02",risque:"—",impactPlan:"—",actionSpoc:"—",ficheQualite:false,blSigne:false,signatureReception:"—"},
  {id:"DA-004",art:"Agglos de 15",qte:1000,unite:"pcs",fourn:"MIPROMALO",mt:350000,s:"Validée",pj:"PRJ-001",lot:"LOT-II",tache:"T-S4-03",risque:"Délai 5j",impactPlan:"Retard LOT-II",actionSpoc:"Confirmer date",ficheQualite:false,blSigne:false,signatureReception:"—"},
  {id:"DA-005",art:"Carreau grès 60×60",qte:120,unite:"m²",fourn:"À sélectionner",mt:1500000,s:"Arbitrage prix",pj:"PRJ-001",lot:"LOT-IV",tache:"T-S6-01",risque:"Hors budget +12%",impactPlan:"Lot IV bloqué",actionSpoc:"Arbitrer budget",ficheQualite:false,blSigne:false,signatureReception:"—"},
  {id:"DA-006",art:"Sable fin",qte:15,unite:"m³",fourn:"SOCARRIG",mt:120000,s:"Commandée",pj:"PRJ-004",lot:"—",tache:"T-003",risque:"—",impactPlan:"—",actionSpoc:"—",ficheQualite:false,blSigne:false,signatureReception:"—"},
];
const STOCK=[
  {code:"MAT-CIM",nom:"Ciment CPJ 50kg",stock:245,seuil:100,couverture:12,conso:20,reserve:40,pj:"PRJ-001",lot:"LOT-II",tache:"T-S4-01",delaiReappro:"2j",alerte:"ok",consequence:"—"},
  {code:"MAT-FER",nom:"Fer HA 12mm",stock:380,seuil:100,couverture:19,conso:20,reserve:0,pj:"PRJ-001",lot:"LOT-II",tache:"T-S4-01",delaiReappro:"3j",alerte:"ok",consequence:"—"},
  {code:"MAT-AGG",nom:"Agglos de 15",stock:1820,seuil:500,couverture:9,conso:200,reserve:1000,pj:"PRJ-001",lot:"LOT-II",tache:"T-S4-03",delaiReappro:"5j",alerte:"ok",consequence:"—"},
  {code:"MAT-CAR",nom:"Carreau grès 60×60",stock:0,seuil:50,couverture:0,conso:0,reserve:120,pj:"PRJ-001",lot:"LOT-IV",tache:"T-S6-01",delaiReappro:"10j",alerte:"rupture",consequence:"Retard Lot IV + surcoût probable"},
  {code:"MAT-ETA",nom:"Aquadère 25L",stock:12,seuil:5,couverture:24,conso:0.5,reserve:0,pj:"PRJ-001",lot:"LOT-III",tache:"T-S5-02",delaiReappro:"4j",alerte:"ok",consequence:"—"},
  {code:"MAT-PVC",nom:"Tuyaux PVC 100mm",stock:45,seuil:40,couverture:3,conso:15,reserve:0,pj:"PRJ-001",lot:"LOT-VI",tache:"—",delaiReappro:"6j",alerte:"seuil",consequence:"Anticiper commande"},
  {code:"MAT-SAB2",nom:"Sable fin 0/2",stock:8,seuil:5,couverture:4,conso:2,reserve:5,pj:"PRJ-004",lot:"—",tache:"T-003",delaiReappro:"3j",alerte:"ok",consequence:"—"},
  {code:"MAT-BLK",nom:"Bloc béton 20",stock:0,seuil:200,couverture:0,conso:0,reserve:400,pj:"PRJ-004",lot:"—",tache:"—",delaiReappro:"7j",alerte:"rupture",consequence:"Reprise fondation bloquée"},
  {code:"MAT-GRV",nom:"Gravier 10/20",stock:12,seuil:10,couverture:6,conso:2,reserve:0,pj:"PRJ-004",lot:"—",tache:"T-003",delaiReappro:"2j",alerte:"seuil",consequence:"Anticiper réappro"},
];
const RAPS=[
  {id:"RJ-04-16",date:"16/04",type:"Journalier",pj:"PRJ-001",auteur:"B. Ekambi",roleAuteur:"MOEX",s:"Validé",resume:"Coffrage R+1 zone A — 18 ouvriers",lot:"LOT-II",sensible:false,actionSpoc:"—",transmissible:true,photos:3,version:"v1"},
  {id:"RV-04-12",date:"12/04",type:"Visite AMOA",pj:"PRJ-001",auteur:"S. Kamga",roleAuteur:"AMOA",s:"Validé",resume:"Fondation conforme — 2 reco mineures",lot:"—",sensible:false,actionSpoc:"Transmettre client",transmissible:true,photos:8,version:"v1"},
  {id:"RJ-04-14",date:"14/04",type:"Journalier",pj:"PRJ-004",auteur:"T. Mbede",roleAuteur:"MOEX",s:"Soumis",resume:"Arrêt pluie — reprise 14h — eff. réduit",lot:"—",sensible:true,actionSpoc:"Valider",transmissible:false,photos:2,version:"v1"},
  {id:"RJ-04-13",date:"13/04",type:"Journalier",pj:"PRJ-001",auteur:"B. Ekambi",roleAuteur:"MOEX",s:"Validé",resume:"Pluie 42mm — journée justifiée",lot:"LOT-II",sensible:false,actionSpoc:"—",transmissible:true,photos:1,version:"v1"},
  {id:"RQ-04-10",date:"10/04",type:"Qualité AMOA",pj:"PRJ-001",auteur:"S. Kamga",roleAuteur:"AMOA",s:"Reformulé",resume:"NC mineure — enrobage fer zone B",lot:"LOT-II",sensible:true,actionSpoc:"Transmettre reformulé",transmissible:true,photos:5,version:"v2"},
  {id:"RT-04-08",date:"08/04",type:"Technique MOE",pj:"PRJ-001",auteur:"Arc. Njoya",roleAuteur:"MOE",s:"Validé",resume:"Vérification conformité plans R+1 — OK",lot:"LOT-II",sensible:false,actionSpoc:"—",transmissible:true,photos:0,version:"v1"},
  {id:"RD-04-05",date:"05/04",type:"Diagnostic",pj:"PRJ-004",auteur:"S. Kamga",roleAuteur:"AMOA",s:"Validé",resume:"Diagnostic structure Bali — pathologies identifiées",lot:"—",sensible:true,actionSpoc:"Reformuler pour client",transmissible:false,photos:12,version:"v1"},
];
const DOCS=[
  {nom:"Devis_V3_signée.pdf",cat:"Devis",pj:"PRJ-001",date:"10/04",auteur:"AMOA",ver:"v3",statut:"Signé",lot:"—",lie:"Devis"},
  {nom:"Contrat_BTP.pdf",cat:"Contrats",pj:"PRJ-001",date:"15/01",auteur:"SPOC",ver:"v1",statut:"Signé",lot:"—",lie:"Contrat MOEX"},
  {nom:"Plans_RDC_v2.dwg",cat:"Plans",pj:"PRJ-001",date:"20/03",auteur:"MOE",ver:"v2",statut:"Validé",lot:"LOT-II",lie:"Conception"},
  {nom:"Rapport_visite_12-04.pdf",cat:"Rapports",pj:"PRJ-001",date:"12/04",auteur:"AMOA",ver:"v1",statut:"Validé",lot:"—",lie:"RV-04-12"},
  {nom:"PV_reception_fondation.pdf",cat:"PV",pj:"PRJ-001",date:"15/03",auteur:"AMOA",ver:"v1",statut:"Signé",lot:"LOT-II",lie:"Réception"},
  {nom:"Photos_16-04.zip",cat:"Photos",pj:"PRJ-001",date:"16/04",auteur:"MOEX",ver:"—",statut:"Nouveau",lot:"LOT-II",lie:"RJ-04-16"},
  {nom:"Diagnostic_Bali.pdf",cat:"Études",pj:"PRJ-004",date:"28/02",auteur:"AMOA",ver:"v1",statut:"Validé",lot:"—",lie:"Diagnostic"},
  {nom:"Planning_Phase2.xlsx",cat:"Planning",pj:"PRJ-001",date:"01/04",auteur:"AMOA",ver:"v1",statut:"En vigueur",lot:"—",lie:"Planning"},
  {nom:"Avenant_01.pdf",cat:"Contrats",pj:"PRJ-004",date:"05/04",auteur:"SPOC",ver:"v1",statut:"À signer",lot:"—",lie:"Avenant"},
];
const MSGS=[
  {from:"J-P Fouda",role:"Client",pj:"PRJ-001",msg:"Merci pour le rapport. Et la pluie vendredi ?",time:"16/04 14:22",unread:true,prio:"haute",objet:"Avancement",attente:false,canal:"client"},
  {from:"P. Essomba",role:"Client",pj:"PRJ-004",msg:"Inquiet du retard. Quand le devis final ?",time:"12/04 10:00",unread:true,prio:"critique",objet:"Retard diagnostic",attente:true,canal:"client"},
  {from:"S. Kamga",role:"AMOA",pj:"PRJ-001",msg:"Écart +4% Lot II — hausse ciment confirmée",time:"15/04 09:00",unread:false,prio:"haute",objet:"Écart budget",attente:false,canal:"interne"},
  {from:"B. Ekambi",role:"MOEX",pj:"PRJ-001",msg:"Rapport 16/04 soumis — zone A terminé",time:"16/04 18:45",unread:false,prio:"basse",objet:"Rapport journalier",attente:false,canal:"interne"},
  {from:"M. Ndiaye",role:"Client",pj:"PRJ-002",msg:"Quand les propositions MOE ? J'attends depuis 10j.",time:"11/04 16:40",unread:false,prio:"haute",objet:"Sélection MOE",attente:true,canal:"client"},
  {from:"C. Ngono",role:"Client",pj:"PRJ-005",msg:"Les moodboards sont superbes ! Validé.",time:"15/04 11:00",unread:false,prio:"basse",objet:"Moodboard",attente:false,canal:"client"},
  {from:"Arc. Njoya",role:"MOE",pj:"PRJ-001",msg:"Plans élévation R+1 finalisés — validation AMOA ?",time:"14/04 16:00",unread:false,prio:"moyenne",objet:"Plans techniques",attente:false,canal:"groupe-projet"},
  {from:"CIMENCAM",role:"Fournisseur",pj:"PRJ-001",msg:"Livraison ciment confirmée pour le 19/04 matin.",time:"15/04 16:30",unread:false,prio:"moyenne",objet:"Livraison DA-001",attente:false,canal:"fournisseur"},
  {from:"SOCAFER",role:"Fournisseur",pj:"PRJ-001",msg:"Retard 2j fer HA 12mm — problème transport.",time:"14/04 11:20",unread:true,prio:"haute",objet:"Retard DA-002",attente:true,canal:"fournisseur"},
  {from:"Groupe PRJ-001",role:"Groupe",pj:"PRJ-001",msg:"Point hebdo lundi 21/04 à 10h — ordre du jour envoyé.",time:"16/04 10:00",unread:false,prio:"moyenne",objet:"Réunion hebdo",attente:false,canal:"groupe-projet"},
  {from:"Fouda + AMOA",role:"Externe",pj:"PRJ-001",msg:"CR visite 12/04 transmis au client pour validation.",time:"13/04 09:00",unread:false,prio:"basse",objet:"CR visite",attente:false,canal:"externe"},
];
const METEO=[{j:"Mer 16",ic:"☀️",tM:33,pl:0,al:"vert"},{j:"Jeu 17",ic:"⛅",tM:31,pl:0,al:"vert"},{j:"Ven 18",ic:"🌧️",tM:27,pl:35,al:"rouge"},{j:"Sam 19",ic:"🌦️",tM:28,pl:12,al:"orange"},{j:"Lun 21",ic:"☀️",tM:34,pl:0,al:"vert"}];
const CAMS=[
  {id:"CAM-001",nom:"Entrée chantier",zone:"Accès",s:"En ligne",pj:"PRJ-001",lastEvt:"16/04 02:14 — Mouvement",anomalie:false},
  {id:"CAM-002",nom:"Zone matériaux",zone:"Stock",s:"En ligne",pj:"PRJ-001",lastEvt:"15/04 23:47 — Personne",anomalie:true},
  {id:"CAM-003",nom:"Front travaux",zone:"GO",s:"En ligne",pj:"PRJ-001",lastEvt:"16/04 08:12 — Normal",anomalie:false},
  {id:"CAM-004",nom:"Panoramique 360°",zone:"Vue d'ensemble",s:"Hors ligne",pj:"PRJ-001",lastEvt:"14/04 — Flux coupé",anomalie:true},
  {id:"CAM-005",nom:"Entrée Bali",zone:"Accès",s:"En ligne",pj:"PRJ-004",lastEvt:"16/04 07:30 — Normal",anomalie:false},
  {id:"CAM-006",nom:"Zone travaux Bali",zone:"Reprise",s:"Hors ligne",pj:"PRJ-004",lastEvt:"10/04 — Flux coupé",anomalie:true},
];

/* ═══════════ REVENUE CHART DATA (stacked by status) ═══════════ */
const REV_MONTHS=["Jan 26","Fév 26","Mar 26","Avr 26","Mai 26","Jun 26","Juil 26","Août 26","Sept 26","Oct 26","Nov 26","Déc 26"];
const REV_DATA=[
  {total:35.38,cloture:28,negoc:0,qualif:5,stagnant:2.38},
  {total:13.28,cloture:10,negoc:0,qualif:2,stagnant:1.28},
  {total:14.97,cloture:11,negoc:0,qualif:3,stagnant:0.97},
  {total:25.29,cloture:14,negoc:0,qualif:9,stagnant:2.29},
  {total:39.69,cloture:30,negoc:3,qualif:5,stagnant:1.69},
  {total:0,cloture:0,negoc:0,qualif:0,stagnant:0},
  {total:49.94,cloture:8,negoc:0,qualif:32,stagnant:9.94},
  {total:57.24,cloture:12,negoc:0,qualif:38,stagnant:7.24},
  {total:61.14,cloture:10,negoc:0,qualif:42,stagnant:9.14},
  {total:54.48,cloture:15,negoc:0,qualif:32,stagnant:7.48},
  {total:54.48,cloture:18,negoc:0,qualif:30,stagnant:6.48},
  {total:34.48,cloture:20,negoc:0,qualif:10,stagnant:4.48},
];

/* ═══════════ UI PRIMITIVES ═══════════ */
const Badge=({children,v="default",small,onClick})=>{const m={default:{bg:T.komaXL,c:T.komaD},success:{bg:T.okBg,c:T.ok},warning:{bg:T.warnBg,c:T.warn},danger:{bg:T.errBg,c:T.err},info:{bg:T.infoBg,c:T.info},purple:{bg:T.purpL,c:T.purp},dark:{bg:T.g100,c:T.g700},active:{bg:T.wcL,c:T.wcD},rose:{bg:T.roseL,c:T.rose}};const s=m[v]||m.default;return (<span onClick={onClick} style={{display:"inline-flex",alignItems:"center",gap:3,padding:small?"1px 6px":"2px 8px",borderRadius:20,fontSize:small?8:9,fontWeight:600,background:s.bg,color:s.c,whiteSpace:"nowrap",lineHeight:1.6,cursor:onClick?"pointer":"default"}}>{children}</span>)};
const SB=({s})=>{const m={"En attente":"warning","En revue":"info","Revue terminée":"success","Actif":"success","En validation":"warning","Brouillon":"dark","En cours":"info","À faire":"dark","Validée":"success","Payée":"success","Validé":"success","Commandée":"active","Réceptionnée":"success","En transit":"warning","Hors ligne":"danger","En ligne":"success","Retard":"danger","Nouveau":"info","Bloquée":"danger","À signer":"warning","En vigueur":"active","Signé":"success","Soumis":"info","Reformulé":"purple","Terminée":"success","Arbitrage prix":"warning","Séquestre":"purple","Libéré":"success","Libéré partiel":"active"};return (<Badge v={m[s]||"default"}>{s}</Badge>)};
const TG=({v,size=32})=>{const c=v>=70?T.ok:v>=40?T.warn:T.err;return (<div style={{position:"relative",width:size,height:size}}><svg width={size} height={size} viewBox="0 0 36 36"><circle cx="18" cy="18" r="15.5" fill="none" stroke={T.g200} strokeWidth="3"/><circle cx="18" cy="18" r="15.5" fill="none" stroke={c} strokeWidth="3" strokeDasharray={`${v*.97} 97`} strokeDashoffset="24" strokeLinecap="round"/></svg><div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:size<28?7:8,fontWeight:800,color:c}}>{v}</div></div>)};
function KPI({icon:I,label,value,sub,trend,color,accent,onClick}) {
  var c = color || T.koma;
  return (
    <div onClick={onClick} style={{background:T.w,borderRadius:10,padding:"14px 16px",
      border:"1px solid "+T.brd,flex:1,minWidth:140,position:"relative",overflow:"hidden",
      cursor:onClick?"pointer":"default"}}>
      {accent && <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:c}} />}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
        <div style={{width:28,height:28,borderRadius:7,background:c+"0F",
          display:"flex",alignItems:"center",justifyContent:"center"}}>
          <I size={13} color={c} />
        </div>
        {trend !== undefined && (
          <span style={{fontSize:9,fontWeight:700,color:trend>=0?T.ok:T.err,
            display:"flex",alignItems:"center",gap:1}}>
            {trend >= 0 ? <TrendingUp size={9}/> : <TrendingDown size={9}/>}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div style={{fontSize:18,fontWeight:800,color:T.ink,letterSpacing:"-0.02em"}}>{value}</div>
      <div style={{fontSize:9,color:T.g500,marginTop:2,fontWeight:500}}>{label}</div>
      {sub && <div style={{fontSize:8,color:T.g400,marginTop:1}}>{sub}</div>}
      {onClick && <ArrowUpRight size={10} color={T.g300}
        style={{position:"absolute",top:10,right:10}} />}
    </div>
  );
}
const Pr=({value,planned,h=5})=>(<div style={{position:"relative",width:"100%",background:T.g100,borderRadius:h,height:h,overflow:"hidden"}}>{planned&&<div style={{position:"absolute",width:Math.min(100,planned)+"%",height:"100%",background:T.g200}}/>}<div style={{position:"relative",width:Math.min(100,value)+"%",height:"100%",borderRadius:h,background:value>=80?T.ok:value>=40?T.koma:T.warn,transition:"width .4s ease"}}/></div>);
const Card=({children,style:es,onClick,accent})=>(<div onClick={onClick} style={{background:T.w,borderRadius:12,padding:16,border:`1px solid ${T.brd}`,cursor:onClick?"pointer":"default",position:"relative",overflow:"hidden",...es}}>{accent&&<div style={{position:"absolute",top:0,left:0,right:0,height:2,background:accent}}/>}{children}</div>);
const Btn=({children,v="primary",icon:I,onClick,small})=>{const p=v==="primary";return (<button onClick={onClick} style={{display:"inline-flex",alignItems:"center",gap:4,borderRadius:7,fontWeight:600,cursor:"pointer",fontSize:small?9:10,padding:small?"4px 8px":"6px 12px",background:p?T.koma:T.g50,color:p?"#fff":T.g700,border:p?"none":`1px solid ${T.brd}`}}>{I&&<I size={small?10:12}/>}{children}</button>)};
const ST=({children,action,sub})=>(<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}><div><h3 style={{fontSize:13,fontWeight:700,color:T.ink,margin:0}}>{children}</h3>{sub&&<p style={{fontSize:9,color:T.g500,margin:"1px 0 0"}}>{sub}</p>}</div>{action}</div>);
const Tbl=({cols,data,compact,onRowClick})=>(<div style={{overflowX:"auto",borderRadius:8,border:`1px solid ${T.brd}`}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:compact?9:10}}><thead><tr style={{background:T.g50}}>{cols.map((c,i)=><th key={i} style={{padding:compact?"5px 8px":"7px 10px",textAlign:"left",fontWeight:600,color:T.g500,fontSize:8,textTransform:"uppercase",letterSpacing:".04em",borderBottom:`1px solid ${T.brd}`}}>{c.label}</th>)}</tr></thead><tbody>{data.map((r,ri)=><tr key={ri} onClick={()=>onRowClick&&onRowClick(r)} style={{borderBottom:`1px solid ${T.g100}`,cursor:onRowClick?"pointer":"default"}}>{cols.map((c,ci)=><td key={ci} style={{padding:compact?"5px 8px":"7px 10px",color:T.g700}}>{c.render?c.render(r):r[c.key]}</td>)}</tr>)}</tbody></table></div>);
const RI=({level})=>{const m={"Élevé":T.err,"Critique":T.err,"Bloquant":T.err,"Moyen":T.warn,"Modéré":T.warn,"Faible":T.ok,"—":T.g300};return (<div style={{display:"flex",alignItems:"center",gap:3}}><div style={{width:6,height:6,borderRadius:"50%",background:m[level]||T.g300}}/><span style={{fontSize:9,fontWeight:600,color:m[level]||T.g400}}>{level}</span></div>)};
const AL=({icon:I,text,color=T.err})=>(<div style={{display:"flex",alignItems:"center",gap:8,padding:"6px 8px",borderRadius:6,background:color+"08",borderLeft:`3px solid ${color}`,marginBottom:4}}><I size={12} color={color} style={{flexShrink:0}}/><span style={{flex:1,fontSize:10,color:T.g700,lineHeight:1.4}}>{text}</span></div>);
/* Filter dropdown */
const FD=({label,options,value,onChange})=>(<select value={value} onChange={e=>onChange(e.target.value)} style={{padding:"4px 8px",borderRadius:6,border:`1px solid ${T.brd}`,fontSize:9,fontWeight:500,background:T.g50,color:T.ink,minWidth:90}}><option value="">{label}</option>{options.map(o=><option key={o} value={o}>{o}</option>)}</select>);

/* Modal */
const Modal=({open,onClose,title,children,wide})=>{if(!open)return null;return (<div style={{position:"fixed",inset:0,zIndex:999,display:"flex",alignItems:"center",justifyContent:"center"}}><div onClick={onClose} style={{position:"absolute",inset:0,background:"rgba(15,23,42,0.45)"}}/><div style={{position:"relative",background:T.w,borderRadius:14,width:wide?"90%":"680px",maxWidth:wide?1200:680,maxHeight:"85vh",overflow:"auto",padding:20,boxShadow:"0 20px 60px rgba(0,0,0,0.2)"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><h2 style={{fontSize:16,fontWeight:800,color:T.ink,margin:0}}>{title}</h2><X size={16} color={T.g400} style={{cursor:"pointer"}} onClick={onClose}/></div>{children}</div></div>)};

/* Stacked Revenue Chart matching reference image */
function RevenueChart() {
  var maxV = Math.max.apply(null, REV_DATA.map(function(d){ return d.total; }));
  var chartH = 180;
  var barW = 28;
  var gap = 4;
  var colors = {cloture:"#2D8B46",qualif:"#F5A623",negoc:"#7B3FA0",stagnant:"#E8D44D"};
  return (
    <div>
      <div style={{fontSize:13,fontWeight:700,color:T.ink,marginBottom:12}}>
        Revenu Mensuel (Courant et Prévisionnel)
      </div>
      <div style={{position:"relative",paddingLeft:30,paddingBottom:40}}>
        {/* Y axis labels */}
        {[0,20,40,60,80].map(function(v){
          var y = chartH - (v/80)*chartH;
          return (
            <div key={v} style={{position:"absolute",left:0,top:y-5,fontSize:7,
              color:T.g400,width:25,textAlign:"right"}}>{v.toFixed(2)}</div>
          );
        })}
        {/* Grid lines */}
        {[0,20,40,60,80].map(function(v){
          var y = chartH - (v/80)*chartH;
          return (
            <div key={"g"+v} style={{position:"absolute",left:30,right:0,top:y,
              height:1,background:T.g100}} />
          );
        })}
        {/* Bars */}
        <div style={{display:"flex",gap:gap,alignItems:"flex-end",height:chartH,
          marginLeft:5,overflow:"hidden"}}>
          {REV_DATA.map(function(d,i){
            if(maxV===0) return null;
            var scale = chartH / 80;
            var hC = d.cloture * scale;
            var hN = d.negoc * scale;
            var hQ = d.qualif * scale;
            var hS = d.stagnant * scale;
            return (
              <div key={i} style={{display:"flex",flexDirection:"column",
                alignItems:"center",flex:1,minWidth:0}}>
                {/* Total label + dot */}
                {d.total > 0 && (
                  <div style={{display:"flex",flexDirection:"column",
                    alignItems:"center",marginBottom:2}}>
                    <div style={{fontSize:7,fontWeight:700,color:T.g600}}>
                      {d.total.toFixed(2)}
                    </div>
                    <div style={{width:5,height:5,borderRadius:"50%",
                      background:"#000",marginBottom:1}} />
                  </div>
                )}
                {/* Stacked bar */}
                <div style={{width:barW,display:"flex",flexDirection:"column-reverse"}}>
                  {hC > 0 && <div style={{height:hC,background:colors.cloture,
                    borderRadius:i===0?"2px 2px 0 0":"0"}} />}
                  {hN > 0 && <div style={{height:hN,background:colors.negoc}} />}
                  {hQ > 0 && <div style={{height:hQ,background:colors.qualif}} />}
                  {hS > 0 && <div style={{height:hS,background:colors.stagnant}} />}
                </div>
                {/* Month label */}
                <div style={{fontSize:6,color:T.g500,marginTop:4,
                  whiteSpace:"nowrap",fontWeight:500}}>
                  {REV_MONTHS[i]}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Legend */}
      <div style={{display:"flex",gap:12,marginTop:8,justifyContent:"center",
        flexWrap:"wrap"}}>
        {[
          {label:"Total général",color:"#000",dot:true},
          {label:"05. Stagnant",color:colors.stagnant},
          {label:"02. Qualification",color:colors.qualif},
          {label:"04. Négociation",color:colors.negoc},
          {label:"06. Clôture / Gagnée",color:colors.cloture},
        ].map(function(l,i){
          return (
            <div key={i} style={{display:"flex",alignItems:"center",gap:3,fontSize:7}}>
              {l.dot ? (
                <div style={{width:6,height:6,borderRadius:"50%",background:l.color}} />
              ) : (
                <div style={{width:10,height:6,borderRadius:1,background:l.color}} />
              )}
              <span style={{color:T.g600}}>{l.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════ NAV ═══════════ */
const NAV=[
  {k:"cockpit",l:"Cockpit Orchestration",i:Shield,accent:true},
  {k:"portfolio",l:"Portefeuille",i:Layers},
  {k:"prospects",l:"Prospects / CRM",i:Users},
  {k:"projet",l:"Vue Projet",i:Building2},
  {k:"devis",l:"Devis & Planning",i:Calculator},
  {k:"taches",l:"Tâches Critiques",i:ClipboardList},
  {k:"achats",l:"Achats",i:ShoppingCart},
  {k:"stock",l:"Stock",i:Boxes},
  {k:"facturation",l:"Facturation & Paiement",i:Receipt},
  {k:"rapports",l:"Rapports",i:FileCheck},
  {k:"docs",l:"Documents",i:FolderOpen},
  {k:"msg",l:"Messagerie",i:MessageSquare},
  {k:"meteo",l:"Météo Chantier",i:CloudSun},
  {k:"video",l:"Vidéosurveillance",i:Video},
  {k:"kpi",l:"KPI & Analytics",i:BarChart3},
  {k:"ia",l:"IA KOMA",i:Brain},
];

function Sidebar({nav, onNav}) {
  return (
    <div style={{width:220,minHeight:"100vh",background:T.sbBg,color:"#fff",
      display:"flex",flexDirection:"column",flexShrink:0}}>
      <div style={{padding:"18px 16px",display:"flex",alignItems:"center",gap:10,
        borderBottom:"1px solid rgba(255,255,255,.06)"}}>
        <div style={{width:32,height:32,borderRadius:8,
          background:"linear-gradient(135deg,"+T.koma+","+T.komaD+")",
          display:"flex",alignItems:"center",justifyContent:"center",
          fontSize:15,fontWeight:800,color:"#fff"}}>K</div>
        <div>
          <div style={{fontSize:12,fontWeight:700}}>KOMA Expertise</div>
          <div style={{fontSize:8,color:T.koma,textTransform:"uppercase",
            letterSpacing:1,fontWeight:600,marginTop:1}}>Tour de contrôle SPOC</div>
        </div>
      </div>
      <div style={{flex:1,padding:"8px 6px",display:"flex",flexDirection:"column",
        gap:1,overflowY:"auto"}}>
        {NAV.map(function(it) {
          var a = nav === it.k;
          var Icon = it.i;
          var btnStyle = {
            display:"flex",alignItems:"center",gap:8,padding:"8px 10px",
            borderRadius:6,border:"none",cursor:"pointer",
            background:a?"rgba(24,183,210,.12)":"transparent",
            color:a?T.koma:"rgba(255,255,255,.4)",
            fontSize:10,fontWeight:a?600:400,textAlign:"left",width:"100%"
          };
          if (it.accent && !a) {
            btnStyle.marginBottom = 6;
            btnStyle.borderBottom = "1px solid rgba(255,255,255,.04)";
            btnStyle.paddingBottom = 10;
          }
          return (
            <button key={it.k} onClick={function(){onNav(it.k)}} style={btnStyle}>
              <Icon size={14} style={{flexShrink:0}} />
              <span style={{whiteSpace:"nowrap",overflow:"hidden",
                textOverflow:"ellipsis"}}>{it.l}</span>
              {it.k==="cockpit" && !a && (
                <div style={{marginLeft:"auto",width:6,height:6,
                  borderRadius:"50%",background:T.err}} />
              )}
            </button>
          );
        })}
      </div>
      <div style={{padding:"12px 14px",borderTop:"1px solid rgba(255,255,255,.06)",
        display:"flex",alignItems:"center",gap:8}}>
        <div style={{width:28,height:28,borderRadius:8,background:T.koma+"20",
          display:"flex",alignItems:"center",justifyContent:"center",
          fontSize:10,fontWeight:700,color:T.koma}}>MA</div>
        <div>
          <div style={{fontSize:10,fontWeight:600}}>Marie Atangana</div>
          <div style={{fontSize:8,color:"rgba(255,255,255,.3)"}}>SPOC · 4 projets</div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   COCKPIT ORCHESTRATION — V3 
════════════════════════════════════════════ */
const PgCockpit=({onNav,setModal})=>{
  const [fTypo,setFTypo]=useState("");const [fRisque,setFRisque]=useState("");const [fVille,setFVille]=useState("");
  const pjF=PJ.filter(p=>(fTypo?p.typo===fTypo:true)&&(fRisque?p.risque===fRisque:true)&&(fVille?p.region===fVille:true));
  const totalRF=pjF.reduce((s,p)=>s+p.resteFacturer,0);const totalRE=pjF.reduce((s,p)=>s+p.resteEncaisser,0);
  return (<div style={{display:"flex",flexDirection:"column",gap:14}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}><div><h2 style={{fontSize:20,fontWeight:800,color:T.ink,margin:0}}>Cockpit Orchestration</h2><p style={{fontSize:10,color:T.g500,margin:"3px 0 0"}}>Mercredi 16 avril 2026 · {pjF.length} projets · Portefeuille {fM(pjF.reduce((s,p)=>s+p.budget,0))} FCFA</p></div>
      <div style={{display:"flex",gap:4}}><FD label="Typologie" options={[...new Set(PJ.map(p=>p.typo))]} value={fTypo} onChange={setFTypo}/><FD label="Risque" options={["Faible","Modéré","Élevé"]} value={fRisque} onChange={setFRisque}/><FD label="Région" options={[...new Set(PJ.map(p=>p.region))]} value={fVille} onChange={setFVille}/></div>
    </div>
    {/* KPIs cliquables */}
    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
      <KPI icon={Layers} label="Projets actifs" value={String(pjF.filter(p=>p.statut==="Actif").length)} sub={`+${pjF.filter(p=>p.statut!=="Actif").length} en prépa`} trend={20} accent onClick={()=>onNav("portfolio")}/>
      <KPI icon={Users} label="Prospects actifs" value={String(PROSP.length)} sub="1 à convertir" color={T.wc} accent onClick={()=>onNav("prospects")}/>
      <KPI icon={Briefcase} label="Pipeline" value="475M" sub="FCFA" color={T.info} accent onClick={()=>onNav("prospects")}/>
      <KPI icon={Receipt} label="Reste à facturer" value={fM(totalRF)} color={T.warn} accent onClick={()=>onNav("facturation")}/>
      <KPI icon={Wallet} label="Reste à encaisser" value={fM(totalRE)} color={T.err} accent onClick={()=>onNav("facturation")}/>
      <KPI icon={AlertTriangle} label="Projets à risque" value={String(pjF.filter(p=>p.risque==="Élevé").length)} sub="PRJ-004" color={T.err} accent onClick={()=>setModal({type:"risk"})}/>
      <KPI icon={Target} label="Conversion" value="67%" color={T.purp} trend={5} accent onClick={()=>onNav("kpi")}/>
    </div>
    {/* Revenue chart + Urgences */}
    <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:10}}>
      <Card accent={T.koma}><RevenueChart/></Card>
      <Card accent={T.err}><ST sub="Actions immédiates requises">Urgences du jour</ST>
        {[
          {m:"PRJ-004 — Retard +8j · Devis bloqué · Client frustré (temp. 30)",c:T.err,i:AlertTriangle,ech:"Aujourd'hui",resp:"Marie A."},
          {m:"FAC-003 — 8,4M en attente · Conditionne matériaux PRJ-001",c:T.warn,i:DollarSign,ech:"25/04",resp:"Marie A."},
          {m:"PRJ-001 — Météo rouge ven 18/04 · Coffrage suspendu",c:T.warn,i:CloudSun,ech:"18/04",resp:"BTP Cam."},
          {m:"Stock carreau 60×60 = 0 · DA-005 hors budget +12%",c:T.err,i:Boxes,ech:"Urgent",resp:"Marie A."},
          {m:"M. Eyinga (score 91) — conversion imminente · RDV à planifier",c:T.info,i:Star,ech:"Cette semaine",resp:"Marie A."},
        ].map((a,i)=><div key={i} style={{display:"flex",gap:8,padding:"6px 8px",borderRadius:6,background:a.c+"06",borderLeft:`3px solid ${a.c}`,marginBottom:4,cursor:"pointer"}} onClick={()=>a.m.includes("PRJ-004")?onNav("projet"):null}><a.i size={12} color={a.c} style={{flexShrink:0,marginTop:2}}/><div style={{flex:1}}><div style={{fontSize:9,color:T.g700,lineHeight:1.5}}>{a.m}</div><div style={{display:"flex",gap:6,marginTop:2}}><span style={{fontSize:7,color:T.g400}}>→ {a.resp}</span><span style={{fontSize:7,fontWeight:700,color:a.c}}>{a.ech}</span></div></div></div>)}
      </Card>
    </div>
    {/* Décisions + Clients */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
      <Card accent={T.warn}><ST sub="Arbitrages en attente">⚖️ Décisions à prendre</ST>
        {[
          {m:"Arbitrer devis reprise PRJ-004",type:"Client / Devis",impact:"Marge -5% si inaction",prio:"P1"},
          {m:"Valider proposition MOE — PRJ-002 (3 candidats)",type:"Coordination",impact:"Retard si > 20/04",prio:"P1"},
          {m:"DA-005 carreau +12% — accepter ou alternative",type:"Achats",impact:"Lot IV bloqué",prio:"P2"},
          {m:"Avancer coulage à jeudi (météo rouge ven)",type:"Planning",impact:"Risque qualité si précipité",prio:"P2"},
          {m:"Libérer paiement MOEX — FAC-004 validée (3,2M)",type:"Paiement",impact:"Retard si non libéré",prio:"P2"},
        ].map((d,i)=><div key={i} style={{padding:"6px 8px",borderRadius:6,background:T.g50,marginBottom:4,borderLeft:`3px solid ${d.prio==="P1"?T.err:T.warn}`,cursor:"pointer"}}><div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:9,fontWeight:600,color:T.ink,flex:1,lineHeight:1.4}}>{d.m}</span><Badge v={d.prio==="P1"?"danger":"warning"} small>{d.prio}</Badge></div><div style={{display:"flex",justifyContent:"space-between",marginTop:3}}><Badge v="dark" small>{d.type}</Badge><span style={{fontSize:7,color:T.g400,fontStyle:"italic"}}>{d.impact}</span></div></div>)}
      </Card>
      <Card accent={T.info}><ST sub="Relation client proactive">📞 Clients à rappeler</ST>
        {[
          {nom:"P. Essomba",pj:"PRJ-004",motif:"Retard +8j · arbitrage devis · frustré",urgence:"critique",temp:30,promesse:"Devis final avant 15/04"},
          {nom:"M. Ndiaye",pj:"PRJ-002",motif:"Attente propositions MOE depuis 10j",urgence:"haute",temp:55,promesse:"3 propositions avant 20/04"},
          {nom:"A. Tchouangou",pj:"PRJ-003",motif:"Confirmer visite terrain 22/04",urgence:"moyenne",temp:65},
          {nom:"M. Eyinga",pj:"Prospect",motif:"Conversion — RDV cadrage à planifier",urgence:"haute",temp:0},
        ].map((c,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 0",borderBottom:`1px solid ${T.g100}`,cursor:"pointer"}} onClick={()=>c.pj.startsWith("PRJ")?onNav("projet"):onNav("prospects")}><div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:4}}><span style={{fontSize:10,fontWeight:700,color:T.ink}}>{c.nom}</span><Badge v="dark" small>{c.pj}</Badge></div><div style={{fontSize:8,color:T.g500,marginTop:2}}>{c.motif}</div>{c.promesse&&<div style={{fontSize:7,color:T.err,marginTop:1}}>Promesse: {c.promesse}</div>}</div><div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:2}}><Badge v={c.urgence==="critique"?"danger":c.urgence==="haute"?"warning":"dark"} small>{c.urgence}</Badge>{c.temp>0&&<TG v={c.temp} size={24}/>}</div></div>)}
      </Card>
    </div>
    {/* Segmentation cliquable */}
    <Card><ST sub="Cliquez pour filtrer">Segmentation projets</ST><div style={{display:"flex",gap:6}}>{[{l:"Découverte",c:1,col:T.g400},{l:"Études",c:1,col:T.purp},{l:"Conception",c:1,col:T.info},{l:"Devis",c:1,col:T.warn},{l:"Construction",c:1,col:T.ok},{l:"Aménagement",c:1,col:T.wc}].map((s,i)=><div key={i} onClick={()=>onNav("portfolio")} style={{flex:1,textAlign:"center",padding:"10px 4px",borderRadius:8,background:s.col+"0A",borderBottom:`3px solid ${s.col}`,cursor:"pointer"}}><div style={{fontSize:20,fontWeight:800,color:s.col}}>{s.c}</div><div style={{fontSize:8,fontWeight:600,color:s.col,marginTop:2}}>{s.l}</div></div>)}</div></Card>
    {/* Cartes projets */}
    <ST sub="Cliquez pour ouvrir le cockpit projet">Tous les projets</ST>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:10}}>
      {pjF.map(p=><Card key={p.id} onClick={()=>onNav("projet")} style={{cursor:"pointer",border:`1px solid ${p.risque==="Élevé"?T.err+"30":T.brd}`}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
          <div><div style={{display:"flex",alignItems:"center",gap:4}}><span style={{fontFamily:"monospace",fontSize:8,color:T.koma,fontWeight:600}}>{p.id}</span><Badge v={p.risque==="Élevé"?"danger":p.risque==="Modéré"?"warning":"success"} small>{p.risque}</Badge></div><div style={{fontSize:13,fontWeight:700,color:T.ink,marginTop:2}}>{p.nom}</div><div style={{fontSize:9,color:T.g500,marginTop:1}}><MapPin size={9} style={{display:"inline",verticalAlign:"-1px"}}/> {p.loc} · {p.client}</div></div>
          <TG v={p.tempClient} size={34}/>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:4,fontSize:8,color:T.g500,marginBottom:6}}><SB s={p.statut}/><span>· <b style={{color:T.ink}}>{p.phLbl}</b> ({p.phase}/{p.phTotal})</span><span>· Marge <b style={{color:p.marge<p.margeInit?T.err:T.ok}}>{p.marge}%</b></span></div>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontSize:9,color:T.g500}}>Avancement</span><span style={{fontSize:9,fontWeight:700,color:T.koma}}>{p.av}%</span></div><Pr value={p.av}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:4,marginTop:8,fontSize:8}}>
          {[{l:"Budget",v:fM(p.budget),c:T.g700},{l:"Dépensé",v:fM(p.dep),c:T.g700},{l:"À facturer",v:fM(p.resteFacturer),c:T.warn},{l:"À encaisser",v:fM(p.resteEncaisser),c:T.err}].map((k,i)=><div key={i} style={{padding:"3px 5px",borderRadius:4,background:T.g50,textAlign:"center"}}><div style={{color:T.g400,fontSize:7}}>{k.l}</div><div style={{fontWeight:700,color:k.c}}>{k.v}</div></div>)}
        </div>
        {/* Scores santé */}
        <div style={{display:"flex",gap:4,marginTop:8}}>
          {[{l:"Santé",v:p.sante,c:p.sante>=70?T.ok:T.warn},{l:"Plan.",v:100-p.riskPlanning,c:p.riskPlanning>50?T.err:T.ok},{l:"Cash",v:100-p.riskCash,c:p.riskCash>50?T.err:T.ok},{l:"Qualité",v:100-p.riskQualite,c:p.riskQualite>20?T.warn:T.ok}].map((s,i)=><div key={i} style={{flex:1,textAlign:"center"}}><TG v={s.v} size={22}/><div style={{fontSize:6,color:T.g400,marginTop:1}}>{s.l}</div></div>)}
        </div>
        {p.blocage&&p.blocage!=="—"&&<div style={{marginTop:6,padding:"4px 8px",borderRadius:5,background:T.errBg,fontSize:8,color:T.err,fontWeight:600,display:"flex",alignItems:"center",gap:3}}><AlertTriangle size={9}/>{p.blocage}</div>}
        <div style={{marginTop:6,fontSize:8,color:T.g400}}>Éch.: <b style={{color:T.ink}}>{p.prochEch}</b></div>
        {p.actionClient&&p.actionClient!=="—"&&<div style={{marginTop:2,fontSize:8,color:T.warn,fontWeight:600}}>Action client: {p.actionClient}</div>}
      </Card>)}
    </div>
  </div>
  )};

/* ════════════════════════════════════════════
   PORTEFEUILLE
════════════════════════════════════════════ */
const PgPortfolio=({onNav})=>{
  const [fTypo,setFTypo]=useState("");
  const pjF=PJ.filter(p=>fTypo?p.typo===fTypo:true);
  return (<div style={{display:"flex",flexDirection:"column",gap:14}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}><h2 style={{fontSize:20,fontWeight:800,color:T.ink,margin:0}}>Portefeuille — Vue Consolidée</h2><div style={{display:"flex",gap:4}}><FD label="Typologie" options={[...new Set(PJ.map(p=>p.typo))]} value={fTypo} onChange={setFTypo}/></div></div>
    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}><KPI icon={Briefcase} label="Budget total" value={fM(pjF.reduce((s,p)=>s+p.budget,0))} accent/><KPI icon={Activity} label="Dépensé" value={fM(pjF.reduce((s,p)=>s+p.dep,0))} color={T.info} accent/><KPI icon={TrendingUp} label="Marge moy." value={(pjF.reduce((s,p)=>s+p.marge,0)/pjF.length).toFixed(0)+"%"} color={T.ok} accent/><KPI icon={AlertTriangle} label="Marge en baisse" value={String(pjF.filter(p=>p.marge<p.margeInit).length)} color={T.err} accent/></div>
    <Card><ST sub="Cliquez une ligne pour ouvrir le cockpit projet">Matrice décisionnelle</ST>
      <Tbl compact onRowClick={()=>onNav("projet")} cols={[
        {label:"Projet",render:r=><div><span style={{fontWeight:700,color:T.ink,fontSize:10}}>{r.nom}</span><div style={{fontSize:8,color:T.g400}}>{r.client} · {r.region}</div></div>},
        {label:"Type",render:r=><Badge v="dark" small>{r.typo}</Badge>},
        {label:"Phase",render:r=><Badge v="dark" small>{r.phLbl}</Badge>},
        {label:"Av.",render:r=><div style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:40}}><Pr value={r.av}/></div><span style={{fontSize:8,fontWeight:700}}>{r.av}%</span></div>},
        {label:"Budget",render:r=><span style={{fontWeight:600}}>{fM(r.budget)}</span>},
        {label:"Marge",render:r=><span style={{fontWeight:700,color:r.marge<r.margeInit?T.err:T.ok}}>{r.marge}%</span>},
        {label:"À encaisser",render:r=><span style={{fontWeight:600,color:T.warn}}>{fM(r.resteEncaisser)}</span>},
        {label:"Santé",render:r=><TG v={r.sante} size={22}/>},
        {label:"Risque",render:r=><RI level={r.risque}/>},
        {label:"Client",render:r=><TG v={r.tempClient} size={22}/>},
        {label:"Blocage",render:r=>r.blocage&&r.blocage!=="—"?<span style={{fontSize:8,color:T.err}}>{r.blocage}</span>:<span style={{color:T.g300}}>—</span>},
      ]} data={pjF}/>
    </Card>
  </div>
)};

/* ════════════════════════════════════════════
   PROSPECTS & CRM
════════════════════════════════════════════ */
const PgProspects=()=>{
  const [sel,setSel]=useState(null);
  const pr=sel?PROSP.find(p=>p.id===sel):null;
  return (<div style={{display:"flex",flexDirection:"column",gap:14}}>
    <div style={{display:"flex",justifyContent:"space-between"}}><div><h2 style={{fontSize:20,fontWeight:800,color:T.ink,margin:0}}>Prospects & CRM</h2><p style={{fontSize:10,color:T.g500}}>Qualification · Pipeline · Conversion</p></div><Btn icon={Plus}>Nouveau</Btn></div>
    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}><KPI icon={Users} label="Leads" value="5" accent/><KPI icon={Flame} label="Chauds" value="3" color={T.err} accent/><KPI icon={Target} label="Conversion" value="67%" color={T.ok} trend={5} accent/><KPI icon={Briefcase} label="Pipeline" value="475M" color={T.info} accent/><KPI icon={Banknote} label="Besoin financ." value="3" color={T.purp} accent/></div>
    <div style={{display:"grid",gridTemplateColumns:sel?"1fr 340px":"1fr",gap:10}}>
      <Tbl onRowClick={r=>setSel(r.id===sel?null:r.id)} cols={[
        {label:"Score",render:r=><div style={{width:24,height:24,borderRadius:"50%",background:r.score>80?T.ok+"15":r.score>60?T.warn+"15":T.g100,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:800,color:r.score>80?T.ok:r.score>60?T.warn:T.g500}}>{r.score}</div>},
        {label:"Prospect",render:r=><div><div style={{fontWeight:700,color:T.ink}}>{r.nom}</div><div style={{fontSize:8,color:T.g400}}>{r.email} · {r.source}</div></div>},
        {label:"Projet",render:r=><div><div style={{fontWeight:600,fontSize:9}}>{r.typo}</div><div style={{fontSize:8,color:T.g400}}>{r.loc} · {r.budget}</div></div>},
        {label:"Maturité",render:r=><Badge v={r.maturite==="Très chaud"?"danger":r.maturite==="Chaud"?"warning":"dark"}>{r.maturite}</Badge>},
        {label:"Segment",render:r=><Badge v={r.segment==="À convertir vite"?"danger":r.segment==="À nourrir"?"info":"dark"} small>{r.segment}</Badge>},
        {label:"Flags",render:r=><div style={{display:"flex",gap:2}}>{r.terrain&&<Badge v="success" small>Terrain</Badge>}{r.financement&&<Badge v="purple" small>Financ.</Badge>}{r.etudes&&<Badge v="info" small>Études</Badge>}</div>},
        {label:"Contact",render:r=><div><div style={{fontSize:9}}>{r.dernierContact}</div><div style={{fontSize:7,color:r.jDepuis>7?T.err:T.g400}}>{r.jDepuis}j</div></div>},
        {label:"Action",render:r=><span style={{fontSize:9,fontWeight:600,color:r.prochAction.includes("CONVERTIR")?T.err:T.ink}}>{r.prochAction}</span>},
      ]} data={PROSP}/>
      {pr&&<Card accent={T.koma}>
        <ST>Fiche prospect</ST>
        <div style={{fontSize:16,fontWeight:800,color:T.ink,marginBottom:6}}>{pr.nom}</div>
        <div style={{fontSize:9,color:T.g500,lineHeight:1.8}}>
          <div><b>Email:</b> {pr.email}</div>
          <div><b>Source:</b> {pr.source}</div>
          <div><b>Projet:</b> {pr.typo} · {pr.loc} · {pr.budget} FCFA</div>
          <div><b>Besoin:</b> {pr.besoin}</div>
          <div><b>Maturité:</b> <Badge v={pr.maturite==="Très chaud"?"danger":"warning"} small>{pr.maturite}</Badge></div>
          <div><b>Score:</b> <span style={{fontWeight:700,color:pr.score>80?T.ok:T.warn}}>{pr.score}/100</span></div>
          <div><b>Terrain:</b> {pr.terrain?"✅ Oui":"❌ Non"}</div>
          <div><b>Financement:</b> {pr.financement?"✅ Requis":"—"}</div>
          <div><b>SPOC:</b> {pr.resp}</div>
        </div>
        <div style={{marginTop:10}}><ST sub="Chronologie">Historique</ST>
          {pr.historique.map((h,i)=><div key={i} style={{display:"flex",gap:6,padding:"4px 0",borderBottom:`1px solid ${T.g100}`}}><span style={{fontSize:8,color:T.g400,minWidth:35}}>{h.d}</span><span style={{fontSize:9,color:T.g700}}>{h.a}</span></div>)}
        </div>
        <div style={{marginTop:10,display:"flex",gap:4}}><Btn small icon={Phone}>Appeler</Btn><Btn small v="secondary" icon={Mail}>Email</Btn>{pr.segment==="À convertir vite"&&<Btn small icon={ArrowRight}>Convertir</Btn>}</div>
      </Card>}
    </div>
  </div>
)};

/* ════════════════════════════════════════════
   VUE PROJET (with lot drill-down)
════════════════════════════════════════════ */
const PgProjet=({setModal})=>{
  const [selLot,setSelLot]=useState(null);
  const [selPj,setSelPj]=useState("PRJ-001");
  const p=PJ.find(x=>x.id===selPj)||PJ[0];
  const lots=LOTS.filter(l=>l.pj===p.id);
  const lot=selLot?lots.find(l=>l.code===selLot):null;
  return (<div style={{display:"flex",flexDirection:"column",gap:12}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
      <div>{selLot&&<span onClick={()=>setSelLot(null)} style={{fontSize:9,color:T.koma,cursor:"pointer",display:"flex",alignItems:"center",gap:2,marginBottom:4}}><ChevronLeft size={10}/>Retour au projet</span>}
        <div style={{display:"flex",alignItems:"center",gap:6}}><h2 style={{fontSize:20,fontWeight:800,color:T.ink,margin:0}}>{selLot?`${lot.code} — ${lot.nom}`:p.nom}</h2><SB s={p.statut}/><Badge v={p.risque==="Élevé"?"danger":"warning"}>{p.risque}</Badge></div>
        <div style={{fontSize:10,color:T.g500,marginTop:3}}><MapPin size={10} style={{display:"inline",verticalAlign:"-1px"}}/> {p.loc} · {p.typo} · {p.client}</div>
      </div>
      <FD label="Projet" options={PJ.map(pp=>pp.id)} value={selPj} onChange={v=>{setSelPj(v);setSelLot(null)}}/>
    </div>
    {!selLot?<>
      {/* KPIs */}
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}><KPI icon={Activity} label="Avancement" value={p.av+"%"} accent/><KPI icon={DollarSign} label="Budget validé" value={fM(p.budgetVal)} color={T.ok} accent/><KPI icon={Receipt} label="Dépensé" value={fM(p.dep)} color={T.info} accent/><KPI icon={Wallet} label="À encaisser" value={fM(p.resteEncaisser)} color={T.err} accent/><KPI icon={Target} label="Marge" value={p.marge+"%"} sub={p.marge<p.margeInit?`Init.${p.margeInit}%↓`:""} color={p.marge<p.margeInit?T.err:T.ok} accent/></div>
      {/* Timeline */}
      <Card><ST>Timeline projet</ST><div style={{display:"flex",gap:0,overflow:"auto"}}>{[{l:"Découverte",done:true},{l:"Foncier",done:true},{l:"Pré-faisabilité",done:true},{l:"Conception",done:true},{l:"Devis",done:true},{l:"Financement",done:true},{l:"Contract.",done:true},{l:"Construction",done:false,current:true},{l:"Réception",done:false},{l:"Clôture",done:false}].map((s,i)=><div key={i} style={{flex:1,textAlign:"center",position:"relative"}}><div style={{width:16,height:16,borderRadius:"50%",margin:"0 auto",background:s.done?T.ok:s.current?T.koma:T.g200,border:s.current?`2px solid ${T.koma}`:undefined,display:"flex",alignItems:"center",justifyContent:"center"}}>{s.done&&<CheckCircle2 size={10} color="#fff"/>}{s.current&&<div style={{width:6,height:6,borderRadius:"50%",background:"#fff"}}/>}</div><div style={{fontSize:7,color:s.done?T.ok:s.current?T.koma:T.g400,marginTop:3,fontWeight:s.current?700:400}}>{s.l}</div>{i<9&&<div style={{position:"absolute",top:8,left:"50%",width:"100%",height:2,background:s.done?T.ok:T.g200}}/>}</div>)}</div></Card>
      {/* 3-col */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
        <Card><ST>Équipe projet</ST>{[{r:"SPOC",n:p.spoc,c:T.koma},{r:"AMOA",n:p.amoa,c:T.wc},{r:"MOE",n:p.moe,c:T.purp},{r:"MOEX",n:p.moex,c:T.warn},{r:"Client",n:p.client,c:T.info}].map((a,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"5px 0",borderBottom:`1px solid ${T.g100}`,fontSize:10}}><div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:22,height:22,borderRadius:6,background:a.c+"12",display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:700,color:a.c}}>{a.r[0]}</div><span style={{color:T.ink}}>{a.n}</span></div><Badge v="dark" small>{a.r}</Badge></div>)}</Card>
        <Card accent={T.info}><ST>Relation client</ST><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}><TG v={p.tempClient} size={40}/><div><div style={{fontSize:10,fontWeight:700,color:T.ink}}>{p.client}</div><div style={{fontSize:8,color:T.g500}}>Dernier: {p.dernierEchange}</div></div></div><div style={{fontSize:9,color:T.g700,lineHeight:1.7}}><div><b>Action:</b> <span style={{color:T.err,fontWeight:600}}>{p.actionClient}</span></div><div><b>Promesse:</b> {p.promesse}</div><div><b>Sensible:</b> <span style={{color:p.sujetSensible!=="—"?T.warn:T.g400}}>{p.sujetSensible}</span></div><div><b>Satisfaction:</b> <span style={{fontWeight:700,color:p.scoreSatisf>=70?T.ok:T.warn}}>{p.scoreSatisf}/100</span></div></div></Card>
        <Card><ST>Activité récente</ST>{[{d:"16/04",m:"Rapport coffrage R+1 validé",c:T.ok,i:FileCheck},{d:"15/04",m:"Écart +4% Lot II signalé",c:T.warn,i:AlertCircle},{d:"12/04",m:"Visite AMOA conforme",c:T.wc,i:Eye},{d:"10/04",m:"FAC-003 émise 8,4M",c:T.warn,i:Receipt}].map((a,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:`1px solid ${T.g100}`}}><div style={{width:22,height:22,borderRadius:5,background:a.c+"0F",display:"flex",alignItems:"center",justifyContent:"center"}}><a.i size={10} color={a.c}/></div><span style={{flex:1,fontSize:9,color:T.g700}}>{a.m}</span><span style={{fontSize:8,color:T.g400}}>{a.d}</span></div>)}</Card>
      </div>
      {/* Lots — drill down */}
      <Card><ST sub="Cliquez un lot pour voir les sections, tâches et opérations">Progression par Lot</ST>
        {lots.map((l,i)=><div key={i} onClick={()=>l.sections.length>0&&setSelLot(l.code)} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:`1px solid ${T.g100}`,cursor:l.sections.length>0?"pointer":"default"}}>
          <span style={{fontSize:9,fontWeight:600,color:T.ink,minWidth:140}}>{l.code} — {l.nom}</span>
          <div style={{flex:1}}><Pr value={l.pReel} planned={l.pPlan}/></div>
          <span style={{fontSize:9,fontWeight:700,color:l.pReel<l.pPlan?T.warn:T.ok,minWidth:32,textAlign:"right"}}>{l.pReel}%</span>
          <span style={{fontSize:8,color:T.g400,minWidth:55,textAlign:"right"}}>{fM(l.dep)}/{fM(l.budget)}</span>
          <span style={{fontSize:8,color:T.g500,minWidth:40,textAlign:"right"}}>M:{l.marge}%</span>
          {l.risque!=="—"&&<Badge v="danger" small>{l.risque}</Badge>}
          {l.sections.length>0&&<ChevronRight size={12} color={T.g300}/>}
        </div>)}
      </Card>
    </>
    :/* LOT DETAIL */
    <>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}><KPI icon={Activity} label="Avancement lot" value={lot.pReel+"%"} accent/><KPI icon={DollarSign} label="Budget lot" value={fM(lot.budget)} color={T.ok} accent/><KPI icon={Receipt} label="Dépensé" value={fM(lot.dep)} color={T.info} accent/><KPI icon={Wallet} label="Engagé" value={fM(lot.engage)} color={T.warn} accent/><KPI icon={Target} label="Marge" value={lot.marge+"%"} color={T.ok} accent/></div>
      {lot.sections.map((sec,si)=><Card key={si}>
        <ST sub={`Avancement: ${sec.av}%`}>{sec.code} — {sec.nom}</ST>
        <Pr value={sec.av} h={6}/>
        <div style={{marginTop:10}}>
          {sec.taches.map((t,ti)=><div key={ti} style={{padding:"8px 0",borderBottom:`1px solid ${T.g100}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontFamily:"monospace",fontSize:8,color:T.koma}}>{t.code}</span><span style={{fontSize:10,fontWeight:600,color:T.ink}}>{t.nom}</span><SB s={t.etat}/></div>
              <div style={{display:"flex",alignItems:"center",gap:4}}><span style={{fontSize:8,color:T.g500}}>{t.resp}</span><div style={{width:30}}><Pr value={t.av}/></div><span style={{fontSize:8,fontWeight:700}}>{t.av}%</span></div>
            </div>
            {t.blocage&&<div style={{fontSize:8,color:T.err,marginTop:3}}>⚠ Blocage: {t.blocage}</div>}
            {t.ops&&<div style={{marginTop:6,marginLeft:16,borderLeft:`2px solid ${T.g200}`,paddingLeft:10}}>
              <div style={{fontSize:8,fontWeight:700,color:T.g500,marginBottom:4}}>OPÉRATIONS</div>
              {t.ops.map((op,oi)=><div key={oi} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"3px 0",borderBottom:`1px solid ${T.g100}`,fontSize:9}}>
                <div><span style={{fontFamily:"monospace",fontSize:7,color:T.purp}}>{op.code}</span> <span style={{fontWeight:500}}>{op.nom}</span></div>
                <div style={{display:"flex",gap:8,alignItems:"center"}}><span style={{color:T.g500}}>{op.qte} {op.unite}</span><span style={{fontWeight:600}}>{fM(op.total)}</span><div style={{width:30}}><Pr value={op.avOp}/></div><span style={{fontWeight:700,fontSize:8}}>{op.avOp}%</span></div>
              </div>)}
            </div>}
          </div>)}
        </div>
      </Card>)}
    </>}
  </div>
  )};

/* ════════════════════════════════════════════
   DEVIS & PLANNING
════════════════════════════════════════════ */
const PgDevis=({onNav})=>{
  const totalLots=LOTS.reduce((s,l)=>s+l.budget,0);
  return (<div style={{display:"flex",flexDirection:"column",gap:14}}>
    <div style={{display:"flex",justifyContent:"space-between"}}><h2 style={{fontSize:20,fontWeight:800,color:T.ink,margin:0}}>Devis & Planning — PRJ-001</h2><FD label="Projet" options={PJ.map(p=>p.id)} value="PRJ-001" onChange={()=>{}}/></div>
    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}><KPI icon={Receipt} label="Total HT" value={fM(totalLots)} color={T.koma} accent/><KPI icon={DollarSign} label="Budget validé" value="123,5M" color={T.ok} accent/><KPI icon={Target} label="Marge" value="18%" sub="Init 22%↓" color={T.err} accent/><KPI icon={Calendar} label="Durée" value="14 mois" color={T.info} accent/><KPI icon={FileText} label="Version" value="V3" sub="Signée 10/04" color={T.purp} accent/></div>
    <Card><ST sub="Cliquez un lot pour voir les opérations (Vue Projet)">Décomposition par lot</ST>
      <Tbl compact onRowClick={()=>onNav("projet")} cols={[
        {label:"Lot",render:r=><span style={{fontWeight:700,fontSize:9}}>{r.code}</span>},
        {label:"Désignation",render:r=><span style={{fontWeight:500}}>{r.nom}</span>},
        {label:"Budget",render:r=><span style={{fontWeight:600}}>{fM(r.budget)}</span>},
        {label:"Dépensé",render:r=><span>{fM(r.dep)}</span>},
        {label:"Engagé",render:r=><span style={{color:T.warn}}>{fM(r.engage)}</span>},
        {label:"Reste",render:r=><span style={{fontWeight:600,color:T.info}}>{fM(r.budget-r.dep-r.engage)}</span>},
        {label:"Marge",render:r=><span style={{fontWeight:700,color:T.ok}}>{r.marge}%</span>},
        {label:"Av.",render:r=><div style={{display:"flex",alignItems:"center",gap:3}}><div style={{width:36}}><Pr value={r.pReel} planned={r.pPlan}/></div><span style={{fontSize:8,fontWeight:700}}>{r.pReel}%</span></div>},
        {label:"Écart",render:r=>{const d=r.pReel-r.pPlan;return (<span style={{fontSize:8,fontWeight:600,color:d<0?T.err:d>0?T.ok:T.g400}}>{d>0?"+":""}{d}%</span>)}},
        {label:"Risque",render:r=>r.risque!=="—"?<Badge v="danger" small>{r.risque}</Badge>:<span style={{color:T.g300}}>—</span>},
      ]} data={LOTS}/>
    </Card>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
      <Card><ST>Jalons planning</ST>{[{j:"Démarrage GO",d:"15/01",s:"Terminé"},{j:"Fondation",d:"15/03",s:"Terminé"},{j:"Élévation R+1",d:"22/04",s:"En cours"},{j:"Clos couvert",d:"15/07",s:"À venir"},{j:"Réception prov.",d:"30/11",s:"À venir"}].map((j,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:`1px solid ${T.g100}`}}><div style={{width:8,height:8,borderRadius:"50%",background:j.s==="Terminé"?T.ok:j.s==="En cours"?T.koma:T.g300}}/><span style={{flex:1,fontSize:10,fontWeight:500,color:T.ink}}>{j.j}</span><span style={{fontSize:9,color:T.g500}}>{j.d}</span><SB s={j.s}/></div>)}</Card>
      <Card><ST>Points d'arbitrage</ST>{[{p:"Carreau +12% : absorber ou alternative",i:"Lot IV",pr:"P2"},{p:"Hausse ciment +4% — avenant ou marge",i:"Marge -2%",pr:"P2"},{p:"Option piscine 8,5M — extension scope",i:"Client",pr:"P3"}].map((a,i)=><div key={i} style={{padding:"6px 0",borderBottom:`1px solid ${T.g100}`}}><div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:9,fontWeight:600,color:T.ink}}>{a.p}</span><Badge v={a.pr==="P2"?"warning":"dark"} small>{a.pr}</Badge></div><div style={{fontSize:8,color:T.g500,marginTop:2}}>Impact: {a.i}</div></div>)}</Card>
    </div>
  </div>
)};

/* ════════════════════════════════════════════
   TÂCHES CRITIQUES
════════════════════════════════════════════ */
function PgTaches({onNav}) {
  var _s = useState(""); var fPj = _s[0]; var setFPj = _s[1];
  var _e = useState(""); var fEtat = _e[0]; var setFEtat = _e[1];
  var tf = TACHES.filter(function(t) {
    return (fPj ? t.pj===fPj : true) && (fEtat ? t.etat===fEtat : true);
  });
  var retard = tf.filter(function(t){ return t.etat==="Retard"; });
  var bloquees = tf.filter(function(t){ return t.etat==="Bloquée"; });
  var urgentes = retard.concat(bloquees);
  return (
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <h2 style={{fontSize:20,fontWeight:800,color:T.ink,margin:0}}>
          Tâches Critiques — Centre de Commandement
        </h2>
        <div style={{display:"flex",gap:4}}>
          <FD label="Projet" options={[...new Set(TACHES.map(function(t){return t.pj}))]}
            value={fPj} onChange={setFPj} />
          <FD label="État" options={["Retard","Bloquée","En cours","À faire"]}
            value={fEtat} onChange={setFEtat} />
        </div>
      </div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        <KPI icon={AlertTriangle} label="En retard" value={String(retard.length)}
          color={T.err} accent />
        <KPI icon={X} label="Bloquées" value={String(bloquees.length)}
          color={T.rose} accent />
        <KPI icon={Eye} label="En cours"
          value={String(tf.filter(function(t){return t.etat==="En cours"}).length)}
          color={T.warn} accent />
        <KPI icon={Clock} label="À faire"
          value={String(tf.filter(function(t){return t.etat==="À faire"}).length)}
          color={T.g500} accent />
      </div>
      {/* Alertes urgentes */}
      {urgentes.length > 0 && (
        <Card accent={T.err}>
          <ST sub="Actions de commandement immédiates">Situations critiques</ST>
          {urgentes.map(function(t,i) {
            return (
              <div key={i} style={{padding:"8px 10px",borderRadius:6,
                background:t.etat==="Retard"?T.errBg:T.warnBg,
                border:"1px solid "+(t.etat==="Retard"?T.err+"15":T.warn+"15"),
                marginBottom:6}}>
                <div style={{display:"flex",justifyContent:"space-between",
                  alignItems:"flex-start"}}>
                  <div>
                    <div style={{display:"flex",alignItems:"center",gap:4}}>
                      <span style={{fontFamily:"monospace",fontSize:8,
                        color:T.koma}}>{t.code}</span>
                      <span style={{fontSize:11,fontWeight:700,color:T.ink}}>
                        {t.nom}
                      </span>
                      <SB s={t.etat} />
                    </div>
                    <div style={{fontSize:8,color:T.g500,marginTop:2}}>
                      {t.pj} · {t.lot} · Resp: {t.resp} · Éch: {t.dateLim}
                    </div>
                  </div>
                  <Badge v={t.etat==="Retard"?"danger":"warning"}>
                    {t.impactDelai}
                  </Badge>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",
                  gap:6,marginTop:6,fontSize:8}}>
                  <div style={{padding:"3px 6px",borderRadius:4,background:T.w}}>
                    <div style={{color:T.g400}}>Impact délai</div>
                    <div style={{fontWeight:700,color:T.err}}>{t.impactDelai}</div>
                  </div>
                  <div style={{padding:"3px 6px",borderRadius:4,background:T.w}}>
                    <div style={{color:T.g400}}>Impact cash</div>
                    <div style={{fontWeight:700,color:T.warn}}>
                      {t.impactCash !== "—" ? t.impactCash : "—"}
                    </div>
                  </div>
                  <div style={{padding:"3px 6px",borderRadius:4,background:T.w}}>
                    <div style={{color:T.g400}}>Impact client</div>
                    <div style={{fontWeight:700,color:T.err}}>
                      {t.impactClient !== "—" ? t.impactClient : "—"}
                    </div>
                  </div>
                </div>
                {t.blocage !== "—" && (
                  <div style={{marginTop:4,fontSize:8,color:T.err,fontWeight:600}}>
                    Blocage: {t.blocage}
                  </div>
                )}
                <div style={{display:"flex",gap:4,marginTop:6}}>
                  <Btn small v="secondary" icon={Phone}
                    onClick={function(){onNav("projet")}}>Relancer</Btn>
                  <Btn small v="secondary" icon={AlertTriangle}>Escalader</Btn>
                  <Btn small v="secondary" icon={Building2}
                    onClick={function(){onNav("projet")}}>Projet</Btn>
                  {t.preuves.length>0 && (
                    <Btn small v="secondary" icon={FileCheck}>
                      {t.preuves.length} preuve(s)
                    </Btn>
                  )}
                </div>
              </div>
            );
          })}
        </Card>
      )}
      {/* Table complète */}
      <Tbl onRowClick={function(){onNav("projet")}} cols={[
        {label:"Réf.",render:function(r){return (
          <span style={{fontFamily:"monospace",fontSize:8,color:T.koma,
            fontWeight:600}}>{r.code}</span>
        )}},
        {label:"Tâche",render:function(r){return (
          <div>
            <div style={{fontWeight:600,color:T.ink}}>{r.nom}</div>
            <div style={{fontSize:8,color:T.g400}}>
              {r.pj} {r.lot!=="—"?" · "+r.lot:""}
              {r.section!=="—"?" · "+r.section:""}
            </div>
          </div>
        )}},
        {label:"Resp.",render:function(r){return (
          <span style={{fontSize:9}}>{r.resp}</span>
        )}},
        {label:"État",render:function(r){return <SB s={r.etat}/>}},
        {label:"Av.",render:function(r){return (
          <div style={{display:"flex",alignItems:"center",gap:3}}>
            <div style={{width:30}}><Pr value={r.av}/></div>
            <span style={{fontSize:8,fontWeight:700}}>{r.av}%</span>
          </div>
        )}},
        {label:"Éch.",render:function(r){return (
          <span style={{fontWeight:600,fontSize:9}}>{r.dateLim}</span>
        )}},
        {label:"Délai",render:function(r){return <RI level={r.impactDelai}/>}},
        {label:"Cash",render:function(r){return r.impactCash!=="—" ?
          <span style={{fontSize:8,color:T.warn,fontWeight:600}}>{r.impactCash}</span> :
          <span style={{color:T.g300}}>—</span>
        }},
        {label:"Client",render:function(r){return r.impactClient!=="—" ?
          <span style={{fontSize:8,color:T.err}}>{r.impactClient}</span> :
          <span style={{color:T.g300}}>—</span>
        }},
        {label:"Blocage",render:function(r){return r.blocage!=="—" ?
          <Badge v="danger" small>{r.blocage}</Badge> :
          <span style={{color:T.g300}}>—</span>
        }},
        {label:"Action",render:function(r){return (
          <span style={{fontSize:8,fontWeight:600}}>{r.prochainPas}</span>
        )}},
        {label:"Preuves",render:function(r){return r.preuves.length>0 ?
          <Badge v="info" small>{r.preuves.length} doc(s)</Badge> :
          <span style={{color:T.g300}}>—</span>
        }},
      ]} data={tf} />
    </div>
  );
}

/* ════════════════════════════════════════════
   ACHATS
════════════════════════════════════════════ */
const PgAchats=()=>{
  const [fPj,setFPj]=useState("");
  const af=ACHATS.filter(a=>fPj?a.pj===fPj:true);
  return (<div style={{display:"flex",flexDirection:"column",gap:14}}>
    <div style={{display:"flex",justifyContent:"space-between"}}><h2 style={{fontSize:20,fontWeight:800,color:T.ink,margin:0}}>Achats — Approvisionnement</h2><FD label="Projet" options={[...new Set(ACHATS.map(a=>a.pj))]} value={fPj} onChange={setFPj}/></div>
    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}><KPI icon={ShoppingCart} label="DA actives" value={String(af.length)} accent/><KPI icon={AlertTriangle} label="Arbitrage prix" value={String(af.filter(a=>a.s==="Arbitrage prix").length)} color={T.err} accent/><KPI icon={Truck} label="En transit" value={String(af.filter(a=>a.s==="En transit").length)} color={T.warn} accent/></div>
    <div style={{fontSize:9,color:T.g500,padding:"6px 10px",background:T.infoBg,borderRadius:6,border:`1px solid ${T.info}15`}}>
      <b style={{color:T.info}}>Flux métier:</b> MOEX demande → AMOA vérifie quantification → Acheteur consulte fournisseurs → AMOA valide prix/qualité → Commande → Livraison → Réception MOEX → Entrée stock
    </div>
    <Tbl cols={[
      {label:"DA",render:r=><span style={{fontFamily:"monospace",fontSize:8,color:T.koma,fontWeight:600}}>{r.id}</span>},
      {label:"Article",render:r=><div><div style={{fontWeight:600}}>{r.art}</div><div style={{fontSize:8,color:T.g400}}>{r.qte} {r.unite} · {r.fourn}</div></div>},
      {label:"Projet",render:r=><Badge v="dark" small>{r.pj}</Badge>},
      {label:"Lot / Tâche",render:r=><span style={{fontSize:8}}>{r.lot} · {r.tache}</span>},
      {label:"Montant",render:r=><span style={{fontWeight:600}}>{fM(r.mt)}</span>},
      {label:"Statut",render:r=><SB s={r.s}/>},
      {label:"Risque",render:r=>r.risque!=="—"?<Badge v="danger" small>{r.risque}</Badge>:<span style={{color:T.g300}}>—</span>},
      {label:"Impact",render:r=>r.impactPlan!=="—"?<span style={{fontSize:8,color:T.warn}}>{r.impactPlan}</span>:<span style={{color:T.g300}}>—</span>},
      {label:"FQ",render:r=>r.ficheQualite?<CheckCircle2 size={10} color={T.ok}/>:<X size={10} color={T.g300}/>},
      {label:"BL",render:r=>r.blSigne?<CheckCircle2 size={10} color={T.ok}/>:<X size={10} color={T.g300}/>},
      {label:"Récept.",render:r=>r.signatureReception!=="—"?<Badge v="success" small>Signé</Badge>:<span style={{color:T.g300}}>—</span>},
      {label:"Action",render:r=>r.actionSpoc!=="—"?<span style={{fontSize:8,fontWeight:600,color:T.err}}>{r.actionSpoc}</span>:<span style={{color:T.g300}}>—</span>},
    ]} data={af}/>
  </div>
)};

/* ════════════════════════════════════════════
   STOCK
════════════════════════════════════════════ */
const PgStock=()=>{
  const [fPj,setFPj]=useState("");
  var allPjs = [];
  STOCK.forEach(function(s){ if(allPjs.indexOf(s.pj)===-1) allPjs.push(s.pj); });
  var sf = fPj ? STOCK.filter(function(s){ return s.pj===fPj; }) : STOCK;
  var rupt = sf.filter(function(s){ return s.alerte==="rupture"; }).length;
  var seuil = sf.filter(function(s){ return s.alerte==="seuil"; }).length;
  return (
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <h2 style={{fontSize:20,fontWeight:800,color:T.ink,margin:0}}>Stock — Vue Risques et Impacts</h2>
        <div style={{display:"flex",gap:4,alignItems:"center"}}>
          {allPjs.map(function(pjId){
            var pj = PJ.find(function(p){ return p.id===pjId; });
            var active = fPj===pjId;
            return (
              <button key={pjId} onClick={function(){ setFPj(active?"":pjId); }}
                style={{padding:"4px 10px",borderRadius:6,fontSize:9,fontWeight:600,
                  cursor:"pointer",border:"1px solid "+(active?T.koma:T.brd),
                  background:active?T.komaL:T.g50,color:active?T.komaD:T.g600}}>
                {pj ? pj.nom : pjId}
              </button>
            );
          })}
          {fPj && (
            <button onClick={function(){ setFPj(""); }}
              style={{padding:"4px 8px",borderRadius:6,fontSize:8,cursor:"pointer",
                border:"1px solid "+T.brd,background:T.g50,color:T.g500}}>
              Tous
            </button>
          )}
        </div>
      </div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        <KPI icon={Boxes} label="Articles suivis" value={String(sf.length)} accent />
        <KPI icon={AlertTriangle} label="Rupture" value={String(rupt)}
          sub={rupt>0?"Action requise":""} color={T.err} accent />
        <KPI icon={AlertCircle} label="Seuil critique" value={String(seuil)}
          color={T.warn} accent />
        <KPI icon={Clock} label="Délai réappro max"
          value={sf.length>0?sf.reduce(function(m,s){
            var d=parseInt(s.delaiReappro);return d>m?d:m;
          },0)+"j":"—"} color={T.warn} accent />
      </div>
    <Tbl cols={[
      {label:"Code",render:r=><span style={{fontFamily:"monospace",fontSize:8,color:T.koma}}>{r.code}</span>},
      {label:"Article",render:r=><span style={{fontWeight:600}}>{r.nom}</span>},
      {label:"Stock",render:r=><span style={{fontWeight:700,color:r.stock===0?T.err:r.stock<=r.seuil*1.2?T.warn:T.ok}}>{r.stock}</span>},
      {label:"Seuil",render:r=><span style={{color:T.g400}}>{r.seuil}</span>},
      {label:"Couvert.",render:r=><span style={{fontSize:9}}>{r.couverture}j</span>},
      {label:"Conso/j",render:r=><span style={{fontSize:9}}>{r.conso}</span>},
      {label:"Réservé",render:r=>r.reserve>0?<span style={{color:T.purp,fontWeight:600}}>{r.reserve}</span>:<span style={{color:T.g300}}>—</span>},
      {label:"Projet",render:r=><Badge v="dark" small>{r.pj}</Badge>},
      {label:"Lot",render:r=><span style={{fontSize:8}}>{r.lot}</span>},
      {label:"Tâche",render:r=><span style={{fontSize:8}}>{r.tache}</span>},
      {label:"Délai",render:r=><span style={{fontSize:9}}>{r.delaiReappro}</span>},
      {label:"Alerte",render:r=>r.alerte==="rupture"?<Badge v="danger">Rupture</Badge>:r.alerte==="seuil"?<Badge v="warning">Seuil</Badge>:<Badge v="success">OK</Badge>},
      {label:"Conséquence",render:r=>r.consequence!=="—"?<span style={{fontSize:8,color:T.err}}>{r.consequence}</span>:<span style={{color:T.g300}}>—</span>},
    ]} data={sf}/>
  </div>
)};

/* ════════════════════════════════════════════
   FACTURATION & PAIEMENT — Tiers de confiance
════════════════════════════════════════════ */
const PgFacturation=()=>{
  const [fPj,setFPj]=useState("");const [fStat,setFStat]=useState("");
  const ff=FACS.filter(f=>(fPj?f.pj===fPj:true)&&(fStat?f.s===fStat:true));
  const totalPaye=ff.reduce((s,f)=>f.s==="Payée"?s+f.mt:s,0);const totalAtt=ff.reduce((s,f)=>f.s==="En attente"||f.s==="Validée"?s+f.mt:s,0);
  return (<div style={{display:"flex",flexDirection:"column",gap:14}}>
    <div style={{display:"flex",justifyContent:"space-between"}}><h2 style={{fontSize:20,fontWeight:800,color:T.ink,margin:0}}>Facturation & Paiement</h2><div style={{display:"flex",gap:4}}><FD label="Projet" options={[...new Set(FACS.map(f=>f.pj))]} value={fPj} onChange={setFPj}/><FD label="Statut" options={[...new Set(FACS.map(f=>f.s))]} value={fStat} onChange={setFStat}/></div></div>
    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}><KPI icon={Receipt} label="Factures émises" value={String(ff.length)} accent/><KPI icon={CheckCircle2} label="Encaissé" value={fM(totalPaye)} color={T.ok} accent/><KPI icon={Clock} label="En attente" value={fM(totalAtt)} color={T.warn} accent/><KPI icon={Lock} label="En séquestre" value={fM(PAIEMENTS.filter(p=>p.statut==="Séquestre").reduce((s,p)=>s+p.mt,0))} color={T.purp} accent/><KPI icon={Unlock} label="Libérable" value={fM(FACS.filter(f=>f.liberable).reduce((s,f)=>s+f.mt,0))} color={T.ok} accent/></div>
    {/* Logique tiers de confiance */}
    <Card style={{background:T.purpL+"40",border:`1px solid ${T.purp}15`}}><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}><Shield size={14} color={T.purp}/><span style={{fontSize:11,fontWeight:700,color:T.purp}}>Logique Tiers de Confiance SPOC</span></div>
      <div style={{fontSize:9,color:T.g700,lineHeight:1.7}}>Les paiements client sont versés en <b>séquestre</b>. Le SPOC ne libère les fonds vers les prestataires (AMOA / MOE / MOEX) que lorsque les <b>preuves métier</b> sont validées : livrables validés, rapports validés, PV de réception signés, BL signés. Aucun paiement automatique.</div>
    </Card>
    <Card><ST>Factures</ST>
      <Tbl compact cols={[
        {label:"N°",render:r=><span style={{fontFamily:"monospace",fontSize:8,color:T.koma,fontWeight:600}}>{r.id}</span>},
        {label:"Projet",render:r=><Badge v="dark" small>{r.pj}</Badge>},
        {label:"Client",render:r=><span style={{fontWeight:500}}>{r.client}</span>},
        {label:"Objet",render:r=><span style={{fontWeight:500}}>{r.objet}</span>},
        {label:"Type",render:r=><Badge v="info" small>{r.type}</Badge>},
        {label:"Montant",render:r=><span style={{fontWeight:700}}>{fM(r.mt)}</span>},
        {label:"Éch.",render:r=><span style={{fontSize:9}}>{r.ech}</span>},
        {label:"Statut",render:r=><SB s={r.s}/>},
        {label:"Preuve",render:r=>r.preuve!=="—"?<Badge v="success" small>{r.preuve}</Badge>:<Badge v="warning" small>Manquante</Badge>},
        {label:"Libérable",render:r=>r.liberable?<Badge v="success" small onClick={()=>{}}><Unlock size={8}/> Libérer</Badge>:<span style={{color:T.g300}}>—</span>},
        {label:"Risque",render:r=><RI level={r.risque}/>},
        {label:"Action",render:r=>r.actionSpoc!=="—"?<span style={{fontSize:8,fontWeight:600,color:T.err}}>{r.actionSpoc}</span>:<span style={{color:T.g300}}>—</span>},
      ]} data={ff}/>
    </Card>
    <Card><ST>Paiements reçus & libérations</ST>
      <Tbl compact cols={[
        {label:"ID",render:r=><span style={{fontFamily:"monospace",fontSize:8}}>{r.id}</span>},
        {label:"Projet",render:r=><Badge v="dark" small>{r.pj}</Badge>},
        {label:"Client",render:r=><span style={{fontSize:9}}>{r.client}</span>},
        {label:"Montant",render:r=><span style={{fontWeight:700}}>{fM(r.mt)}</span>},
        {label:"Date",render:r=><span style={{fontSize:9}}>{r.date}</span>},
        {label:"Mode",render:r=><Badge v="dark" small>{r.mode}</Badge>},
        {label:"Facture",render:r=><span style={{fontSize:8}}>{r.fac}</span>},
        {label:"Statut",render:r=><SB s={r.statut}/>},
        {label:"Dest. libération",render:r=>r.destLib!=="—"?<span style={{fontSize:8,color:T.ok,fontWeight:600}}>{r.destLib}</span>:<span style={{color:T.g300}}>—</span>},
        {label:"Date lib.",render:r=><span style={{fontSize:8}}>{r.dateLib}</span>},
      ]} data={PAIEMENTS}/>
    </Card>
    {/* Volet Fournisseurs & Livraisons */}
    <Card accent={T.wc}>
      <ST sub="Commande → Livraison → Réception → Preuve → Paiement">Fournisseurs & Livraisons reçues</ST>
      <Tbl compact cols={[
        {label:"DA",render:r=><span style={{fontFamily:"monospace",fontSize:8,color:T.koma}}>{r.id}</span>},
        {label:"Fournisseur",render:r=><span style={{fontWeight:600,fontSize:9}}>{r.fourn}</span>},
        {label:"Article",render:r=><span style={{fontSize:9}}>{r.art}</span>},
        {label:"Projet",render:r=><Badge v="dark" small>{r.pj}</Badge>},
        {label:"Montant",render:r=><span style={{fontWeight:600}}>{fM(r.mt)}</span>},
        {label:"Statut",render:r=><SB s={r.s}/>},
        {label:"BL reçu",render:r=>r.blSigne?<Badge v="success" small>Signé</Badge>:<Badge v="warning" small>Non</Badge>},
        {label:"Récept. MOEX",render:r=>r.signatureReception!=="—"?<Badge v="success" small>Validée</Badge>:<span style={{color:T.g300}}>—</span>},
        {label:"FQ AMOA",render:r=>r.ficheQualite?<Badge v="success" small>OK</Badge>:<span style={{color:T.g300}}>—</span>},
        {label:"Libérable",render:r=>r.blSigne&&r.ficheQualite?<Badge v="success" small>Oui</Badge>:<Badge v="danger" small>Non</Badge>},
      ]} data={ACHATS}/>
    </Card>
    {/* Flux visuel */}
    <Card>
      <ST>Flux de décaissement — Tiers de confiance</ST>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"12px 0"}}>
        {["Commande\nfournisseur","Livraison\nchantier","Réception\nMOEX","BL signé\n+ FQ AMOA","Validation\nSPOC","Paiement\nlibéré"].map(function(step,i){
          return (
            <div key={i} style={{display:"flex",alignItems:"center",gap:6}}>
              <div style={{textAlign:"center",padding:"8px 10px",borderRadius:8,
                background:i<4?T.okBg:i===4?T.warnBg:T.infoBg,
                border:"1px solid "+(i<4?T.ok+"20":i===4?T.warn+"20":T.info+"20"),
                minWidth:70}}>
                <div style={{fontSize:8,fontWeight:600,color:i<4?T.ok:i===4?T.warn:T.info,
                  whiteSpace:"pre-line",lineHeight:1.4}}>{step}</div>
              </div>
              {i<5 && <ArrowRight size={12} color={T.g300}/>}
            </div>
          );
        })}
      </div>
    </Card>
  </div>
)};

/* ════════════════════════════════════════════
   RAPPORTS
════════════════════════════════════════════ */
const PgRapports=()=>{
  const [fPj,setFPj]=useState("");const [fType,setFType]=useState("");const [fRole,setFRole]=useState("");
  const rf=RAPS.filter(r=>(fPj?r.pj===fPj:true)&&(fType?r.type===fType:true)&&(fRole?r.roleAuteur===fRole:true));
  return (<div style={{display:"flex",flexDirection:"column",gap:14}}>
    <div style={{display:"flex",justifyContent:"space-between"}}><h2 style={{fontSize:20,fontWeight:800,color:T.ink,margin:0}}>Rapports — Hub Reporting</h2><div style={{display:"flex",gap:4}}><FD label="Projet" options={[...new Set(RAPS.map(r=>r.pj))]} value={fPj} onChange={setFPj}/><FD label="Type" options={[...new Set(RAPS.map(r=>r.type))]} value={fType} onChange={setFType}/><FD label="Intervenant" options={["AMOA","MOE","MOEX"]} value={fRole} onChange={setFRole}/></div></div>
    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}><KPI icon={FileCheck} label="Total" value={String(rf.length)} accent/><KPI icon={Clock} label="À valider" value={String(rf.filter(r=>r.s==="Soumis").length)} color={T.warn} accent/><KPI icon={Send} label="À transmettre" value={String(rf.filter(r=>r.actionSpoc.includes("Transmettre")).length)} color={T.info} accent/><KPI icon={AlertTriangle} label="Sensibles" value={String(rf.filter(r=>r.sensible).length)} color={T.err} accent/></div>
    <Tbl cols={[
      {label:"Réf.",render:r=><span style={{fontFamily:"monospace",fontSize:8}}>{r.id}</span>},{label:"Date",key:"date"},
      {label:"Type",render:r=><Badge v={r.type.includes("Visite")?"active":r.type.includes("Qualité")?"purple":r.type.includes("MOE")?"info":"default"}>{r.type}</Badge>},
      {label:"Projet",render:r=><Badge v="dark" small>{r.pj}</Badge>},
      {label:"Auteur",render:r=><div><span style={{fontSize:9,fontWeight:600}}>{r.auteur}</span><div><Badge v={r.roleAuteur==="MOEX"?"warning":r.roleAuteur==="MOE"?"info":"active"} small>{r.roleAuteur}</Badge></div></div>},
      {label:"Résumé",render:r=><span style={{fontSize:9,maxWidth:180,display:"inline-block",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.resume}</span>},
      {label:"Lot",render:r=>r.lot!=="—"?<Badge v="dark" small>{r.lot}</Badge>:<span style={{color:T.g300}}>—</span>},
      {label:"Photos",render:r=><span style={{fontSize:9}}>{r.photos}</span>},
      {label:"Ver.",render:r=><span style={{fontSize:8}}>{r.version}</span>},
      {label:"Sensible",render:r=>r.sensible?<Badge v="danger" small>Oui</Badge>:<span style={{color:T.g300}}>—</span>},
      {label:"Transmis.",render:r=>r.transmissible?<Badge v="success" small>Oui</Badge>:<Badge v="warning" small>Non</Badge>},
      {label:"Action",render:r=>r.actionSpoc!=="—"?<Badge v={r.actionSpoc.includes("Valider")?"warning":"info"}>{r.actionSpoc}</Badge>:<span style={{color:T.g300}}>—</span>},
      {label:"Statut",render:r=><SB s={r.s}/>},
    ]} data={rf}/>
  </div>
)};

/* ════════════════════════════════════════════
   DOCUMENTS (ex GED)
════════════════════════════════════════════ */
const PgDocs=()=>{
  const [fPj,setFPj]=useState("");const [fCat,setFCat]=useState("");
  const df=DOCS.filter(d=>(fPj?d.pj===fPj:true)&&(fCat?d.cat===fCat:true));
  return (<div style={{display:"flex",flexDirection:"column",gap:14}}>
    <div style={{display:"flex",justifyContent:"space-between"}}><h2 style={{fontSize:20,fontWeight:800,color:T.ink,margin:0}}>Documents — Centre Documentaire</h2><div style={{display:"flex",gap:4}}><FD label="Projet" options={[...new Set(DOCS.map(d=>d.pj))]} value={fPj} onChange={setFPj}/><FD label="Catégorie" options={[...new Set(DOCS.map(d=>d.cat))]} value={fCat} onChange={setFCat}/><Btn icon={Upload} small>Téléverser</Btn></div></div>
    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{["Devis","Contrats","Plans","Rapports","PV","Photos","Études","Planning","AO"].map((c,i)=>{const cnt=DOCS.filter(d=>d.cat===c&&(fPj?d.pj===fPj:true)).length;if(cnt===0)return null;return (<div key={i} onClick={()=>setFCat(fCat===c?"":c)} style={{padding:"8px 12px",borderRadius:8,background:fCat===c?T.koma+"12":T.g50,border:`1px solid ${fCat===c?T.koma+"30":T.brd}`,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}><FolderOpen size={13} color={fCat===c?T.koma:T.g500}/><div><div style={{fontSize:10,fontWeight:600,color:T.ink}}>{c}</div><div style={{fontSize:8,color:T.g400}}>{cnt} doc{cnt>1?"s":""}</div></div></div>)})}</div>
    <Tbl cols={[
      {label:"Document",render:r=><span style={{fontWeight:600,fontSize:9}}>{r.nom}</span>},
      {label:"Cat.",render:r=><Badge v="dark" small>{r.cat}</Badge>},
      {label:"Projet",render:r=><Badge v="info" small>{r.pj}</Badge>},
      {label:"Lot",render:r=>r.lot!=="—"?<span style={{fontSize:8}}>{r.lot}</span>:<span style={{color:T.g300}}>—</span>},
      {label:"Lié à",render:r=><span style={{fontSize:8,color:T.purp}}>{r.lie}</span>},
      {label:"Ver.",render:r=><span style={{fontSize:8}}>{r.ver}</span>},
      {label:"Date",key:"date"},
      {label:"Auteur",render:r=><span style={{fontSize:9}}>{r.auteur}</span>},
      {label:"Statut",render:r=><SB s={r.statut}/>},
      {label:"",render:()=><div style={{display:"flex",gap:4}}><Eye size={11} color={T.g400} style={{cursor:"pointer"}}/><Download size={11} color={T.g400} style={{cursor:"pointer"}}/></div>},
    ]} data={df}/>
  </div>
)};

/* ════════════════════════════════════════════
   MESSAGERIE
════════════════════════════════════════════ */
const PgMsg=()=>{
  const [sel,setSel]=useState(0);const [fCanal,setFCanal]=useState("");const [fPj,setFPj]=useState("");
  const mf=MSGS.filter(m=>(fCanal?m.canal===fCanal:true)&&(fPj?m.pj===fPj:true));
  const m=mf[sel]||mf[0];
  return (<div style={{display:"flex",flexDirection:"column",gap:14}}>
    <div style={{display:"flex",justifyContent:"space-between"}}><h2 style={{fontSize:20,fontWeight:800,color:T.ink,margin:0}}>Messagerie — Coordination</h2><div style={{display:"flex",gap:4}}><FD label="Canal" options={["client","interne","externe","fournisseur","groupe-projet"]} value={fCanal} onChange={setFCanal}/><FD label="Projet" options={[...new Set(MSGS.map(m=>m.pj))]} value={fPj} onChange={setFPj}/></div></div>
    <div style={{display:"flex",gap:6}}>{["Tous","Client","AMOA","MOE","MOEX","Fournisseur","Groupe","Externe"].map((f,i)=>{const c=f==="Tous"?mf.length:mf.filter(m=>m.role===f).length;return (<div key={i} style={{padding:"4px 10px",borderRadius:20,background:i===0?T.koma+"12":T.g50,border:"1px solid "+(i===0?T.koma+"30":T.brd),fontSize:9,fontWeight:600,color:i===0?T.komaD:T.g600,cursor:"pointer"}}>{f} ({c})</div>)})}<div style={{marginLeft:"auto"}}><Badge v="danger" small>{mf.filter(m=>m.attente).length} en attente</Badge></div></div>
    <div style={{display:"grid",gridTemplateColumns:"280px 1fr",gap:0,border:`1px solid ${T.brd}`,borderRadius:10,overflow:"hidden",height:400}}>
      <div style={{borderRight:"1px solid "+T.brd,overflowY:"auto"}}>
        {mf.map(function(msg,i){
          var avatarBg = msg.role==="Client" ? T.info+"12" : msg.role==="AMOA" ? T.wc+"12" : msg.role==="Fournisseur" ? T.warn+"12" : T.purp+"12";
          var avatarC = msg.role==="Client" ? T.info : msg.role==="AMOA" ? T.wcD : msg.role==="Fournisseur" ? T.warn : T.purp;
          return (
            <div key={i} onClick={function(){setSel(i)}}
              style={{display:"flex",alignItems:"flex-start",gap:8,padding:"10px 12px",
                borderBottom:"1px solid "+T.g100,cursor:"pointer",
                background:sel===i?T.koma+"06":"transparent",
                borderLeft:sel===i?"3px solid "+T.koma:"3px solid transparent"}}>
              <div style={{width:26,height:26,borderRadius:7,background:avatarBg,
                display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:9,fontWeight:700,color:avatarC,flexShrink:0}}>
                {msg.from[0]}
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <span style={{fontSize:10,fontWeight:600,color:T.ink}}>{msg.from}</span>
                  <span style={{fontSize:7,color:T.g400}}>{msg.time.split(" ")[0]}</span>
                </div>
                <div style={{display:"flex",gap:3,marginTop:1}}>
                  <Badge v={msg.role==="Client"?"info":msg.role==="Fournisseur"?"warning":"active"} small>{msg.role}</Badge>
                  <Badge v="dark" small>{msg.pj}</Badge>
                  {msg.canal==="interne" && <Badge v="purple" small>Int.</Badge>}
                  {msg.canal==="fournisseur" && <Badge v="active" small>Fourn.</Badge>}
                  {msg.canal==="groupe-projet" && <Badge v="info" small>Grp</Badge>}
                  {msg.canal==="externe" && <Badge v="dark" small>Ext.</Badge>}
                  {msg.attente && <Badge v="danger" small>Att.</Badge>}
                </div>
                <div style={{fontSize:9,color:T.g500,marginTop:2,overflow:"hidden",
                  textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{msg.msg}</div>
              </div>
              {msg.unread && <div style={{width:7,height:7,borderRadius:"50%",
                background:T.koma,flexShrink:0,marginTop:4}} />}
            </div>
          );
        })}
      </div>
      <div style={{display:"flex",flexDirection:"column",background:T.g50}}><div style={{padding:"10px 16px",borderBottom:`1px solid ${T.brd}`,background:T.w}}><div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontWeight:700,fontSize:13,color:T.ink}}>{m?.from}</span><Badge v={m?.role==="Client"?"info":"active"}>{m?.role}</Badge><Badge v="dark">{m?.pj}</Badge>{m?.attente&&<Badge v="danger">Réponse attendue</Badge>}</div><div style={{fontSize:9,color:T.info,marginTop:2}}>{m?.objet}</div></div><div style={{flex:1,padding:14,display:"flex",flexDirection:"column",justifyContent:"flex-end",gap:8}}><div style={{alignSelf:"flex-start",background:T.w,padding:"8px 12px",borderRadius:"4px 10px 10px 10px",fontSize:10,color:T.ink,border:`1px solid ${T.brd}`,maxWidth:"75%",lineHeight:1.5}}>{m?.msg}</div><div style={{alignSelf:"flex-end",background:T.koma,padding:"8px 12px",borderRadius:"10px 4px 10px 10px",fontSize:10,color:"#fff",maxWidth:"75%",lineHeight:1.5}}>Bien reçu. Je reviens vers vous demain avec les éléments à jour.</div></div><div style={{padding:"8px 12px",borderTop:`1px solid ${T.brd}`,background:T.w,display:"flex",gap:6}}><input placeholder="Écrire un message..." style={{flex:1,padding:"6px 10px",borderRadius:6,border:`1px solid ${T.brd}`,fontSize:10,outline:"none"}}/><Btn icon={Paperclip} v="secondary" small/><Btn icon={Send}>Envoyer</Btn></div></div>
    </div>
  </div>
)};

/* ════════════════════════════════════════════
   MÉTÉO
════════════════════════════════════════════ */
const PgMeteo=()=>{const alC={vert:T.ok,orange:T.warn,rouge:T.err};return (<div style={{display:"flex",flexDirection:"column",gap:14}}>
  <div style={{display:"flex",justifyContent:"space-between"}}><h2 style={{fontSize:20,fontWeight:800,color:T.ink,margin:0}}>Météo Chantier</h2><FD label="Projet" options={PJ.filter(p=>p.statut==="Actif").map(p=>p.id)} value="PRJ-001" onChange={()=>{}}/></div>
  <Card accent={T.err}><div style={{display:"flex",alignItems:"center",gap:8}}><AlertTriangle size={16} color={T.err}/><div><div style={{fontSize:12,fontWeight:700,color:T.err}}>Alerte rouge — Vendredi 18/04 — Douala</div><div style={{fontSize:10,color:T.g700,lineHeight:1.6}}>35mm pluie · Coffrage + coulage suspendus · Coulage avancé au jeudi · Client prévenu · Planning mis à jour</div></div></div></Card>
  <Card><ST>Prévisions 5 jours — PRJ-001 Douala</ST><div style={{display:"flex",gap:6}}>{METEO.map((m,i)=><div key={i} style={{flex:1,textAlign:"center",padding:"10px 6px",borderRadius:8,background:T.g50,border:`1px solid ${m.al==="rouge"?T.err+"25":T.brd}`}}><div style={{fontSize:9,fontWeight:600,color:T.g500}}>{m.j}</div><div style={{fontSize:24,margin:"4px 0"}}>{m.ic}</div><div style={{fontSize:15,fontWeight:800,color:T.ink}}>{m.tM}°</div>{m.pl>0&&<div style={{fontSize:9,fontWeight:700,color:T.err}}>{m.pl}mm</div>}<div style={{marginTop:4,fontSize:8,fontWeight:700,padding:"2px 6px",borderRadius:8,display:"inline-block",background:(alC[m.al]||T.ok)+"12",color:alC[m.al]||T.ok}}>{m.al}</div></div>)}</div></Card>
  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}><Card><ST>Tâches impactées</ST><div style={{padding:"6px 0",fontSize:10}}><span style={{fontWeight:600}}>T-001 Coffrage R+1</span> — suspendu ven, reprise lun</div><div style={{padding:"6px 0",fontSize:10}}><span style={{fontWeight:600}}>T-002 Coulage</span> — avancé à jeu 17/04</div></Card><Card><ST>Historique alertes</ST>{[{d:"18/04",t:"🌧️ Rouge — 35mm — GO suspendu",dec:"Coulage avancé"},{d:"13/04",t:"🌧️ Orange — 42mm — journée justifiée",dec:"Effectif réduit"}].map((h,i)=><div key={i} style={{padding:"4px 0",borderBottom:`1px solid ${T.g100}`,fontSize:9}}><b>{h.d}</b> — {h.t}<br/><span style={{color:T.g500}}>Décision: {h.dec}</span></div>)}</Card></div>
</div>)};

/* ════════════════════════════════════════════
   VIDÉOSURVEILLANCE
════════════════════════════════════════════ */
function PgVideo() {
  var _s = useState(""); var fPj = _s[0]; var setFPj = _s[1];
  var _v = useState("projet"); var vue = _v[0]; var setVue = _v[1];
  var allPjs = [];
  CAMS.forEach(function(c){ if(allPjs.indexOf(c.pj)===-1) allPjs.push(c.pj); });
  var cf = fPj ? CAMS.filter(function(c){ return c.pj===fPj; }) : CAMS;
  var online = cf.filter(function(c){ return c.s==="En ligne"; }).length;
  var anomalies = cf.filter(function(c){ return c.anomalie; }).length;
  return (
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <h2 style={{fontSize:20,fontWeight:800,color:T.ink,margin:0}}>Vidéosurveillance</h2>
        <div style={{display:"flex",gap:4}}>
          <button onClick={function(){setVue("portfolio");setFPj("")}}
            style={{padding:"4px 10px",borderRadius:6,fontSize:9,fontWeight:600,
              cursor:"pointer",border:"1px solid "+(vue==="portfolio"?T.koma:T.brd),
              background:vue==="portfolio"?T.komaL:T.g50,
              color:vue==="portfolio"?T.komaD:T.g600}}>
            Vue Portefeuille
          </button>
          {allPjs.map(function(pjId){
            var pj = PJ.find(function(p){ return p.id===pjId; });
            var active = vue==="projet" && fPj===pjId;
            return (
              <button key={pjId} onClick={function(){setVue("projet");setFPj(pjId)}}
                style={{padding:"4px 10px",borderRadius:6,fontSize:9,fontWeight:600,
                  cursor:"pointer",border:"1px solid "+(active?T.koma:T.brd),
                  background:active?T.komaL:T.g50,color:active?T.komaD:T.g600}}>
                {pj ? pj.nom : pjId}
              </button>
            );
          })}
        </div>
      </div>
      <div style={{display:"flex",gap:8}}>
        <KPI icon={Camera} label="Caméras actives" value={online+"/"+cf.length}
          sub={cf.length-online>0?(cf.length-online)+" hors ligne":"Toutes en ligne"}
          color={cf.length-online>0?T.warn:T.ok} accent />
        <KPI icon={AlertTriangle} label="Anomalies" value={String(anomalies)}
          color={anomalies>0?T.err:T.ok} accent />
        <KPI icon={Shield} label="Sécurité"
          value={anomalies>1?"Critique":anomalies>0?"Moyen":"OK"}
          color={anomalies>1?T.err:anomalies>0?T.warn:T.ok} accent />
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10}}>
        {cf.map(function(cam){
          var on = cam.s==="En ligne";
          var pj = PJ.find(function(p){ return p.id===cam.pj; });
          return (
            <Card key={cam.id}
              style={{border:cam.anomalie?"1px solid "+T.err+"20":undefined}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                <div>
                  <span style={{fontWeight:700,fontSize:11,color:T.ink}}>{cam.nom}</span>
                  <div style={{fontSize:8,color:T.g500}}>
                    {cam.zone} · {cam.id}
                    {vue==="portfolio" && pj && (
                      <span> · <b style={{color:T.koma}}>{pj.nom}</b></span>
                    )}
                  </div>
                </div>
                <div style={{display:"flex",gap:4}}>
                  <SB s={cam.s} />
                  {cam.anomalie && <Badge v="danger" small>Anomalie</Badge>}
                </div>
              </div>
              <div style={{width:"100%",aspectRatio:"16/9",borderRadius:8,
                background:on?"linear-gradient(135deg,#0F172A,#1E293B)":"#0F172A",
                display:"flex",alignItems:"center",justifyContent:"center",
                position:"relative"}}>
                {on ? (
                  <div>
                    <div style={{position:"absolute",top:8,left:10,display:"flex",
                      alignItems:"center",gap:4}}>
                      <div style={{width:6,height:6,borderRadius:"50%",
                        background:T.err,animation:"pulse 1.5s infinite"}} />
                      <span style={{fontSize:8,color:"#fff",fontWeight:700}}>LIVE</span>
                    </div>
                    <Camera size={28} strokeWidth={1} color="rgba(255,255,255,.08)" />
                  </div>
                ) : (
                  <div style={{textAlign:"center"}}>
                    <X size={22} color={T.err} />
                    <div style={{fontSize:8,color:T.g400,marginTop:4}}>Flux coupé</div>
                  </div>
                )}
              </div>
              <div style={{fontSize:8,color:T.g400,marginTop:4}}>{cam.lastEvt}</div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   KPI & ANALYTICS
════════════════════════════════════════════ */
const PgKPI=()=>(<div style={{display:"flex",flexDirection:"column",gap:14}}>
  <h2 style={{fontSize:20,fontWeight:800,color:T.ink,margin:0}}>KPI & Analytics — Direction SPOC</h2>
  <div style={{display:"flex",gap:8,flexWrap:"wrap"}}><KPI icon={Target} label="Conversion" value="67%" trend={5} accent/><KPI icon={DollarSign} label="Écart coût" value="+2,3%" color={T.ok} accent/><KPI icon={Clock} label="Cycle vente" value="42j" color={T.info} accent/><KPI icon={Activity} label="Av. moyen" value="29%" color={T.koma} accent/><KPI icon={Star} label="Valid. 1er passage" value="78%" color={T.purp} accent/><KPI icon={Banknote} label="Cash-in mensuel" value="47M" color={T.ok} trend={12} accent/></div>
  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
    <Card><ST>Avancement par projet</ST>{PJ.map((p,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"4px 0",borderBottom:`1px solid ${T.g100}`}}><span style={{fontSize:9,fontWeight:600,color:T.ink,minWidth:110}}>{p.nom}</span><div style={{flex:1}}><Pr value={p.av}/></div><span style={{fontSize:9,fontWeight:700,minWidth:28,textAlign:"right"}}>{p.av}%</span></div>)}</Card>
    <Card><ST>Performance partenaires</ST>
      <Tbl compact cols={[
        {label:"Partenaire",render:r=><span style={{fontWeight:600}}>{r.n}</span>},
        {label:"Délai",render:r=><span style={{color:r.del>=90?T.ok:r.del>=80?T.warn:T.err}}>{r.del}%</span>},
        {label:"Qualité",render:r=><span style={{color:r.qual>=90?T.ok:T.warn}}>{r.qual}%</span>},
        {label:"Réactivité",render:r=><span style={{color:r.react>=90?T.ok:T.warn}}>{r.react}%</span>},
        {label:"Conformité",render:r=><span style={{color:r.conf>=90?T.ok:T.warn}}>{r.conf}%</span>},
      ]} data={[{n:"BTP Cameroun (MOEX)",del:88,qual:90,react:85,conf:92},{n:"Bati-Plus (MOEX)",del:72,qual:85,react:70,conf:80},{n:"Arc. Njoya (MOE)",del:95,qual:94,react:96,conf:98},{n:"Archi Design (MOE)",del:92,qual:96,react:90,conf:95},{n:"S. Kamga (AMOA)",del:96,qual:97,react:98,conf:99}]}/>
    </Card>
  </div>
  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
    <Card><ST>Commercial</ST>{[{l:"Prospects actifs",v:"5"},{l:"Conversion YTD",v:"67%"},{l:"Pipeline",v:"475M"},{l:"Cycle vente",v:"42j"}].map((k,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",borderBottom:`1px solid ${T.g100}`,fontSize:9}}><span style={{color:T.g500}}>{k.l}</span><span style={{fontWeight:700,color:T.ink}}>{k.v}</span></div>)}</Card>
    <Card><ST>Financier</ST>{[{l:"Cash-in YTD",v:"47M"},{l:"À encaisser",v:"243M"},{l:"Créances >30j",v:"0"},{l:"Relance OK",v:"85%"}].map((k,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",borderBottom:`1px solid ${T.g100}`,fontSize:9}}><span style={{color:T.g500}}>{k.l}</span><span style={{fontWeight:700,color:T.ink}}>{k.v}</span></div>)}</Card>
    <Card><ST>Relation client</ST>{[{l:"Satisfaction moy.",v:"74%"},{l:"Clients sereins",v:"3/5"},{l:"Promesses tenues",v:"80%"},{l:"Clients tendus",v:"1/5"}].map((k,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",borderBottom:`1px solid ${T.g100}`,fontSize:9}}><span style={{color:T.g500}}>{k.l}</span><span style={{fontWeight:700,color:T.ink}}>{k.v}</span></div>)}</Card>
  </div>
</div>);

/* ════════════════════════════════════════════
   IA KOMA
════════════════════════════════════════════ */
const PgIA=()=>(<div style={{display:"flex",flexDirection:"column",gap:14}}>
  <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:32,height:32,borderRadius:8,background:`linear-gradient(135deg,${T.koma},${T.purp})`,display:"flex",alignItems:"center",justifyContent:"center"}}><Brain size={16} color="#fff"/></div><div><h2 style={{fontSize:20,fontWeight:800,color:T.ink,margin:0}}>IA KOMA — Intelligence SPOC</h2><p style={{fontSize:10,color:T.g500}}>16 avril 2026</p></div></div>
  <Card style={{background:`linear-gradient(135deg,${T.komaXL},${T.purpL}30)`,border:`1px solid ${T.koma}20`}}><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10}}><Sparkles size={14} color={T.koma}/><span style={{fontSize:13,fontWeight:700,color:T.ink}}>Synthèse IA du jour</span></div><div style={{fontSize:10,color:T.g700,lineHeight:1.9}}><b style={{color:T.err}}>P1 — PRJ-004</b>: Retard +8j diagnostic. Client frustré (30/100). Devis bloqué. Appeler P. Essomba immédiatement.<br/><b style={{color:T.warn}}>P1 — Conversion</b>: M. Eyinga score 91 — immeuble R+3, 250M. Planifier RDV cadrage + AMOA.<br/><b style={{color:T.info}}>Finance</b>: 16,4M en attente (FAC-003 + FAC-007). FAC-003 conditionne matériaux. FAC-004 libérable après validation MOEX.<br/><b>Opérationnel</b>: Météo rouge ven — coulage avancé. Stock carreau en rupture — DA-005 +12% à arbitrer.</div></Card>
  <Card><ST>Recommandations hiérarchisées</ST>{[
    {prio:"P1",a:"Appeler P. Essomba — retard +8j, frustré, devis bloqué",t:"Client",i:"Perte client"},
    {prio:"P1",a:"Convertir M. Eyinga — RDV cadrage + AMOA",t:"Commercial",i:"250M pipeline"},
    {prio:"P1",a:"Relancer FAC-003 — 8,4M conditionne approvisionnement",t:"Finance",i:"Blocage chantier"},
    {prio:"P2",a:"Arbitrer DA-005 carreau +12%",t:"Achats",i:"Lot IV bloqué"},
    {prio:"P2",a:"Libérer paiement MOEX — FAC-004 (preuve validée)",t:"Paiement",i:"Relation fournisseur"},
    {prio:"P2",a:"Proposer 3 MOE à M. Ndiaye",t:"Coordination",i:"Frustration client"},
    {prio:"P3",a:"Transmettre rapport visite 12/04 au client Fouda",t:"Reporting",i:"Promesse"},
  ].map((r,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 0",borderBottom:`1px solid ${T.g100}`}}><Badge v={r.prio==="P1"?"danger":r.prio==="P2"?"warning":"dark"}>{r.prio}</Badge><span style={{flex:1,fontSize:10,color:T.ink}}>{r.a}</span><Badge v="info" small>{r.t}</Badge><span style={{fontSize:7,color:T.g400,maxWidth:100,textAlign:"right"}}>{r.i}</span></div>)}</Card>
  <ST>Modules IA</ST>
  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
    <Card style={{borderTop:`2px solid ${T.koma}`}}><div style={{fontSize:8,fontWeight:700,color:T.koma,textTransform:"uppercase",marginBottom:4}}>Automatisation</div>{["Génération contrats","Remplissage auto formulaires","Archivage GED automatique","Facturation auto sur jalons"].map((m,i)=><div key={i} style={{fontSize:9,color:T.g700,padding:"3px 0",borderBottom:`1px solid ${T.g100}`}}>{m}</div>)}</Card>
    <Card style={{borderTop:`2px solid ${T.purp}`}}><div style={{fontSize:8,fontWeight:700,color:T.purp,textTransform:"uppercase",marginBottom:4}}>Assistance intelligente</div>{["Préparation appel client","Synthèse avant réunion","Scoring prospects","Aide choix partenaire","Prévision encaissement"].map((m,i)=><div key={i} style={{fontSize:9,color:T.g700,padding:"3px 0",borderBottom:`1px solid ${T.g100}`}}>{m}</div>)}</Card>
    <Card style={{borderTop:`2px solid ${T.err}`}}><div style={{fontSize:8,fontWeight:700,color:T.err,textTransform:"uppercase",marginBottom:4}}>Analyse IA avancée</div>{["Analyse photos chantier","Détection malfaçons","Comparaison plans/exécution","Détection dérives budget","Analyse rapports qualité","Synthèse dirigeant"].map((m,i)=><div key={i} style={{fontSize:9,color:T.g700,padding:"3px 0",borderBottom:`1px solid ${T.g100}`}}>{m}</div>)}</Card>
  </div>
</div>);

/* ═══════════ MAIN APP ═══════════ */
export default function KomaSPOC(){
  const [nav,setNav]=useState("cockpit");
  const [modal,setModal]=useState(null);
  const pages={
    cockpit:<PgCockpit onNav={setNav} setModal={setModal}/>,
    portfolio:<PgPortfolio onNav={setNav}/>,
    prospects:<PgProspects/>,
    projet:<PgProjet setModal={setModal}/>,
    devis:<PgDevis onNav={setNav}/>,
    taches:<PgTaches onNav={setNav}/>,
    achats:<PgAchats/>,
    stock:<PgStock/>,
    facturation:<PgFacturation/>,
    rapports:<PgRapports/>,
    docs:<PgDocs/>,
    msg:<PgMsg/>,
    meteo:<PgMeteo/>,
    video:<PgVideo/>,
    kpi:<PgKPI/>,
    ia:<PgIA/>,
  };
  return (<div style={{display:"flex",height:"100vh",width:"100%",fontFamily:"'DM Sans','Segoe UI',system-ui,sans-serif",background:T.bg,overflow:"hidden"}}>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');*{box-sizing:border-box;margin:0}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:#CBD5E1;border-radius:3px}button:hover{opacity:.92}@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
    <Sidebar nav={nav} onNav={setNav}/>
    <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <div style={{height:48,padding:"0 20px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`1px solid ${T.brd}`,background:T.w}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{display:"flex",alignItems:"center",gap:4,background:T.g50,borderRadius:6,padding:"4px 10px",border:`1px solid ${T.brd}`,width:280}}><Search size={12} color={T.g400}/><input placeholder="Rechercher projet, client, tâche, document..." style={{border:"none",background:"transparent",outline:"none",fontSize:10,color:T.g700,width:"100%"}}/></div></div>
        <div style={{display:"flex",alignItems:"center",gap:10}}><div style={{fontSize:9,color:T.g500}}>16 Avr 2026 · 14:22</div><div style={{position:"relative",cursor:"pointer"}}><Bell size={16} color={T.g500}/><div style={{position:"absolute",top:-2,right:-2,width:7,height:7,borderRadius:"50%",background:T.err,border:"2px solid #fff"}}/></div></div>
      </div>
      <div style={{flex:1,overflow:"auto",padding:20}}>{pages[nav]||<PgCockpit onNav={setNav} setModal={setModal}/>}</div>
    </div>
    <Modal open={!!modal} onClose={()=>setModal(null)} title={modal?.type==="risk"?"Projets à risque":""}>
      {modal?.type==="risk"&&<div>{PJ.filter(p=>p.risque==="Élevé").map((p,i)=><Card key={i} style={{marginBottom:10}} accent={T.err}><div style={{fontSize:12,fontWeight:700,color:T.ink}}>{p.id} — {p.nom}</div><div style={{fontSize:10,color:T.g700,marginTop:4,lineHeight:1.7}}><div><b>Client:</b> {p.client} (temp. {p.tempClient}/100)</div><div><b>Blocage:</b> {p.blocage}</div><div><b>Risques:</b> Planning {p.riskPlanning}% · Cash {p.riskCash}% · Qualité {p.riskQualite}%</div><div><b>Action:</b> <span style={{color:T.err,fontWeight:600}}>{p.actionClient}</span></div></div></Card>)}</div>}
    </Modal>
  </div>
  )
}

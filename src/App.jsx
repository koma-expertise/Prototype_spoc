import { useState, useCallback, useEffect } from "react";
import {
  Building2, Users, FileText, BarChart3, ShoppingCart,
  DollarSign, Calendar, MessageSquare, FolderOpen, CloudSun, Camera,
  ChevronRight, ChevronDown, Bell, Search, Menu, Plus,
  CheckCircle2, Clock, AlertTriangle, ArrowRight, ArrowUpRight,
  Home, LogOut, Eye, Download, Upload,
  MapPin, Truck, Zap, Phone, Mail,
  ClipboardList, FileCheck, Send, RefreshCw,
  Activity, Target, Briefcase, Star,
  HardHat, Ruler, Calculator, Boxes, Receipt, CreditCard,
  Video, Shield, Brain, Layers, Info,
  Hammer, TrendingUp, TrendingDown, X, Paperclip,
  Filter, MoreHorizontal, ThermometerSun, CircleDot,
  Flame, Gauge, UserCheck, AlertCircle, ChevronUp,
  Package, FileWarning, Hash, Landmark, BarChart2,
  PieChart, Banknote, Wallet, Scale, CircleAlert, Mic,
  Lightbulb, Sparkles, MessageCircle, ExternalLink
} from "lucide-react";

/* ═══════════════ DESIGN SYSTEM ═══════════════ */
const T = {
  // Brand
  koma: "#18B7D2", komaD: "#0E8FA8", komaL: "#E0F5F9", komaXL: "#F2FBFD",
  wc: "#6BC0AA", wcD: "#4FA08B", wcL: "#E8F5F0",
  // Neutrals
  ink: "#0F172A", inkS: "#1E293B", g700: "#334155", g600: "#475569",
  g500: "#64748B", g400: "#94A3B8", g300: "#CBD5E1", g200: "#E2E8F0", g100: "#F1F5F9", g50: "#F8FAFC",
  w: "#FFFFFF",
  // Semantic
  ok: "#059669", okL: "#D1FAE5", okBg: "#ECFDF5",
  warn: "#D97706", warnL: "#FEF3C7", warnBg: "#FFFBEB",
  err: "#DC2626", errL: "#FEE2E2", errBg: "#FEF2F2",
  info: "#2563EB", infoL: "#DBEAFE", infoBg: "#EFF6FF",
  purp: "#7C3AED", purpL: "#EDE9FE",
  rose: "#E11D48", roseL: "#FFE4E6",
  amber: "#F59E0B",
  // Surfaces
  panel: "#FFFFFF", bg: "#F8FAFC", bgAlt: "#F1F5F9",
  brd: "#E2E8F0", brdS: "#CBD5E1",
  // Sidebar
  sbBg: "#0F172A", sbHover: "rgba(255,255,255,0.04)", sbActive: "rgba(24,183,210,0.12)",
  sbText: "rgba(255,255,255,0.45)", sbTextActive: "#18B7D2",
};

const fM = (v) => {
  if (v >= 1e9) return (v / 1e9).toFixed(1) + "Md";
  if (v >= 1e6) return (v / 1e6).toFixed(1) + "M";
  if (v >= 1e3) return (v / 1e3).toFixed(0) + "K";
  return String(v);
};

/* ═══════════════ COMPREHENSIVE MOCK DATA ═══════════════ */
const PJ = [
  { id:"PRJ-001", nom:"Villa Éden", loc:"Douala, Bonamoussadi", client:"Jean-Pierre Fouda", clientTel:"+33 6 12 34 56", typo:"Construction neuve", phase:7, phLbl:"Construction GO", phTotal:10, statut:"Actif", av:44, budget:120e6, budgetVal:123.5e6, dep:52.8e6, facture:52.8e6, paye:44.4e6, resteFacturer:70.7e6, resteEncaisser:79.1e6, marge:18, margeInit:22, risque:"Modéré", blocage:"Météo ven 18/04", prochEch:"Coulage R+1 — 17/04", spoc:"Marie Atangana", amoa:"S. Kamga", moe:"Arc. Njoya", moex:"BTP Cameroun", dernierEchange:"16/04 14:22", actionClient:"Payer FAC-003 (8,4M)", tempClient:72, promesse:"Rapport hebdo chaque lundi", sujetSensible:"Hausse ciment +4%", region:"Littoral" },
  { id:"PRJ-002", nom:"Résidence Kotto", loc:"Douala, Kotto", client:"Moussa Ndiaye", clientTel:"+33 6 45 67 89", typo:"Construction neuve", phase:4, phLbl:"Sélection MOE", phTotal:10, statut:"En validation", av:8, budget:85e6, budgetVal:85e6, dep:2.1e6, facture:2.1e6, paye:2.1e6, resteFacturer:82.9e6, resteEncaisser:82.9e6, marge:22, margeInit:22, risque:"Faible", blocage:"Choix MOE en attente", prochEch:"Sélection MOE — 20/04", spoc:"Marie Atangana", amoa:"S. Kamga", moe:"—", moex:"—", dernierEchange:"11/04 16:40", actionClient:"Valider proposition MOE", tempClient:55, promesse:"3 propositions MOE avant 20/04", sujetSensible:"—", region:"Littoral" },
  { id:"PRJ-003", nom:"Rénov. Bastos", loc:"Yaoundé, Bastos", client:"Amina Tchouangou", clientTel:"+33 7 89 01 23", typo:"Rénovation", phase:1, phLbl:"Découverte", phTotal:6, statut:"Brouillon", av:0, budget:25e6, budgetVal:0, dep:0, facture:0, paye:0, resteFacturer:25e6, resteEncaisser:25e6, marge:0, margeInit:0, risque:"Faible", blocage:"Visite terrain à planifier", prochEch:"Visite site — 22/04", spoc:"Fabien Nkoulou", amoa:"—", moe:"—", moex:"—", dernierEchange:"14/04 08:00", actionClient:"Confirmer visite terrain", tempClient:65, promesse:"Devis sous 3 semaines", sujetSensible:"Budget serré", region:"Centre" },
  { id:"PRJ-004", nom:"Reprise Bali", loc:"Douala, Bali", client:"Patrick Essomba", clientTel:"+33 6 78 90 12", typo:"Reprise chantier", phase:3, phLbl:"Devis détaillé", phTotal:6, statut:"Actif", av:28, budget:45e6, budgetVal:48e6, dep:12e6, facture:12e6, paye:8e6, resteFacturer:36e6, resteEncaisser:40e6, marge:15, margeInit:20, risque:"Élevé", blocage:"Retard +8j diagnostic", prochEch:"Validation devis — URGENT", spoc:"Marie Atangana", amoa:"S. Kamga", moe:"—", moex:"Bati-Plus", dernierEchange:"12/04 10:00", actionClient:"Arbitrage devis reprise", tempClient:30, promesse:"Devis final avant 15/04", sujetSensible:"Retard non justifié + marge en baisse", region:"Littoral" },
  { id:"PRJ-005", nom:"Agencement Akwa", loc:"Douala, Akwa", client:"Cécile Ngono", clientTel:"+44 7911 12 34", typo:"Aménagement", phase:2, phLbl:"Conception", phTotal:5, statut:"Actif", av:35, budget:18e6, budgetVal:18e6, dep:4.5e6, facture:4.5e6, paye:4.5e6, resteFacturer:13.5e6, resteEncaisser:13.5e6, marge:25, margeInit:25, risque:"Faible", blocage:"—", prochEch:"Visuels 3D — 24/04", spoc:"Fabien Nkoulou", amoa:"—", moe:"Archi Design", moex:"—", dernierEchange:"15/04 11:00", actionClient:"Valider moodboard", tempClient:85, promesse:"Visuels 3D avant fin avril", sujetSensible:"—", region:"Littoral" },
  { id:"PRJ-006", nom:"Étude Kribi", loc:"Kribi, Océan", client:"Jean-Pierre Fouda", clientTel:"+33 6 12 34 56", typo:"Études / Expertise", phase:1, phLbl:"Pré-faisabilité", phTotal:3, statut:"Actif", av:60, budget:2.5e6, budgetVal:2.5e6, dep:0.8e6, facture:0.8e6, paye:0.8e6, resteFacturer:1.7e6, resteEncaisser:1.7e6, marge:30, margeInit:30, risque:"Faible", blocage:"—", prochEch:"Livraison rapport — 30/04", spoc:"Marie Atangana", amoa:"S. Kamga", moe:"—", moex:"—", dernierEchange:"10/04 09:00", actionClient:"—", tempClient:80, promesse:"Rapport livré avant 01/05", sujetSensible:"—", region:"Sud" },
];
const PROSP = [
  { id:"P-001", nom:"Franck Mbarga", tel:"+33 6 12 34 **", email:"f.mbarga@pm.me", source:"Site web", typo:"Construction neuve", budget:"65M", loc:"Douala", besoin:"Villa haut de gamme 5 pièces", maturite:"Tiède", urgence:"Moyenne", terrain:true, etudes:false, financement:false, score:55, prochAction:"Relancer — proposer visite", resp:"Marie Atangana", dernierContact:"15/04", statut:"En attente", segment:"À nourrir", jDepuisContact:2 },
  { id:"P-002", nom:"Sophie Ekane", tel:"+33 7 45 67 **", email:"s.ekane@gmail.com", source:"Recommandation", typo:"Rénovation", budget:"30M", loc:"Yaoundé", besoin:"Rénovation T4 Bastos", maturite:"Chaud", urgence:"Haute", terrain:false, etudes:false, financement:true, score:78, prochAction:"Envoyer proposition AMOA", resp:"Marie Atangana", dernierContact:"12/04", statut:"En revue", segment:"À convertir vite", jDepuisContact:5 },
  { id:"P-003", nom:"David Ngo", tel:"+49 170 12 **", email:"d.ngo@web.de", source:"Connect", typo:"Reprise chantier", budget:"40M", loc:"Kribi", besoin:"Reprise villa inachevée", maturite:"Chaud", urgence:"Haute", terrain:true, etudes:true, financement:true, score:82, prochAction:"Envoyer proposition diagnostic", resp:"Fabien Nkoulou", dernierContact:"10/04", statut:"En revue", segment:"À convertir vite", jDepuisContact:7 },
  { id:"P-004", nom:"Claire Ateba", tel:"+33 6 99 88 **", email:"c.ateba@free.fr", source:"Salon Paris", typo:"Construction neuve", budget:"90M", loc:"Yaoundé", besoin:"Villa R+1 — terrain non acquis", maturite:"Tiède", urgence:"Basse", terrain:false, etudes:false, financement:false, score:38, prochAction:"Orienter vers étude foncière", resp:"Fabien Nkoulou", dernierContact:"01/04", statut:"En attente", segment:"À requalifier", jDepuisContact:16 },
  { id:"P-005", nom:"Michel Eyinga", tel:"+1 514 33 **", email:"m.eyinga@yahoo.ca", source:"Salon Montréal", typo:"Immeuble R+3", budget:"250M", loc:"Yaoundé", besoin:"Immeuble R+3 locatif", maturite:"Très chaud", urgence:"Haute", terrain:false, etudes:false, financement:true, score:91, prochAction:"CONVERTIR — RDV cadrage", resp:"Marie Atangana", dernierContact:"08/04", statut:"Revue terminée", segment:"À convertir vite", jDepuisContact:9 },
];
const FACS = [
  { id:"FAC-001", pj:"PRJ-001", client:"J-P Fouda", objet:"Acompte GO", mt:14250000, s:"Payée", date:"15/02", ech:"28/02", type:"Acompte", jalon:"Démarrage GO", risque:"—", actionSpoc:"—", dernierEch:"15/02 virement" },
  { id:"FAC-002", pj:"PRJ-001", client:"J-P Fouda", objet:"Études géotech", mt:1750000, s:"Payée", date:"20/01", ech:"05/02", type:"Études", jalon:"Pré-faisabilité", risque:"—", actionSpoc:"—", dernierEch:"28/01 virement" },
  { id:"FAC-003", pj:"PRJ-001", client:"J-P Fouda", objet:"Matériaux Phase 2", mt:8400000, s:"En attente", date:"10/04", ech:"25/04", type:"Matériaux", jalon:"GO Élévation R+1", risque:"Élevé", actionSpoc:"Relancer client", dernierEch:"—" },
  { id:"FAC-004", pj:"PRJ-001", client:"J-P Fouda", objet:"MO Mars", mt:3200000, s:"Validée", date:"01/04", ech:"15/04", type:"MO", jalon:"GO courant", risque:"Moyen", actionSpoc:"Relancer paiement", dernierEch:"Rappel 14/04" },
  { id:"FAC-005", pj:"PRJ-001", client:"J-P Fouda", objet:"AMOA T1", mt:2800000, s:"Payée", date:"05/03", ech:"20/03", type:"AMOA", jalon:"Suivi global", risque:"—", actionSpoc:"—", dernierEch:"18/03 virement" },
  { id:"FAC-006", pj:"PRJ-004", client:"P. Essomba", objet:"Diagnostic reprise", mt:1800000, s:"Payée", date:"01/03", ech:"15/03", type:"Études", jalon:"Diagnostic", risque:"—", actionSpoc:"—", dernierEch:"12/03 virement" },
  { id:"FAC-007", pj:"PRJ-004", client:"P. Essomba", objet:"Travaux Phase 1", mt:8000000, s:"En attente", date:"12/04", ech:"30/04", type:"Travaux", jalon:"Reprise fondation", risque:"Élevé", actionSpoc:"Attente arbitrage devis", dernierEch:"—" },
  { id:"FAC-008", pj:"PRJ-002", client:"M. Ndiaye", objet:"Pré-faisabilité", mt:2100000, s:"Payée", date:"05/03", ech:"20/03", type:"Études", jalon:"Pré-faisabilité", risque:"—", actionSpoc:"—", dernierEch:"19/03 virement" },
  { id:"FAC-009", pj:"PRJ-005", client:"C. Ngono", objet:"Honoraires conception", mt:4500000, s:"Payée", date:"10/03", ech:"25/03", type:"Honoraires", jalon:"Conception", risque:"—", actionSpoc:"—", dernierEch:"22/03 virement" },
  { id:"FAC-010", pj:"PRJ-006", client:"J-P Fouda", objet:"Études pré-faisa", mt:800000, s:"Payée", date:"01/04", ech:"15/04", type:"Études", jalon:"Pré-faisabilité", risque:"—", actionSpoc:"—", dernierEch:"10/04 virement" },
];
const LOTS = [
  { code:"LOT I", nom:"Trav. Préparatoires", pReel:100, pPlan:100, budget:4.5e6, depense:4.5e6, risque:"—", critClient:false, critMarge:false },
  { code:"LOT II", nom:"Gros Œuvre", pReel:72, pPlan:78, budget:28.5e6, depense:22.3e6, risque:"Écart -6% / plan", critClient:true, critMarge:true },
  { code:"LOT III", nom:"Clos & Couvert", pReel:45, pPlan:50, budget:12e6, depense:5.2e6, risque:"—", critClient:false, critMarge:false },
  { code:"LOT IV", nom:"Second Œuvre", pReel:18, pPlan:20, budget:15.6e6, depense:3.1e6, risque:"Stock carreau", critClient:true, critMarge:false },
  { code:"LOT V", nom:"Menuiseries Alu/Bois", pReel:5, pPlan:5, budget:8.4e6, depense:0, risque:"—", critClient:false, critMarge:false },
  { code:"LOT VI", nom:"Plomberie / Sanit.", pReel:0, pPlan:0, budget:6.2e6, depense:0, risque:"—", critClient:false, critMarge:false },
  { code:"LOT VII", nom:"Électricité", pReel:0, pPlan:0, budget:5.8e6, depense:0, risque:"—", critClient:false, critMarge:false },
  { code:"LOT VIII", nom:"Peinture / Rev.", pReel:0, pPlan:0, budget:7.1e6, depense:0, risque:"—", critClient:false, critMarge:false },
  { code:"LOT IX", nom:"Ext. & VRD", pReel:0, pPlan:0, budget:3.9e6, depense:0, risque:"—", critClient:false, critMarge:false },
];
const TACHES = [
  { code:"T-001", nom:"Coffrage poteaux R+1", pj:"PRJ-001", lot:"LOT II", resp:"BTP Cameroun", etat:"En cours", av:60, dateLim:"18/04", impactDelai:"Critique", impactCash:"8.4M bloqués", impactClient:"Jalon promis au client", blocage:"—", relance:"—", prochainPas:"Fin coffrage zone A" },
  { code:"T-002", nom:"Coulage longrines", pj:"PRJ-001", lot:"LOT II", resp:"BTP Cameroun", etat:"Bloquée", av:10, dateLim:"22/04", impactDelai:"Élevé", impactCash:"—", impactClient:"Report possible", blocage:"Météo rouge 18/04", relance:"—", prochainPas:"Attente météo" },
  { code:"T-003", nom:"Diagnostic structure", pj:"PRJ-004", lot:"—", resp:"Bati-Plus", etat:"Retard", av:70, dateLim:"10/04", impactDelai:"Bloquant", impactCash:"Devis bloqué", impactClient:"Client frustré", blocage:"+8j non justifié", relance:"Escalade AMOA", prochainPas:"Exiger livraison 19/04" },
  { code:"T-004", nom:"Montage agglos SS", pj:"PRJ-001", lot:"LOT II", resp:"BTP Cameroun", etat:"À faire", av:0, dateLim:"28/04", impactDelai:"Moyen", impactCash:"—", impactClient:"—", blocage:"Livraison agglos", relance:"DA-004 validée", prochainPas:"Attente livraison" },
  { code:"T-005", nom:"Visuels 3D salon", pj:"PRJ-005", lot:"—", resp:"Archi Design", etat:"En cours", av:55, dateLim:"24/04", impactDelai:"Faible", impactCash:"—", impactClient:"Promesse client", blocage:"—", relance:"—", prochainPas:"Livraison moodboard" },
  { code:"T-006", nom:"Rapport pré-faisabilité", pj:"PRJ-006", lot:"—", resp:"S. Kamga", etat:"En cours", av:60, dateLim:"30/04", impactDelai:"Faible", impactCash:"—", impactClient:"—", blocage:"—", relance:"—", prochainPas:"Finalisation analyse" },
];
const ACHATS = [
  { id:"DA-001", art:"Ciment CPJ 50kg", qte:200, unite:"sacs", fourn:"CIMENCAM", mt:1040000, s:"Livrée", pj:"PRJ-001", tache:"T-001", lot:"LOT II", risque:"—", impactPlan:"—", actionSpoc:"—" },
  { id:"DA-002", art:"Fer HA 12mm", qte:150, unite:"barres", fourn:"SOCAFER", mt:720000, s:"En transit", pj:"PRJ-001", tache:"T-001", lot:"LOT II", risque:"Retard +2j", impactPlan:"Coffrage décalé", actionSpoc:"Suivre livraison" },
  { id:"DA-003", art:"Sable carrière", qte:30, unite:"m³", fourn:"SOCARRIG", mt:240000, s:"Commandée", pj:"PRJ-001", tache:"T-002", lot:"LOT II", risque:"—", impactPlan:"—", actionSpoc:"—" },
  { id:"DA-004", art:"Agglos de 15", qte:1000, unite:"pcs", fourn:"MIPROMALO", mt:350000, s:"Validée", pj:"PRJ-001", tache:"T-004", lot:"LOT II", risque:"Délai 5j", impactPlan:"Retard lot II", actionSpoc:"Confirmer date" },
  { id:"DA-005", art:"Carreau grès 60×60", qte:120, unite:"m²", fourn:"À sélectionner", mt:1500000, s:"En attente", pj:"PRJ-001", tache:"LOT IV", lot:"LOT IV", risque:"Hors budget +12%", impactPlan:"Démarrage Lot IV", actionSpoc:"Arbitrer budget" },
  { id:"DA-006", art:"Sable fin", qte:15, unite:"m³", fourn:"SOCARRIG", mt:120000, s:"Commandée", pj:"PRJ-004", tache:"T-003", lot:"—", risque:"—", impactPlan:"—", actionSpoc:"—" },
];
const STOCK = [
  { code:"MAT-CIM", nom:"Ciment CPJ 50kg", stock:245, seuil:100, pjImpact:"PRJ-001", lotImpact:"LOT II", delaiReappro:"2j", alerte:"ok", consequence:"—" },
  { code:"MAT-FER", nom:"Fer HA 12mm", stock:380, seuil:100, pjImpact:"PRJ-001", lotImpact:"LOT II", delaiReappro:"3j", alerte:"ok", consequence:"—" },
  { code:"MAT-AGG", nom:"Agglos de 15", stock:1820, seuil:500, pjImpact:"PRJ-001", lotImpact:"LOT II", delaiReappro:"5j", alerte:"ok", consequence:"—" },
  { code:"MAT-CAR", nom:"Carreau grès 60×60", stock:0, seuil:50, pjImpact:"PRJ-001", lotImpact:"LOT IV", delaiReappro:"10j", alerte:"rupture", consequence:"Retard Lot IV + surcoût probable" },
  { code:"MAT-ETA", nom:"Aquadère 25L", stock:12, seuil:5, pjImpact:"PRJ-001", lotImpact:"LOT III", delaiReappro:"4j", alerte:"ok", consequence:"—" },
  { code:"MAT-PLM", nom:"Tuyaux PVC 100mm", stock:45, seuil:40, pjImpact:"PRJ-001", lotImpact:"LOT VI", delaiReappro:"6j", alerte:"seuil", consequence:"Anticiper réappro" },
];
const RAPS = [
  { id:"RJ-04-16", date:"16/04", type:"Journalier", pj:"PRJ-001", auteur:"B. Ekambi (MOEX)", s:"Validé", resume:"Coffrage R+1 zone A — 18 ouvriers", lot:"LOT II", sensible:false, actionSpoc:"—", transmissible:true },
  { id:"RV-04-12", date:"12/04", type:"Visite AMOA", pj:"PRJ-001", auteur:"S. Kamga (AMOA)", s:"Validé", resume:"Fondation conforme — 2 reco mineures", lot:"—", sensible:false, actionSpoc:"Transmettre au client", transmissible:true },
  { id:"RJ-04-14", date:"14/04", type:"Journalier", pj:"PRJ-004", auteur:"T. Mbede (MOEX)", s:"En attente", resume:"Arrêt pluie — reprise 14h — eff. réduit", lot:"—", sensible:true, actionSpoc:"Valider", transmissible:false },
  { id:"RJ-04-13", date:"13/04", type:"Journalier", pj:"PRJ-001", auteur:"B. Ekambi (MOEX)", s:"Validé", resume:"Pluie 42mm — journée justifiée", lot:"LOT II", sensible:false, actionSpoc:"—", transmissible:true },
  { id:"RQ-04-10", date:"10/04", type:"Qualité AMOA", pj:"PRJ-001", auteur:"S. Kamga (AMOA)", s:"Validé", resume:"NC mineure — enrobage fer insuffisant zone B", lot:"LOT II", sensible:true, actionSpoc:"Reformuler pour client", transmissible:false },
];
const DOCS = [
  { nom:"Devis_V3_signée.pdf", cat:"Devis", pj:"PRJ-001", date:"10/04", auteur:"AMOA", version:"v3", statut:"Signé", actionSpoc:"—" },
  { nom:"Contrat_BTP.pdf", cat:"Contrats", pj:"PRJ-001", date:"15/01", auteur:"SPOC", version:"v1", statut:"Signé", actionSpoc:"—" },
  { nom:"Plans_RDC_v2.dwg", cat:"Plans", pj:"PRJ-001", date:"20/03", auteur:"MOE", version:"v2", statut:"Validé", actionSpoc:"—" },
  { nom:"Rapport_visite_12-04.pdf", cat:"Rapports", pj:"PRJ-001", date:"12/04", auteur:"AMOA", version:"v1", statut:"Validé", actionSpoc:"Envoyer au client" },
  { nom:"Diagnostic_Bali.pdf", cat:"Études", pj:"PRJ-004", date:"28/02", auteur:"AMOA", version:"v1", statut:"Validé", actionSpoc:"—" },
  { nom:"Planning_Phase2.xlsx", cat:"Planning", pj:"PRJ-001", date:"01/04", auteur:"AMOA", version:"v1", statut:"En vigueur", actionSpoc:"—" },
  { nom:"Photos_16-04.zip", cat:"Photos", pj:"PRJ-001", date:"16/04", auteur:"MOEX", version:"—", statut:"Nouveau", actionSpoc:"Archiver" },
  { nom:"Avenant_01.pdf", cat:"Contrats", pj:"PRJ-004", date:"05/04", auteur:"SPOC", version:"v1", statut:"À signer", actionSpoc:"Envoyer au client" },
  { nom:"AO_MOEX_Kotto.pdf", cat:"AO", pj:"PRJ-002", date:"08/04", auteur:"AMOA", version:"v1", statut:"En cours", actionSpoc:"—" },
];
const MSGS = [
  { from:"J-P Fouda", role:"Client", pj:"PRJ-001", msg:"Merci pour le rapport. Et la pluie vendredi ?", time:"16/04 14:22", unread:true, priorite:"haute", objet:"Avancement chantier", attenteReponse:false },
  { from:"P. Essomba", role:"Client", pj:"PRJ-004", msg:"Inquiet du retard. Quand le devis final ?", time:"12/04 10:00", unread:true, priorite:"critique", objet:"Retard diagnostic", attenteReponse:true },
  { from:"S. Kamga", role:"AMOA", pj:"PRJ-001", msg:"Écart +4% Lot II — hausse ciment confirmée par fournisseur", time:"15/04 09:00", unread:false, priorite:"haute", objet:"Écart budget ciment", attenteReponse:false },
  { from:"B. Ekambi", role:"MOEX", pj:"PRJ-001", msg:"Rapport 16/04 soumis — coffrage zone A terminé", time:"16/04 18:45", unread:false, priorite:"basse", objet:"Rapport journalier", attenteReponse:false },
  { from:"M. Ndiaye", role:"Client", pj:"PRJ-002", msg:"Quand les propositions MOE ? J'attends depuis 10 jours.", time:"11/04 16:40", unread:false, priorite:"haute", objet:"Sélection MOE", attenteReponse:true },
  { from:"C. Ngono", role:"Client", pj:"PRJ-005", msg:"Les moodboards sont superbes ! Validé.", time:"15/04 11:00", unread:false, priorite:"basse", objet:"Moodboard validé", attenteReponse:false },
  { from:"Arc. Njoya", role:"MOE", pj:"PRJ-001", msg:"Plans élévation R+1 finalisés — à valider AMOA", time:"14/04 16:00", unread:false, priorite:"moyenne", objet:"Plans techniques", attenteReponse:false },
];
const METEO = [
  { j:"Mer 16", ic:"☀️", tM:33, pl:0, al:"vert", impact:"—", pj:"PRJ-001" },
  { j:"Jeu 17", ic:"⛅", tM:31, pl:0, al:"vert", impact:"—", pj:"PRJ-001" },
  { j:"Ven 18", ic:"🌧️", tM:27, pl:35, al:"rouge", impact:"Coffrage + coulage suspendus", pj:"PRJ-001" },
  { j:"Sam 19", ic:"🌦️", tM:28, pl:12, al:"orange", impact:"Travaux ext. ralentis", pj:"PRJ-001" },
  { j:"Lun 21", ic:"☀️", tM:34, pl:0, al:"vert", impact:"Reprise normale", pj:"PRJ-001" },
];
const CAMS = [
  { id:"CAM-001", nom:"Entrée chantier", zone:"Accès principal", s:"En ligne", pj:"PRJ-001", lastEvt:"16/04 02:14 — Mouvement détecté", anomalie:false },
  { id:"CAM-002", nom:"Zone matériaux", zone:"Stock", s:"En ligne", pj:"PRJ-001", lastEvt:"15/04 23:47 — Personne détectée", anomalie:true },
  { id:"CAM-003", nom:"Front de travaux", zone:"Gros Œuvre", s:"En ligne", pj:"PRJ-001", lastEvt:"16/04 08:12 — Activité normale", anomalie:false },
  { id:"CAM-004", nom:"Panoramique 360°", zone:"Vue d'ensemble", s:"Hors ligne", pj:"PRJ-001", lastEvt:"14/04 — Flux coupé", anomalie:true },
];

/* ═══════════════ UI PRIMITIVES ═══════════════ */
const Badge = ({ children, v = "default", small }) => {
  const m = {
    default:{ bg:T.komaXL, c:T.komaD },
    success:{ bg:T.okBg, c:T.ok },
    warning:{ bg:T.warnBg, c:T.warn },
    danger:{ bg:T.errBg, c:T.err },
    info:{ bg:T.infoBg, c:T.info },
    purple:{ bg:T.purpL, c:T.purp },
    dark:{ bg:T.g100, c:T.g700 },
    active:{ bg:T.wcL, c:T.wcD },
    rose:{ bg:T.roseL, c:T.rose },
    ghost:{ bg:"transparent", c:T.g500 },
  };
  const s = m[v] || m.default;
  return <span style={{ display:"inline-flex", alignItems:"center", gap:3, padding:small?"1px 6px":"2px 8px", borderRadius:20, fontSize:small?8:9, fontWeight:600, background:s.bg, color:s.c, whiteSpace:"nowrap", lineHeight:1.6 }}>{children}</span>;
};
const SB = ({ s }) => {
  const m = { "En attente":"warning","En revue":"info","Revue terminée":"success","Actif":"success","En validation":"warning","Brouillon":"dark","En cours":"info","À faire":"dark","Validée":"success","Payée":"success","Validé":"success","Commandée":"active","Livrée":"success","En transit":"warning","Hors ligne":"danger","En ligne":"success","Retard":"danger","Nouveau":"info","Bloquée":"danger","À signer":"warning","En vigueur":"active","En cours":"info","Signé":"success" };
  return <Badge v={m[s]||"default"}>{s}</Badge>;
};
const TempGauge = ({ v, size=32 }) => {
  const c = v >= 70 ? T.ok : v >= 40 ? T.warn : T.err;
  const label = v >= 70 ? "Serein" : v >= 40 ? "Neutre" : "Tendu";
  return <div style={{ display:"flex", alignItems:"center", gap:4 }}>
    <div style={{ position:"relative", width:size, height:size }}>
      <svg width={size} height={size} viewBox="0 0 36 36">
        <circle cx="18" cy="18" r="15.5" fill="none" stroke={T.g200} strokeWidth="3" />
        <circle cx="18" cy="18" r="15.5" fill="none" stroke={c} strokeWidth="3"
          strokeDasharray={`${v * 0.97} 97`}
          strokeDashoffset="24" strokeLinecap="round"
          style={{ transition:"stroke-dasharray 0.6s ease" }} />
      </svg>
      <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:8, fontWeight:800, color:c }}>{v}</div>
    </div>
    <span style={{ fontSize:8, fontWeight:600, color:c }}>{label}</span>
  </div>;
};
const KPI = ({ icon:I, label, value, sub, trend, color=T.koma, accent }) => (
  <div style={{ background:T.w, borderRadius:10, padding:"14px 16px", border:`1px solid ${T.brd}`, flex:1, minWidth:140, position:"relative", overflow:"hidden" }}>
    {accent && <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:color }} />}
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
      <div style={{ width:28, height:28, borderRadius:7, background:color+"0F", display:"flex", alignItems:"center", justifyContent:"center" }}><I size={13} color={color} /></div>
      {trend !== undefined && <span style={{ fontSize:9, fontWeight:700, color:trend>=0?T.ok:T.err, display:"flex", alignItems:"center", gap:1 }}>{trend>=0?<TrendingUp size={9}/>:<TrendingDown size={9}/>}{Math.abs(trend)}%</span>}
    </div>
    <div style={{ fontSize:18, fontWeight:800, color:T.ink, letterSpacing:"-0.02em" }}>{value}</div>
    <div style={{ fontSize:9, color:T.g500, marginTop:2, fontWeight:500 }}>{label}</div>
    {sub && <div style={{ fontSize:8, color:T.g400, marginTop:1 }}>{sub}</div>}
  </div>
);
const Pr = ({ value, planned, h=5 }) => (
  <div style={{ position:"relative", width:"100%", background:T.g100, borderRadius:h, height:h, overflow:"hidden" }}>
    {planned && <div style={{ position:"absolute", width:Math.min(100,planned)+"%", height:"100%", background:T.g200 }} />}
    <div style={{ position:"relative", width:Math.min(100,value)+"%", height:"100%", borderRadius:h, background: value>=80?T.ok:value>=40?T.koma:T.warn, transition:"width 0.4s ease" }} />
  </div>
);
const Card = ({ children, style:es, onClick, accent }) => (
  <div onClick={onClick} style={{ background:T.w, borderRadius:12, padding:16, border:`1px solid ${T.brd}`, cursor:onClick?"pointer":"default", position:"relative", overflow:"hidden", ...es }}>
    {accent && <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:accent }} />}
    {children}
  </div>
);
const Btn = ({ children, v="primary", icon:I, onClick, small }) => {
  const p = v==="primary";
  return <button onClick={onClick} style={{ display:"inline-flex", alignItems:"center", gap:4, borderRadius:7, fontWeight:600, cursor:"pointer", fontSize:small?9:10, padding:small?"4px 8px":"6px 12px", background:p?T.koma:T.g50, color:p?"#fff":T.g700, border:p?"none":`1px solid ${T.brd}`, transition:"all 0.15s" }}>{I&&<I size={small?10:12}/>}{children}</button>;
};
const SectionTitle = ({ children, action, sub }) => (
  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
    <div><h3 style={{ fontSize:13, fontWeight:700, color:T.ink, margin:0 }}>{children}</h3>{sub&&<p style={{ fontSize:9, color:T.g500, margin:"1px 0 0" }}>{sub}</p>}</div>
    {action}
  </div>
);
const Tbl = ({ cols, data, compact }) => (
  <div style={{ overflowX:"auto", borderRadius:8, border:`1px solid ${T.brd}` }}>
    <table style={{ width:"100%", borderCollapse:"collapse", fontSize:compact?9:10 }}>
      <thead><tr style={{ background:T.g50 }}>{cols.map((c,i)=><th key={i} style={{ padding:compact?"5px 8px":"7px 10px", textAlign:"left", fontWeight:600, color:T.g500, fontSize:8, textTransform:"uppercase", letterSpacing:"0.04em", borderBottom:`1px solid ${T.brd}` }}>{c.label}</th>)}</tr></thead>
      <tbody>{data.map((r,ri)=><tr key={ri} style={{ borderBottom:`1px solid ${T.g100}` }}>{cols.map((c,ci)=><td key={ci} style={{ padding:compact?"5px 8px":"7px 10px", color:T.g700 }}>{c.render?c.render(r):r[c.key]}</td>)}</tr>)}</tbody>
    </table>
  </div>
);
const RiskIndicator = ({ level }) => {
  const m = { "Élevé":T.err, "Critique":T.err, "Bloquant":T.err, "Moyen":T.warn, "Modéré":T.warn, "Faible":T.ok, "—":T.g300 };
  return <div style={{ display:"flex", alignItems:"center", gap:3 }}>
    <div style={{ width:6, height:6, borderRadius:"50%", background:m[level]||T.g300 }} />
    <span style={{ fontSize:9, fontWeight:600, color:m[level]||T.g400 }}>{level}</span>
  </div>;
};
const AlertLine = ({ icon:I, text, color=T.err, action }) => (
  <div style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 8px", borderRadius:6, background:color+"08", borderLeft:`3px solid ${color}`, marginBottom:4 }}>
    <I size={12} color={color} style={{ flexShrink:0 }} />
    <span style={{ flex:1, fontSize:10, color:T.g700, lineHeight:1.4 }}>{text}</span>
    {action && <Btn v="secondary" small onClick={action.onClick}>{action.label}</Btn>}
  </div>
);

/* ═══════════════ NAV ITEMS ═══════════════ */
const NAV = [
  { k:"cockpit", l:"Cockpit Orchestration", i:Shield, accent:true },
  { k:"portfolio", l:"Portefeuille", i:Layers },
  { k:"prospects", l:"Prospects / CRM", i:Users },
  { k:"projet", l:"Vue Projet", i:Building2 },
  { k:"devis", l:"Devis & Planning", i:Calculator },
  { k:"taches", l:"Tâches Critiques", i:ClipboardList },
  { k:"achats", l:"Achats", i:ShoppingCart },
  { k:"stock", l:"Stock", i:Boxes },
  { k:"facturation", l:"Facturation", i:Receipt },
  { k:"rapports", l:"Rapports", i:FileCheck },
  { k:"ged", l:"GED", i:FolderOpen },
  { k:"msg", l:"Messagerie", i:MessageSquare },
  { k:"meteo", l:"Météo Chantier", i:CloudSun },
  { k:"video", l:"Vidéo", i:Video },
  { k:"kpi", l:"KPI & Analytics", i:BarChart3 },
  { k:"ia", l:"IA KOMA", i:Brain },
];

/* ═══════════════ SIDEBAR ═══════════════ */
const Sidebar = ({ nav, onNav }) => (
  <div style={{ width:220, minHeight:"100vh", background:T.sbBg, color:"#fff", display:"flex", flexDirection:"column", flexShrink:0 }}>
    <div style={{ padding:"18px 16px", display:"flex", alignItems:"center", gap:10, borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ width:32, height:32, borderRadius:8, background:`linear-gradient(135deg, ${T.koma}, ${T.komaD})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, fontWeight:800, color:"#fff", flexShrink:0 }}>K</div>
      <div><div style={{ fontSize:12, fontWeight:700, letterSpacing:"-0.01em" }}>KOMA Expertise</div><div style={{ fontSize:8, color:T.koma, textTransform:"uppercase", letterSpacing:1, fontWeight:600, marginTop:1 }}>Tour de contrôle SPOC</div></div>
    </div>
    <div style={{ flex:1, padding:"8px 6px", display:"flex", flexDirection:"column", gap:1, overflowY:"auto" }}>
      {NAV.map(it => {
        const isAct = nav===it.k;
        return <button key={it.k} onClick={()=>onNav(it.k)} style={{
          display:"flex", alignItems:"center", gap:8, padding:"8px 10px", borderRadius:6, border:"none", cursor:"pointer",
          background:isAct?T.sbActive:"transparent", color:isAct?T.sbTextActive:T.sbText,
          fontSize:10, fontWeight:isAct?600:400, textAlign:"left", width:"100%", transition:"all 0.15s",
          ...(it.accent && !isAct ? { marginBottom:6, borderBottom:"1px solid rgba(255,255,255,0.04)", paddingBottom:10 } : {})
        }}><it.i size={14} style={{ flexShrink:0 }}/><span style={{ whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{it.l}</span>
          {it.k==="cockpit" && !isAct && <div style={{ marginLeft:"auto", width:6, height:6, borderRadius:"50%", background:T.err }} />}
        </button>;
      })}
    </div>
    <div style={{ padding:"12px 14px", borderTop:"1px solid rgba(255,255,255,0.06)", display:"flex", alignItems:"center", gap:8 }}>
      <div style={{ width:28, height:28, borderRadius:8, background:T.koma+"20", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:700, color:T.koma }}>MA</div>
      <div><div style={{ fontSize:10, fontWeight:600 }}>Marie Atangana</div><div style={{ fontSize:8, color:"rgba(255,255,255,0.3)", marginTop:1 }}>SPOC · 4 projets actifs</div></div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════
   PAGE: COCKPIT ORCHESTRATION
═══════════════════════════════════════════════════ */
const PgCockpit = ({ onNav }) => {
  const totalRF = PJ.reduce((s,p)=>s+p.resteFacturer,0);
  const totalRE = PJ.reduce((s,p)=>s+p.resteEncaisser,0);
  const pjRisque = PJ.filter(p=>p.risque==="Élevé").length;
  return <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
    <div><h2 style={{ fontSize:20, fontWeight:800, color:T.ink, margin:0, letterSpacing:"-0.02em" }}>Cockpit Orchestration</h2><p style={{ fontSize:10, color:T.g500, margin:"3px 0 0" }}>Mercredi 16 avril 2026 · 6 projets · 5 clients · Portefeuille 295,5M FCFA</p></div>
    {/* KPIs */}
    <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
      <KPI icon={Layers} label="Projets actifs" value="4" sub="+2 en préparation" trend={20} accent />
      <KPI icon={Users} label="Prospects actifs" value="5" sub="1 à convertir" color={T.wc} accent />
      <KPI icon={Briefcase} label="Pipeline commercial" value="475M" sub="FCFA" color={T.info} accent />
      <KPI icon={Receipt} label="Reste à facturer" value={fM(totalRF)} color={T.warn} accent />
      <KPI icon={Wallet} label="Reste à encaisser" value={fM(totalRE)} color={T.err} accent />
      <KPI icon={AlertTriangle} label="Projets à risque" value={String(pjRisque)} sub="PRJ-004 critique" color={T.err} accent />
      <KPI icon={Target} label="Taux conversion" value="67%" color={T.purp} trend={5} accent />
    </div>
    {/* Row: Urgences + Décisions + Clients */}
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
      <Card accent={T.err}>
        <SectionTitle sub="Actions immédiates requises">🔴 Urgences du jour</SectionTitle>
        {[
          { m:"PRJ-004 — Retard +8j diagnostic non justifié · Devis bloqué · Client frustré", c:T.err, i:AlertTriangle, resp:"Marie A.", ech:"Aujourd'hui" },
          { m:"PRJ-001 — Météo rouge ven 18/04 · Coffrage + coulage suspendus", c:T.warn, i:CloudSun, resp:"BTP Cam.", ech:"18/04" },
          { m:"PRJ-001 — Stock carreau grès 60×60 = 0 · Lot IV bloqué", c:T.err, i:Boxes, resp:"Marie A.", ech:"Urgent" },
          { m:"FAC-003 — 8,4M en attente · Conditionne livraison matériaux", c:T.warn, i:DollarSign, resp:"Marie A.", ech:"25/04" },
        ].map((a,i)=><div key={i} style={{ display:"flex", gap:8, padding:"7px 8px", borderRadius:6, background:a.c+"06", borderLeft:`3px solid ${a.c}`, marginBottom:4 }}>
          <a.i size={12} color={a.c} style={{ flexShrink:0, marginTop:2 }} />
          <div style={{ flex:1 }}><div style={{ fontSize:9, color:T.g700, lineHeight:1.5 }}>{a.m}</div><div style={{ display:"flex", gap:6, marginTop:3 }}><span style={{ fontSize:7, color:T.g400 }}>→ {a.resp}</span><span style={{ fontSize:7, fontWeight:700, color:a.c }}>{a.ech}</span></div></div>
        </div>)}
      </Card>
      <Card accent={T.warn}>
        <SectionTitle sub="Arbitrages en attente">⚖️ Décisions à prendre</SectionTitle>
        {[
          { m:"Arbitrer devis reprise PRJ-004 avec P. Essomba", type:"Client / Devis", impact:"Marge -5% si inaction", prio:"P1" },
          { m:"Valider proposition MOE pour PRJ-002 (3 candidats)", type:"Coordination", impact:"Retard conception si >20/04", prio:"P1" },
          { m:"DA-005 carreau 60×60 hors budget +12%", type:"Achats / Budget", impact:"Dépassement 180K ou retard Lot IV", prio:"P2" },
          { m:"Avancer coulage à jeudi (météo ven)", type:"Planning", impact:"Risque qualité si précipité", prio:"P2" },
        ].map((d,i)=><div key={i} style={{ padding:"7px 8px", borderRadius:6, background:T.g50, marginBottom:4, borderLeft:`3px solid ${d.prio==="P1"?T.err:T.warn}` }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
            <span style={{ fontSize:9, fontWeight:600, color:T.ink, lineHeight:1.4, flex:1 }}>{d.m}</span>
            <Badge v={d.prio==="P1"?"danger":"warning"} small>{d.prio}</Badge>
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:3 }}>
            <Badge v="dark" small>{d.type}</Badge>
            <span style={{ fontSize:7, color:T.g400, fontStyle:"italic" }}>{d.impact}</span>
          </div>
        </div>)}
      </Card>
      <Card accent={T.info}>
        <SectionTitle sub="Relation client proactive">📞 Clients à rappeler</SectionTitle>
        {[
          { nom:"P. Essomba", pj:"PRJ-004", motif:"Retard +8j · arbitrage devis · client frustré", urgence:"critique", temp:30, promesse:"Devis final avant 15/04", dernier:"12/04" },
          { nom:"M. Ndiaye", pj:"PRJ-002", motif:"Attente propositions MOE depuis 10 jours", urgence:"haute", temp:55, promesse:"3 propositions MOE avant 20/04", dernier:"11/04" },
          { nom:"A. Tchouangou", pj:"PRJ-003", motif:"Confirmer visite terrain 22/04", urgence:"moyenne", temp:65, dernier:"14/04" },
          { nom:"M. Eyinga", pj:"Prospect", motif:"Conversion — RDV cadrage à planifier", urgence:"haute", temp:0, dernier:"08/04" },
        ].map((c,i)=><div key={i} style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 0", borderBottom:`1px solid ${T.g100}` }}>
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", alignItems:"center", gap:4 }}><span style={{ fontSize:10, fontWeight:700, color:T.ink }}>{c.nom}</span><Badge v="dark" small>{c.pj}</Badge></div>
            <div style={{ fontSize:8, color:T.g500, marginTop:2, lineHeight:1.4 }}>{c.motif}</div>
            {c.promesse && <div style={{ fontSize:7, color:T.err, marginTop:1 }}>Promesse: {c.promesse}</div>}
          </div>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:2 }}>
            <Badge v={c.urgence==="critique"?"danger":c.urgence==="haute"?"warning":"dark"} small>{c.urgence}</Badge>
            {c.temp>0 && <TempGauge v={c.temp} size={24} />}
            <span style={{ fontSize:7, color:T.g400 }}>{c.dernier}</span>
          </div>
        </div>)}
      </Card>
    </div>
    {/* Segmentation + Mini bar */}
    <Card>
      <SectionTitle sub="Répartition du portefeuille actif">Segmentation projets</SectionTitle>
      <div style={{ display:"flex", gap:6 }}>
        {[
          { l:"Découverte", c:1, col:T.g400 }, { l:"Études / Expertise", c:1, col:T.purp }, { l:"Conception / MOE", c:1, col:T.info },
          { l:"Devis", c:1, col:T.warn }, { l:"Construction", c:1, col:T.ok }, { l:"Aménagement", c:1, col:T.wc },
        ].map((s,i)=><div key={i} style={{ flex:1, textAlign:"center", padding:"10px 4px", borderRadius:8, background:s.col+"0A", borderBottom:`3px solid ${s.col}` }}>
          <div style={{ fontSize:20, fontWeight:800, color:s.col }}>{s.c}</div>
          <div style={{ fontSize:8, fontWeight:600, color:s.col, marginTop:2 }}>{s.l}</div>
        </div>)}
      </div>
    </Card>
    {/* Project cards */}
    <SectionTitle sub="Vue consolidée multi-projets">Tous les projets</SectionTitle>
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))", gap:10 }}>
      {PJ.map(p => <Card key={p.id} onClick={()=>onNav("projet")} style={{ cursor:"pointer", transition:"box-shadow 0.2s", border:`1px solid ${p.risque==="Élevé"?T.err+"30":T.brd}` }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:4 }}><span style={{ fontFamily:"monospace", fontSize:8, color:T.koma, fontWeight:600 }}>{p.id}</span><Badge v={p.risque==="Élevé"?"danger":p.risque==="Modéré"?"warning":"success"} small>{p.risque}</Badge></div>
            <div style={{ fontSize:13, fontWeight:700, color:T.ink, marginTop:2 }}>{p.nom}</div>
            <div style={{ fontSize:9, color:T.g500, marginTop:1 }}><MapPin size={9} style={{ display:"inline", verticalAlign:"-1px" }}/> {p.loc} · {p.client}</div>
          </div>
          <TempGauge v={p.tempClient} size={34} />
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:4, fontSize:8, color:T.g500, marginBottom:6 }}>
          <SB s={p.statut}/> <span>· Phase: <b style={{ color:T.ink }}>{p.phLbl}</b> ({p.phase}/{p.phTotal})</span> <span>· Marge: <b style={{ color:p.marge<p.margeInit?T.err:T.ok }}>{p.marge}%</b></span>
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}><span style={{ fontSize:9, color:T.g500 }}>Avancement</span><span style={{ fontSize:9, fontWeight:700, color:T.koma }}>{p.av}%</span></div>
        <Pr value={p.av} />
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:4, marginTop:8, fontSize:8 }}>
          {[
            { l:"Budget", v:fM(p.budget), c:T.g700 },
            { l:"Dépensé", v:fM(p.dep), c:T.g700 },
            { l:"À facturer", v:fM(p.resteFacturer), c:T.warn },
            { l:"À encaisser", v:fM(p.resteEncaisser), c:T.err },
          ].map((k,i)=><div key={i} style={{ padding:"3px 5px", borderRadius:4, background:T.g50, textAlign:"center" }}>
            <div style={{ color:T.g400, fontSize:7 }}>{k.l}</div>
            <div style={{ fontWeight:700, color:k.c }}>{k.v}</div>
          </div>)}
        </div>
        {p.blocage && p.blocage!=="—" && <div style={{ marginTop:6, padding:"4px 8px", borderRadius:5, background:T.errBg, fontSize:8, color:T.err, fontWeight:600, display:"flex", alignItems:"center", gap:3 }}><AlertTriangle size={9}/>{p.blocage}</div>}
        <div style={{ marginTop:6, display:"flex", justifyContent:"space-between", fontSize:8 }}>
          <span style={{ color:T.g400 }}>Proch. éch.: <b style={{ color:T.ink }}>{p.prochEch}</b></span>
        </div>
        {p.actionClient && p.actionClient!=="—" && <div style={{ marginTop:3, fontSize:8, color:T.warn, fontWeight:600 }}>Client: {p.actionClient}</div>}
      </Card>)}
    </div>
  </div>;
};

/* ═══════════════ PORTEFEUILLE ═══════════════ */
const PgPortfolio = () => {
  const totalBudget = PJ.reduce((s,p)=>s+p.budget,0);
  const totalDep = PJ.reduce((s,p)=>s+p.dep,0);
  return <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
    <h2 style={{ fontSize:20, fontWeight:800, color:T.ink, margin:0 }}>Portefeuille — Vue Consolidée</h2>
    <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
      <KPI icon={Briefcase} label="Budget total" value={fM(totalBudget)} sub="6 projets" color={T.koma} accent />
      <KPI icon={Activity} label="Dépensé total" value={fM(totalDep)} sub={((totalDep/totalBudget)*100).toFixed(0)+"% consommé"} color={T.info} accent />
      <KPI icon={TrendingUp} label="Marge moyenne" value="18%" color={T.ok} accent />
      <KPI icon={AlertTriangle} label="Marge en baisse" value="2" sub="PRJ-001, PRJ-004" color={T.err} accent />
    </div>
    <Card><SectionTitle>Comparaison projets — Matrice décisionnelle</SectionTitle>
      <Tbl compact cols={[
        { label:"Projet", render:r=><div><span style={{ fontWeight:700, color:T.ink, fontSize:10 }}>{r.nom}</span><div style={{ fontSize:8, color:T.g400 }}>{r.client}</div></div> },
        { label:"Phase", render:r=><Badge v="dark" small>{r.phLbl}</Badge> },
        { label:"Avanc.", render:r=><div style={{ display:"flex", alignItems:"center", gap:4 }}><div style={{ width:40 }}><Pr value={r.av}/></div><span style={{ fontSize:8, fontWeight:700 }}>{r.av}%</span></div> },
        { label:"Budget", render:r=><span style={{ fontWeight:600 }}>{fM(r.budget)}</span> },
        { label:"Marge", render:r=><span style={{ fontWeight:700, color:r.marge<r.margeInit?T.err:T.ok }}>{r.marge}%{r.marge<r.margeInit&&<TrendingDown size={8} style={{ display:"inline", verticalAlign:"-1px", marginLeft:2 }}/>}</span> },
        { label:"À encaisser", render:r=><span style={{ fontWeight:600, color:T.warn }}>{fM(r.resteEncaisser)}</span> },
        { label:"Risque", render:r=><RiskIndicator level={r.risque}/> },
        { label:"Client", render:r=><TempGauge v={r.tempClient} size={22}/> },
        { label:"Blocage", render:r=>r.blocage&&r.blocage!=="—"?<span style={{ fontSize:8, color:T.err }}>{r.blocage}</span>:<span style={{ color:T.g300 }}>—</span> },
      ]} data={PJ} />
    </Card>
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
      <Card><SectionTitle>Projets gourmands en temps SPOC</SectionTitle>
        {[
          { pj:"PRJ-004 · Reprise Bali", motif:"Retard, client frustré, arbitrage devis", score:92, c:T.err },
          { pj:"PRJ-001 · Villa Éden", motif:"Construction active, météo, stock, achats", score:75, c:T.warn },
          { pj:"PRJ-002 · Résidence Kotto", motif:"Sélection MOE en attente", score:40, c:T.info },
        ].map((p,i)=><div key={i} style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 0", borderBottom:`1px solid ${T.g100}` }}>
          <div style={{ width:28, height:28, borderRadius:6, background:p.c+"10", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:800, color:p.c }}>{p.score}</div>
          <div style={{ flex:1 }}><div style={{ fontSize:10, fontWeight:600, color:T.ink }}>{p.pj}</div><div style={{ fontSize:8, color:T.g500 }}>{p.motif}</div></div>
        </div>)}
      </Card>
      <Card><SectionTitle>Projets performants</SectionTitle>
        {[
          { pj:"PRJ-006 · Étude Kribi", motif:"Marge 30%, client serein, livraison dans les délais", c:T.ok },
          { pj:"PRJ-005 · Agencement Akwa", motif:"Marge 25%, client satisfait, conception fluide", c:T.ok },
        ].map((p,i)=><div key={i} style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 0", borderBottom:`1px solid ${T.g100}` }}>
          <CheckCircle2 size={14} color={p.c} />
          <div style={{ flex:1 }}><div style={{ fontSize:10, fontWeight:600, color:T.ink }}>{p.pj}</div><div style={{ fontSize:8, color:T.g500 }}>{p.motif}</div></div>
        </div>)}
      </Card>
    </div>
  </div>;
};

/* ═══════════════ PROSPECTS ═══════════════ */
const PgProspects = () => (
  <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
    <div style={{ display:"flex", justifyContent:"space-between" }}>
      <div><h2 style={{ fontSize:20, fontWeight:800, color:T.ink, margin:0 }}>Prospects & CRM</h2><p style={{ fontSize:10, color:T.g500 }}>Qualification · Conversion · Pipeline KOMA</p></div>
      <Btn icon={Plus}>Nouveau prospect</Btn>
    </div>
    <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
      <KPI icon={Users} label="Leads actifs" value="5" accent /><KPI icon={Flame} label="Chauds / Très chauds" value="3" color={T.err} accent /><KPI icon={Target} label="Conversion YTD" value="67%" color={T.ok} trend={5} accent /><KPI icon={Briefcase} label="Pipeline total" value="475M" sub="FCFA" color={T.info} accent /><KPI icon={Banknote} label="Besoin financement" value="3" color={T.purp} accent /><KPI icon={Clock} label="Délai moyen contact" value="8j" color={T.warn} accent />
    </div>
    <div style={{ display:"flex", gap:6, marginBottom:4 }}>
      {["À convertir vite","À nourrir","À requalifier"].map((seg,i)=>{
        const count = PROSP.filter(p=>p.segment===seg).length;
        const cols = [T.err,T.info,T.g400];
        return <div key={i} style={{ padding:"6px 12px", borderRadius:6, background:cols[i]+"0A", border:`1px solid ${cols[i]}20`, display:"flex", alignItems:"center", gap:4 }}>
          <div style={{ width:18, height:18, borderRadius:"50%", background:cols[i]+"15", display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:800, color:cols[i] }}>{count}</div>
          <span style={{ fontSize:9, fontWeight:600, color:cols[i] }}>{seg}</span>
        </div>;
      })}
    </div>
    <Tbl cols={[
      { label:"", render:r=><div style={{ width:24, height:24, borderRadius:"50%", background:r.score>80?T.ok+"15":r.score>60?T.warn+"15":T.g100, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:800, color:r.score>80?T.ok:r.score>60?T.warn:T.g500 }}>{r.score}</div> },
      { label:"Prospect", render:r=><div><div style={{ fontWeight:700, color:T.ink }}>{r.nom}</div><div style={{ fontSize:8, color:T.g400 }}>{r.email} · {r.source}</div></div> },
      { label:"Projet", render:r=><div><div style={{ fontWeight:600, fontSize:9 }}>{r.typo}</div><div style={{ fontSize:8, color:T.g400 }}>{r.loc} · {r.budget} FCFA</div></div> },
      { label:"Maturité", render:r=><Badge v={r.maturite==="Très chaud"?"danger":r.maturite==="Chaud"?"warning":"dark"}>{r.maturite}</Badge> },
      { label:"Segment", render:r=><Badge v={r.segment==="À convertir vite"?"danger":r.segment==="À nourrir"?"info":"dark"} small>{r.segment}</Badge> },
      { label:"Flags", render:r=><div style={{ display:"flex", gap:2, flexWrap:"wrap" }}>{r.terrain&&<Badge v="success" small>Terrain</Badge>}{r.financement&&<Badge v="purple" small>Financ.</Badge>}{r.etudes&&<Badge v="info" small>Études</Badge>}</div> },
      { label:"Contact", render:r=><div><div style={{ fontSize:9 }}>{r.dernierContact}</div><div style={{ fontSize:7, color:r.jDepuisContact>7?T.err:T.g400 }}>{r.jDepuisContact}j sans contact</div></div> },
      { label:"Action", render:r=><span style={{ fontSize:9, fontWeight:600, color:r.prochAction.includes("CONVERTIR")?T.err:T.ink }}>{r.prochAction}</span> },
      { label:"SPOC", render:r=><span style={{ fontSize:8, color:T.g500 }}>{r.resp}</span> },
    ]} data={PROSP} />
  </div>
);

/* ═══════════════ VUE PROJET ═══════════════ */
const PgProjet = () => {
  const p = PJ[0];
  return <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
      <div>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <h2 style={{ fontSize:20, fontWeight:800, color:T.ink, margin:0 }}>{p.nom}</h2><SB s={p.statut}/><Badge v={p.risque==="Élevé"?"danger":"warning"}>{p.risque}</Badge>
        </div>
        <div style={{ fontSize:10, color:T.g500, marginTop:3 }}><MapPin size={10} style={{ display:"inline", verticalAlign:"-1px" }}/> {p.loc} · {p.typo} · {p.client}</div>
      </div>
      <select style={{ padding:"4px 8px", borderRadius:6, border:`1px solid ${T.brd}`, fontSize:9, fontWeight:600, background:T.g50, color:T.ink }}>{PJ.map(pp=><option key={pp.id}>{pp.id} — {pp.nom}</option>)}</select>
    </div>
    {/* KPIs */}
    <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
      <KPI icon={Activity} label="Avancement" value={p.av+"%"} accent /><KPI icon={DollarSign} label="Budget validé" value={fM(p.budgetVal)} color={T.ok} accent /><KPI icon={Receipt} label="Dépensé" value={fM(p.dep)} color={T.info} accent /><KPI icon={Wallet} label="À encaisser" value={fM(p.resteEncaisser)} color={T.err} accent /><KPI icon={Target} label="Marge" value={p.marge+"%"} sub={p.marge<p.margeInit?`Init. ${p.margeInit}% ↓`:""} color={p.marge<p.margeInit?T.err:T.ok} accent />
    </div>
    {/* 3-col */}
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
      <Card><SectionTitle>Équipe projet</SectionTitle>
        {[{r:"SPOC",n:p.spoc,c:T.koma},{r:"AMOA",n:p.amoa,c:T.wc},{r:"MOE",n:p.moe,c:T.purp},{r:"MOEX",n:p.moex,c:T.warn},{r:"Client",n:p.client,c:T.info}].map((a,i)=><div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"5px 0", borderBottom:`1px solid ${T.g100}`, fontSize:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}><div style={{ width:22, height:22, borderRadius:6, background:a.c+"12", display:"flex", alignItems:"center", justifyContent:"center", fontSize:8, fontWeight:700, color:a.c }}>{a.r[0]}</div><span style={{ color:T.ink, fontWeight:500 }}>{a.n}</span></div>
          <Badge v="dark" small>{a.r}</Badge>
        </div>)}
      </Card>
      <Card accent={T.info}><SectionTitle>Relation client</SectionTitle>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}><TempGauge v={p.tempClient} size={40}/><div><div style={{ fontSize:10, fontWeight:700, color:T.ink }}>{p.client}</div><div style={{ fontSize:8, color:T.g500 }}>Dernier échange: {p.dernierEchange}</div></div></div>
        <div style={{ fontSize:9, color:T.g700, lineHeight:1.7 }}>
          <div><b>Action attendue:</b> <span style={{ color:T.err, fontWeight:600 }}>{p.actionClient}</span></div>
          <div><b>Promesse KOMA:</b> {p.promesse}</div>
          <div><b>Sujet sensible:</b> <span style={{ color:p.sujetSensible!=="—"?T.warn:T.g400 }}>{p.sujetSensible}</span></div>
          <div><b>Prochaine éch.:</b> {p.prochEch}</div>
        </div>
        {p.blocage && p.blocage!=="—" && <div style={{ marginTop:6, padding:"4px 8px", borderRadius:5, background:T.errBg, fontSize:8, color:T.err, fontWeight:600 }}>⚠ {p.blocage}</div>}
      </Card>
      <Card><SectionTitle>Activité récente</SectionTitle>
        {[{d:"16/04",m:"Rapport coffrage R+1 zone A validé",c:T.ok,i:FileCheck},{d:"15/04",m:"Livraison agrégats réceptionnée OK",c:T.koma,i:Truck},{d:"15/04",m:"Écart +4% Lot II signalé (ciment)",c:T.warn,i:AlertCircle},{d:"12/04",m:"Visite AMOA — fondation conforme",c:T.wc,i:Eye},{d:"10/04",m:"FAC-003 émise — 8,4M matériaux",c:T.warn,i:Receipt}].map((a,i)=><div key={i} style={{ display:"flex", alignItems:"center", gap:8, padding:"5px 0", borderBottom:`1px solid ${T.g100}` }}>
          <div style={{ width:22, height:22, borderRadius:5, background:a.c+"0F", display:"flex", alignItems:"center", justifyContent:"center" }}><a.i size={10} color={a.c}/></div>
          <span style={{ flex:1, fontSize:9, color:T.g700 }}>{a.m}</span>
          <span style={{ fontSize:8, color:T.g400 }}>{a.d}</span>
        </div>)}
      </Card>
    </div>
    {/* Lots */}
    <Card><SectionTitle sub="PRJ-001 · Villa Éden — 9 lots">Progression par Lot</SectionTitle>
      {LOTS.map((l,i)=><div key={i} style={{ display:"flex", alignItems:"center", gap:8, padding:"5px 0", borderBottom:`1px solid ${T.g100}` }}>
        <span style={{ fontSize:9, fontWeight:600, color:T.ink, minWidth:130 }}>{l.code} — {l.nom}</span>
        <div style={{ flex:1 }}><Pr value={l.pReel} planned={l.pPlan}/></div>
        <span style={{ fontSize:9, fontWeight:700, color:l.pReel<l.pPlan?T.warn:T.ok, minWidth:32, textAlign:"right" }}>{l.pReel}%</span>
        <span style={{ fontSize:8, color:T.g400, minWidth:30, textAlign:"right" }}>/{l.pPlan}%</span>
        <span style={{ fontSize:8, color:T.g500, minWidth:40, textAlign:"right" }}>{fM(l.depense)}/{fM(l.budget)}</span>
        {l.critClient && <Badge v="rose" small>Client</Badge>}
        {l.critMarge && <Badge v="warning" small>Marge</Badge>}
        {l.risque!=="—" && <span style={{ fontSize:7, color:T.err }}>{l.risque}</span>}
      </div>)}
    </Card>
    {/* Risques */}
    <Card accent={T.err}><SectionTitle>Risques & Blocages actifs</SectionTitle>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
        {[
          { type:"Planning", desc:"Météo rouge ven 18/04 — coffrage suspendu", impact:"Report coulage +1j", i:Calendar },
          { type:"Achats", desc:"Stock carreau 60×60 = 0 — DA-005 hors budget +12%", impact:"Retard Lot IV si non arbitré", i:ShoppingCart },
          { type:"Finance", desc:"FAC-003 (8,4M) en attente — conditionne matériaux", impact:"Blocage approvisionnement", i:DollarSign },
        ].map((r,i)=><div key={i} style={{ padding:10, borderRadius:6, background:T.errBg, border:`1px solid ${T.err}15` }}>
          <div style={{ display:"flex", alignItems:"center", gap:4, marginBottom:4 }}><r.i size={11} color={T.err}/><span style={{ fontSize:10, fontWeight:700, color:T.err }}>{r.type}</span></div>
          <div style={{ fontSize:9, color:T.g700, lineHeight:1.5 }}>{r.desc}</div>
          <div style={{ fontSize:8, color:T.g500, marginTop:3, fontStyle:"italic" }}>Impact: {r.impact}</div>
        </div>)}
      </div>
    </Card>
  </div>;
};

/* ═══════════════ DEVIS & PLANNING ═══════════════ */
const PgDevis = () => {
  const totalLots = LOTS.reduce((s,l)=>s+l.budget,0);
  return <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
    <h2 style={{ fontSize:20, fontWeight:800, color:T.ink, margin:0 }}>Devis & Planning — PRJ-001 Villa Éden</h2>
    <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
      <KPI icon={Receipt} label="Total HT" value={fM(totalLots)} color={T.koma} accent /><KPI icon={DollarSign} label="Budget validé" value="123,5M" color={T.ok} accent /><KPI icon={Target} label="Marge estimée" value="18%" sub="Init. 22% ↓" color={T.err} accent /><KPI icon={Calendar} label="Durée globale" value="14 mois" color={T.info} accent /><KPI icon={FileText} label="Version active" value="V3" sub="Signée 10/04" color={T.purp} accent />
    </div>
    <Card><SectionTitle sub="Budget · Avancement · Écarts · Risques">Décomposition par lot</SectionTitle>
      <Tbl compact cols={[
        { label:"Lot", render:r=><span style={{ fontWeight:700, fontSize:9 }}>{r.code}</span> },
        { label:"Désignation", render:r=><span style={{ fontWeight:500 }}>{r.nom}</span> },
        { label:"Budget", render:r=><span style={{ fontWeight:600 }}>{fM(r.budget)}</span> },
        { label:"Dépensé", render:r=><span>{fM(r.depense)}</span> },
        { label:"Poids", render:r=><span style={{ fontSize:8 }}>{((r.budget/totalLots)*100).toFixed(0)}%</span> },
        { label:"Avanc.", render:r=><div style={{ display:"flex", alignItems:"center", gap:3 }}><div style={{ width:36 }}><Pr value={r.pReel} planned={r.pPlan}/></div><span style={{ fontSize:8, fontWeight:700 }}>{r.pReel}%</span></div> },
        { label:"Écart plan", render:r=>{const d=r.pReel-r.pPlan; return <span style={{ fontSize:8, fontWeight:600, color:d<0?T.err:d>0?T.ok:T.g400 }}>{d>0?"+":""}{d}%</span>} },
        { label:"Risque", render:r=>r.risque!=="—"?<Badge v="danger" small>{r.risque}</Badge>:<span style={{ color:T.g300 }}>—</span> },
        { label:"Impact", render:r=><div style={{ display:"flex", gap:2 }}>{r.critClient&&<Badge v="rose" small>Client</Badge>}{r.critMarge&&<Badge v="warning" small>Marge</Badge>}</div> },
      ]} data={LOTS} />
    </Card>
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
      <Card><SectionTitle>Jalons planning</SectionTitle>
        {[
          { jalon:"Démarrage GO", date:"15/01", s:"Terminé" },
          { jalon:"Fondation terminée", date:"15/03", s:"Terminé" },
          { jalon:"Élévation R+1", date:"22/04", s:"En cours" },
          { jalon:"Clos couvert", date:"15/07", s:"À venir" },
          { jalon:"Réception provisoire", date:"30/11", s:"À venir" },
        ].map((j,i)=><div key={i} style={{ display:"flex", alignItems:"center", gap:8, padding:"5px 0", borderBottom:`1px solid ${T.g100}` }}>
          <div style={{ width:8, height:8, borderRadius:"50%", background:j.s==="Terminé"?T.ok:j.s==="En cours"?T.koma:T.g300 }} />
          <span style={{ flex:1, fontSize:10, fontWeight:500, color:T.ink }}>{j.jalon}</span>
          <span style={{ fontSize:9, color:T.g500 }}>{j.date}</span>
          <SB s={j.s} />
        </div>)}
      </Card>
      <Card><SectionTitle>Points d'arbitrage devis</SectionTitle>
        {[
          { point:"Carreau 60×60 : option A (budget) vs option B (+12%)", impact:"Finition client", prio:"P2" },
          { point:"Hausse ciment +4% — absorber ou avenant", impact:"Marge -2%", prio:"P2" },
          { point:"Option piscine — avenant 8,5M demandé par client", impact:"Extension scope", prio:"P3" },
        ].map((a,i)=><div key={i} style={{ padding:"6px 0", borderBottom:`1px solid ${T.g100}` }}>
          <div style={{ display:"flex", justifyContent:"space-between" }}><span style={{ fontSize:9, fontWeight:600, color:T.ink }}>{a.point}</span><Badge v={a.prio==="P2"?"warning":"dark"} small>{a.prio}</Badge></div>
          <div style={{ fontSize:8, color:T.g500, marginTop:2 }}>Impact: {a.impact}</div>
        </div>)}
      </Card>
    </div>
  </div>;
};

/* ═══════════════ TÂCHES ═══════════════ */
const PgTaches = () => (
  <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
    <h2 style={{ fontSize:20, fontWeight:800, color:T.ink, margin:0 }}>Tâches Critiques — Centre de Commandement</h2>
    <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
      <KPI icon={AlertTriangle} label="En retard" value={String(TACHES.filter(t=>t.etat==="Retard").length)} color={T.err} accent />
      <KPI icon={X} label="Bloquées" value={String(TACHES.filter(t=>t.etat==="Bloquée").length)} color={T.rose} accent />
      <KPI icon={Eye} label="Sous surveillance" value={String(TACHES.filter(t=>t.etat==="En cours").length)} color={T.warn} accent />
      <KPI icon={Clock} label="À faire" value={String(TACHES.filter(t=>t.etat==="À faire").length)} color={T.g500} accent />
    </div>
    <Tbl cols={[
      { label:"Réf.", render:r=><span style={{ fontFamily:"monospace", fontSize:8, color:T.koma, fontWeight:600 }}>{r.code}</span> },
      { label:"Tâche", render:r=><div><div style={{ fontWeight:600, color:T.ink }}>{r.nom}</div><div style={{ fontSize:8, color:T.g400 }}>{r.pj} {r.lot&&r.lot!=="—"?`· ${r.lot}`:""}</div></div> },
      { label:"Resp.", render:r=><span style={{ fontSize:9 }}>{r.resp}</span> },
      { label:"État", render:r=><SB s={r.etat}/> },
      { label:"Avanc.", render:r=><div style={{ display:"flex", alignItems:"center", gap:3 }}><div style={{ width:30 }}><Pr value={r.av}/></div><span style={{ fontSize:8, fontWeight:700 }}>{r.av}%</span></div> },
      { label:"Échéance", render:r=><span style={{ fontWeight:600, color:new Date("2026-04-"+r.dateLim.split("/")[0])<new Date()?T.err:T.g700, fontSize:9 }}>{r.dateLim}</span> },
      { label:"Impact délai", render:r=><RiskIndicator level={r.impactDelai}/> },
      { label:"Impact cash", render:r=>r.impactCash&&r.impactCash!=="—"?<span style={{ fontSize:8, color:T.warn, fontWeight:600 }}>{r.impactCash}</span>:<span style={{ color:T.g300 }}>—</span> },
      { label:"Impact client", render:r=>r.impactClient&&r.impactClient!=="—"?<span style={{ fontSize:8, color:T.err }}>{r.impactClient}</span>:<span style={{ color:T.g300 }}>—</span> },
      { label:"Blocage", render:r=>r.blocage&&r.blocage!=="—"?<Badge v="danger" small>{r.blocage}</Badge>:<span style={{ color:T.g300 }}>—</span> },
      { label:"Prochain pas", render:r=><span style={{ fontSize:8, fontWeight:500 }}>{r.prochainPas}</span> },
    ]} data={TACHES} />
  </div>
);

/* ═══════════════ ACHATS ═══════════════ */
const PgAchats = () => (
  <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
    <h2 style={{ fontSize:20, fontWeight:800, color:T.ink, margin:0 }}>Achats — Pilotage Approvisionnement</h2>
    <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
      <KPI icon={ShoppingCart} label="DA actives" value={String(ACHATS.length)} accent /><KPI icon={AlertTriangle} label="Bloquantes" value="2" sub="DA-002, DA-005" color={T.err} accent /><KPI icon={Truck} label="En transit" value="1" color={T.warn} accent /><KPI icon={DollarSign} label="Hors budget" value="1" sub="DA-005 +12%" color={T.rose} accent />
    </div>
    <Tbl cols={[
      { label:"DA", render:r=><span style={{ fontFamily:"monospace", fontSize:8, color:T.koma, fontWeight:600 }}>{r.id}</span> },
      { label:"Article", render:r=><div><div style={{ fontWeight:600 }}>{r.art}</div><div style={{ fontSize:8, color:T.g400 }}>{r.qte} {r.unite} · {r.fourn}</div></div> },
      { label:"Projet", render:r=><Badge v="dark" small>{r.pj}</Badge> },
      { label:"Lot", render:r=><span style={{ fontSize:8 }}>{r.lot}</span> },
      { label:"Montant", render:r=><span style={{ fontWeight:600 }}>{fM(r.mt)}</span> },
      { label:"Statut", render:r=><SB s={r.s}/> },
      { label:"Risque", render:r=>r.risque!=="—"?<Badge v="danger" small>{r.risque}</Badge>:<span style={{ color:T.g300 }}>—</span> },
      { label:"Impact planning", render:r=>r.impactPlan!=="—"?<span style={{ fontSize:8, color:T.warn }}>{r.impactPlan}</span>:<span style={{ color:T.g300 }}>—</span> },
      { label:"Action SPOC", render:r=>r.actionSpoc!=="—"?<span style={{ fontSize:8, fontWeight:600, color:T.err }}>{r.actionSpoc}</span>:<span style={{ color:T.g300 }}>—</span> },
    ]} data={ACHATS} />
    <Card accent={T.warn}><SectionTitle>Arbitrage achats en attente</SectionTitle>
      <AlertLine icon={DollarSign} text="DA-005 · Carreau grès 60×60 — 120 m² — Budget: 1,34M → Devis fournisseur: 1,50M (+12%). Options: accepter surcoût, chercher alternative, ou négocier volume. Impact: Lot IV bloqué tant que non décidé." color={T.warn} />
    </Card>
  </div>
);

/* ═══════════════ STOCK ═══════════════ */
const PgStock = () => (
  <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
    <h2 style={{ fontSize:20, fontWeight:800, color:T.ink, margin:0 }}>Stock — Vue Risques & Impacts</h2>
    <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
      <KPI icon={Boxes} label="Articles suivis" value={String(STOCK.length)} accent /><KPI icon={AlertTriangle} label="Rupture" value="1" sub="Carreau 60×60" color={T.err} accent /><KPI icon={AlertCircle} label="Seuil critique" value="1" sub="Tuyaux PVC" color={T.warn} accent /><KPI icon={Clock} label="Délai réappro max" value="10j" color={T.warn} accent />
    </div>
    <Tbl cols={[
      { label:"Code", render:r=><span style={{ fontFamily:"monospace", fontSize:8, color:T.koma }}>{r.code}</span> },
      { label:"Article", render:r=><span style={{ fontWeight:600 }}>{r.nom}</span> },
      { label:"Qté", render:r=><span style={{ fontWeight:700, color:r.stock===0?T.err:r.stock<=r.seuil*1.2?T.warn:T.ok }}>{r.stock}</span> },
      { label:"Seuil", render:r=><span style={{ color:T.g400 }}>{r.seuil}</span> },
      { label:"Projet", render:r=><Badge v="dark" small>{r.pjImpact}</Badge> },
      { label:"Lot impacté", render:r=><span style={{ fontSize:9 }}>{r.lotImpact}</span> },
      { label:"Délai", render:r=><span style={{ fontSize:9 }}>{r.delaiReappro}</span> },
      { label:"Alerte", render:r=>r.alerte==="rupture"?<Badge v="danger">Rupture</Badge>:r.alerte==="seuil"?<Badge v="warning">Seuil</Badge>:<Badge v="success">OK</Badge> },
      { label:"Conséquence", render:r=>r.consequence!=="—"?<span style={{ fontSize:8, color:T.err }}>{r.consequence}</span>:<span style={{ color:T.g300 }}>—</span> },
    ]} data={STOCK} />
  </div>
);

/* ═══════════════ FACTURATION ═══════════════ */
const PgFacturation = () => {
  const totalPaye = FACS.reduce((s,f)=>f.s==="Payée"?s+f.mt:s,0);
  const totalAttente = FACS.reduce((s,f)=>f.s==="En attente"||f.s==="Validée"?s+f.mt:s,0);
  const totalRF = PJ.reduce((s,p)=>s+p.resteFacturer,0);
  const totalRE = PJ.reduce((s,p)=>s+p.resteEncaisser,0);
  return <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
    <h2 style={{ fontSize:20, fontWeight:800, color:T.ink, margin:0 }}>Facturation — Cockpit Cash</h2>
    <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
      <KPI icon={Receipt} label="Factures émises" value={String(FACS.length)} accent /><KPI icon={CheckCircle2} label="Encaissé" value={fM(totalPaye)} color={T.ok} trend={12} accent /><KPI icon={Clock} label="En attente" value={fM(totalAttente)} color={T.warn} accent /><KPI icon={DollarSign} label="Reste à facturer" value={fM(totalRF)} color={T.rose} accent /><KPI icon={Wallet} label="Reste à encaisser" value={fM(totalRE)} color={T.err} accent /><KPI icon={Banknote} label="Cash-in avril" value="0" sub="Objectif: 12M" color={T.err} accent />
    </div>
    <Card accent={T.err}><SectionTitle>Relances prioritaires</SectionTitle>
      <AlertLine icon={DollarSign} text="FAC-003 · J-P Fouda · 8,4M · Matériaux Phase 2 · Éch. 25/04 · Conditionne livraison matériaux PRJ-001" color={T.err} />
      <AlertLine icon={DollarSign} text="FAC-007 · P. Essomba · 8,0M · Travaux Phase 1 · Éch. 30/04 · Attente arbitrage devis PRJ-004" color={T.warn} />
      <AlertLine icon={Clock} text="FAC-004 · J-P Fouda · 3,2M · MO Mars · Éch. dépassée 15/04 · Rappelé 14/04, pas de retour" color={T.warn} />
    </Card>
    <Tbl cols={[
      { label:"N°", render:r=><span style={{ fontFamily:"monospace", fontSize:8, color:T.koma, fontWeight:600 }}>{r.id}</span> },
      { label:"Projet", render:r=><Badge v="dark" small>{r.pj}</Badge> },
      { label:"Client", render:r=><span style={{ fontWeight:500 }}>{r.client}</span> },
      { label:"Objet", render:r=><span style={{ fontWeight:500 }}>{r.objet}</span> },
      { label:"Type", render:r=><Badge v="info" small>{r.type}</Badge> },
      { label:"Jalon", render:r=><span style={{ fontSize:8, color:T.g500 }}>{r.jalon}</span> },
      { label:"Montant", render:r=><span style={{ fontWeight:700 }}>{fM(r.mt)}</span> },
      { label:"Éch.", render:r=><span style={{ fontSize:9 }}>{r.ech}</span> },
      { label:"Statut", render:r=><SB s={r.s}/> },
      { label:"Risque", render:r=><RiskIndicator level={r.risque}/> },
      { label:"Action", render:r=>r.actionSpoc!=="—"?<span style={{ fontSize:8, fontWeight:600, color:T.err }}>{r.actionSpoc}</span>:<span style={{ color:T.g300 }}>—</span> },
    ]} data={FACS} />
  </div>;
};

/* ═══════════════ RAPPORTS ═══════════════ */
const PgRapports = () => (
  <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
    <h2 style={{ fontSize:20, fontWeight:800, color:T.ink, margin:0 }}>Rapports — Terrain → Pilotage → Client</h2>
    <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
      <KPI icon={FileCheck} label="Total rapports" value={String(RAPS.length)} accent /><KPI icon={Clock} label="À valider" value={String(RAPS.filter(r=>r.s==="En attente").length)} color={T.warn} accent /><KPI icon={Send} label="À transmettre" value={String(RAPS.filter(r=>r.actionSpoc==="Transmettre au client").length)} color={T.info} accent /><KPI icon={AlertTriangle} label="Sensibles" value={String(RAPS.filter(r=>r.sensible).length)} color={T.err} accent />
    </div>
    <Tbl cols={[
      { label:"Réf.", render:r=><span style={{ fontFamily:"monospace", fontSize:8 }}>{r.id}</span> },
      { label:"Date", key:"date" },
      { label:"Type", render:r=><Badge v={r.type.includes("Visite")?"active":r.type.includes("Qualité")?"purple":"default"}>{r.type}</Badge> },
      { label:"Projet", render:r=><Badge v="dark" small>{r.pj}</Badge> },
      { label:"Auteur", render:r=><span style={{ fontSize:9 }}>{r.auteur}</span> },
      { label:"Résumé", render:r=><span style={{ fontSize:9, maxWidth:200, display:"inline-block", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{r.resume}</span> },
      { label:"Lot", render:r=>r.lot!=="—"?<Badge v="dark" small>{r.lot}</Badge>:<span style={{ color:T.g300 }}>—</span> },
      { label:"Sensible", render:r=>r.sensible?<Badge v="danger" small>Oui</Badge>:<span style={{ color:T.g300 }}>—</span> },
      { label:"Transmissible", render:r=>r.transmissible?<Badge v="success" small>Oui</Badge>:<Badge v="warning" small>Non</Badge> },
      { label:"Action", render:r=>r.actionSpoc!=="—"?<Badge v={r.actionSpoc==="Valider"?"warning":"info"}>{r.actionSpoc}</Badge>:<span style={{ color:T.g300 }}>—</span> },
      { label:"Statut", render:r=><SB s={r.s}/> },
    ]} data={RAPS} />
  </div>
);

/* ═══════════════ GED ═══════════════ */
const PgGED = () => (
  <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
    <div style={{ display:"flex", justifyContent:"space-between" }}>
      <h2 style={{ fontSize:20, fontWeight:800, color:T.ink, margin:0 }}>GED — Centre Documentaire</h2>
      <Btn icon={Upload}>Téléverser</Btn>
    </div>
    <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
      {[
        { l:"Devis & Contrats", c:4, col:T.koma }, { l:"Plans techniques", c:3, col:T.purp },
        { l:"Rapports", c:5, col:T.wc }, { l:"Photos chantier", c:12, col:T.info },
        { l:"Docs client", c:3, col:T.warn }, { l:"À envoyer", c:2, col:T.err },
      ].map((f,i)=><div key={i} style={{ flex:"1 1 130px", padding:"10px 12px", borderRadius:8, background:f.col+"08", border:`1px solid ${f.col}15`, cursor:"pointer", display:"flex", alignItems:"center", gap:6 }}>
        <FolderOpen size={14} color={f.col}/><div><div style={{ fontSize:10, fontWeight:600, color:T.ink }}>{f.l}</div><div style={{ fontSize:8, color:f.col }}>{f.c} doc{f.c>1?"s":""}</div></div>
      </div>)}
    </div>
    <Tbl cols={[
      { label:"Document", render:r=><span style={{ fontWeight:600, fontSize:9 }}>{r.nom}</span> },
      { label:"Catégorie", render:r=><Badge v="dark" small>{r.cat}</Badge> },
      { label:"Projet", render:r=><Badge v="info" small>{r.pj}</Badge> },
      { label:"Version", render:r=><span style={{ fontSize:8 }}>{r.version}</span> },
      { label:"Date", key:"date" },
      { label:"Auteur", render:r=><span style={{ fontSize:9 }}>{r.auteur}</span> },
      { label:"Statut", render:r=><SB s={r.statut}/> },
      { label:"Action SPOC", render:r=>r.actionSpoc!=="—"?<Badge v="warning" small>{r.actionSpoc}</Badge>:<span style={{ color:T.g300 }}>—</span> },
      { label:"", render:()=><div style={{ display:"flex", gap:4 }}><Eye size={11} color={T.g400} style={{ cursor:"pointer" }}/><Download size={11} color={T.g400} style={{ cursor:"pointer" }}/></div> },
    ]} data={DOCS} />
  </div>
);

/* ═══════════════ MESSAGERIE ═══════════════ */
const PgMsg = () => {
  const [sel, setSel] = useState(0);
  const m = MSGS[sel];
  return <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
    <h2 style={{ fontSize:20, fontWeight:800, color:T.ink, margin:0 }}>Messagerie — Coordination Multi-Acteurs</h2>
    <div style={{ display:"flex", gap:6, marginBottom:4 }}>
      {["Tous","Client","AMOA","MOE","MOEX"].map((f,i)=>{
        const cnt = f==="Tous"?MSGS.length:MSGS.filter(m=>m.role===f).length;
        return <div key={i} style={{ padding:"4px 10px", borderRadius:20, background:i===0?T.koma+"12":T.g50, border:`1px solid ${i===0?T.koma+"30":T.brd}`, fontSize:9, fontWeight:600, color:i===0?T.komaD:T.g600, cursor:"pointer" }}>{f} ({cnt})</div>;
      })}
      <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:4 }}><Badge v="danger" small>{MSGS.filter(m=>m.attenteReponse).length} en attente</Badge><Badge v="warning" small>{MSGS.filter(m=>m.unread).length} non lus</Badge></div>
    </div>
    <div style={{ display:"grid", gridTemplateColumns:"280px 1fr", gap:0, border:`1px solid ${T.brd}`, borderRadius:10, overflow:"hidden", height:400 }}>
      <div style={{ borderRight:`1px solid ${T.brd}`, overflowY:"auto" }}>
        {MSGS.map((msg,i)=><div key={i} onClick={()=>setSel(i)} style={{ display:"flex", alignItems:"flex-start", gap:8, padding:"10px 12px", borderBottom:`1px solid ${T.g100}`, cursor:"pointer", background:sel===i?T.koma+"06":"transparent", borderLeft:sel===i?`3px solid ${T.koma}`:"3px solid transparent" }}>
          <div style={{ width:26, height:26, borderRadius:7, background:msg.role==="Client"?T.info+"12":msg.role==="AMOA"?T.wc+"12":T.purp+"12", display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:700, color:msg.role==="Client"?T.info:msg.role==="AMOA"?T.wcD:T.purp, flexShrink:0 }}>{msg.from[0]}</div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ display:"flex", justifyContent:"space-between" }}><span style={{ fontSize:10, fontWeight:600, color:T.ink }}>{msg.from}</span><span style={{ fontSize:7, color:T.g400 }}>{msg.time.split(" ")[0]}</span></div>
            <div style={{ display:"flex", gap:3, marginTop:1 }}><Badge v={msg.role==="Client"?"info":msg.role==="AMOA"?"active":"purple"} small>{msg.role}</Badge><Badge v="dark" small>{msg.pj}</Badge>{msg.attenteReponse&&<Badge v="danger" small>Attente</Badge>}</div>
            <div style={{ fontSize:8, color:T.info, fontWeight:500, marginTop:2 }}>{msg.objet}</div>
            <div style={{ fontSize:9, color:T.g500, marginTop:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{msg.msg}</div>
          </div>
          {msg.unread&&<div style={{ width:7, height:7, borderRadius:"50%", background:T.koma, flexShrink:0, marginTop:4 }}/>}
        </div>)}
      </div>
      <div style={{ display:"flex", flexDirection:"column", background:T.g50 }}>
        <div style={{ padding:"10px 16px", borderBottom:`1px solid ${T.brd}`, background:T.w }}>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}><span style={{ fontWeight:700, fontSize:13, color:T.ink }}>{m.from}</span><Badge v={m.role==="Client"?"info":"active"}>{m.role}</Badge><Badge v="dark">{m.pj}</Badge>{m.attenteReponse&&<Badge v="danger">Réponse attendue</Badge>}</div>
          <div style={{ fontSize:9, color:T.info, marginTop:2, fontWeight:500 }}>Objet: {m.objet}</div>
        </div>
        <div style={{ flex:1, padding:14, display:"flex", flexDirection:"column", justifyContent:"flex-end", gap:8 }}>
          <div style={{ alignSelf:"flex-start", background:T.w, padding:"8px 12px", borderRadius:"4px 10px 10px 10px", fontSize:10, color:T.ink, border:`1px solid ${T.brd}`, maxWidth:"75%", lineHeight:1.5 }}>{m.msg}</div>
          <div style={{ alignSelf:"flex-end", background:T.koma, padding:"8px 12px", borderRadius:"10px 4px 10px 10px", fontSize:10, color:"#fff", maxWidth:"75%", lineHeight:1.5 }}>Bien reçu. Je reviens vers vous d'ici demain avec les éléments à jour.</div>
        </div>
        <div style={{ padding:"8px 12px", borderTop:`1px solid ${T.brd}`, background:T.w, display:"flex", gap:6 }}>
          <input placeholder="Écrire un message..." style={{ flex:1, padding:"6px 10px", borderRadius:6, border:`1px solid ${T.brd}`, fontSize:10, outline:"none" }}/>
          <Btn icon={Paperclip} v="secondary" small/>
          <Btn icon={Send}>Envoyer</Btn>
        </div>
      </div>
    </div>
  </div>;
};

/* ═══════════════ MÉTÉO ═══════════════ */
const PgMeteo = () => {
  const alC = { vert:T.ok, orange:T.warn, rouge:T.err };
  return <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
    <h2 style={{ fontSize:20, fontWeight:800, color:T.ink, margin:0 }}>Météo — Impact Portefeuille & Projets</h2>
    <Card accent={T.err}><div style={{ display:"flex", alignItems:"center", gap:8 }}><AlertTriangle size={16} color={T.err}/><div><div style={{ fontSize:12, fontWeight:700, color:T.err }}>Alerte rouge — Vendredi 18/04 — Douala</div><div style={{ fontSize:10, color:T.g700, lineHeight:1.6 }}>35mm pluie prévus · Coffrage + coulage PRJ-001 suspendus · Coulage avancé à jeudi · Client Fouda prévenu · Replanification validée par AMOA</div></div></div></Card>
    <Card><SectionTitle sub="PRJ-001 · Douala — 5 jours">Prévisions</SectionTitle>
      <div style={{ display:"flex", gap:6 }}>{METEO.map((m,i)=><div key={i} style={{ flex:1, textAlign:"center", padding:"10px 6px", borderRadius:8, background:T.g50, border:`1px solid ${m.al==="rouge"?T.err+"25":T.brd}` }}>
        <div style={{ fontSize:9, fontWeight:600, color:T.g500 }}>{m.j}</div>
        <div style={{ fontSize:24, margin:"4px 0" }}>{m.ic}</div>
        <div style={{ fontSize:15, fontWeight:800, color:T.ink }}>{m.tM}°</div>
        {m.pl>0&&<div style={{ fontSize:9, fontWeight:700, color:T.err }}>{m.pl}mm</div>}
        <div style={{ marginTop:4, fontSize:8, fontWeight:700, padding:"2px 6px", borderRadius:8, display:"inline-block", background:(alC[m.al]||T.ok)+"12", color:alC[m.al]||T.ok }}>{m.al}</div>
        {m.impact!=="—"&&<div style={{ fontSize:7, color:T.g600, marginTop:3 }}>{m.impact}</div>}
      </div>)}</div>
    </Card>
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
      <Card><SectionTitle>Projets impactés</SectionTitle>
        <div style={{ padding:"6px 0", borderBottom:`1px solid ${T.g100}`, fontSize:10 }}><span style={{ fontWeight:600, color:T.ink }}>PRJ-001 · Villa Éden</span> — Coffrage suspendu ven, coulage avancé à jeu</div>
        <div style={{ padding:"6px 0", fontSize:10, color:T.g500 }}>Autres projets : pas d'impact météo cette semaine</div>
      </Card>
      <Card><SectionTitle>Actions prises</SectionTitle>
        {["Coulage avancé au jeudi 17/04","Client Fouda prévenu le 16/04","Planning mis à jour par AMOA","Bâche protection coffrage en place"].map((a,i)=><div key={i} style={{ display:"flex", alignItems:"center", gap:4, padding:"4px 0", borderBottom:`1px solid ${T.g100}` }}><CheckCircle2 size={10} color={T.ok}/><span style={{ fontSize:9, color:T.g700 }}>{a}</span></div>)}
      </Card>
    </div>
  </div>;
};

/* ═══════════════ VIDÉO ═══════════════ */
const PgVideo = () => (
  <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
    <h2 style={{ fontSize:20, fontWeight:800, color:T.ink, margin:0 }}>Vidéosurveillance — PRJ-001</h2>
    <div style={{ display:"flex", gap:8 }}>
      <KPI icon={Camera} label="Caméras actives" value="3/4" sub="1 hors ligne" color={T.warn} accent /><KPI icon={AlertTriangle} label="Anomalies 7j" value="2" sub="Mouvement nocturne + flux coupé" color={T.err} accent /><KPI icon={Shield} label="Sécurité chantier" value="Moyen" color={T.warn} accent />
    </div>
    <div style={{ display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap:10 }}>
      {CAMS.map(cam=>{
        const on = cam.s==="En ligne";
        return <Card key={cam.id} style={{ border:cam.anomalie?`1px solid ${T.err}20`:undefined }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}><div><span style={{ fontWeight:700, fontSize:11, color:T.ink }}>{cam.nom}</span><div style={{ fontSize:8, color:T.g500 }}>{cam.zone} · {cam.id}</div></div><div style={{ display:"flex", alignItems:"center", gap:4 }}><SB s={cam.s}/>{cam.anomalie&&<Badge v="danger" small>Anomalie</Badge>}</div></div>
          <div style={{ width:"100%", aspectRatio:"16/9", borderRadius:8, background:on?"linear-gradient(135deg,#0F172A,#1E293B)":"#0F172A", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
            {on?<><div style={{ position:"absolute", top:8, left:10, display:"flex", alignItems:"center", gap:4 }}><div style={{ width:6, height:6, borderRadius:"50%", background:T.err, animation:"pulse 1.5s infinite" }}/><span style={{ fontSize:8, color:"#fff", fontWeight:700 }}>LIVE</span></div><div style={{ position:"absolute", bottom:8, right:10, fontSize:7, color:"rgba(255,255,255,0.5)" }}>{cam.lastEvt}</div><Camera size={28} strokeWidth={1} color="rgba(255,255,255,0.08)"/></>:<div style={{ textAlign:"center" }}><X size={22} color={T.err}/><div style={{ fontSize:8, color:T.g400, marginTop:4 }}>Flux coupé depuis 14/04</div></div>}
          </div>
        </Card>;
      })}
    </div>
  </div>
);

/* ═══════════════ KPI & ANALYTICS ═══════════════ */
const PgKPI = () => (
  <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
    <h2 style={{ fontSize:20, fontWeight:800, color:T.ink, margin:0 }}>KPI & Analytics — Direction SPOC</h2>
    <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
      <KPI icon={Target} label="Conversion" value="67%" trend={5} accent /><KPI icon={DollarSign} label="Écart coût moyen" value="+2,3%" sub="Obj < 5%" color={T.ok} trend={-1} accent /><KPI icon={Clock} label="Cycle vente" value="42j" color={T.info} accent /><KPI icon={Activity} label="Avanc. moyen" value="29%" color={T.koma} accent /><KPI icon={Star} label="Valid. 1er passage" value="78%" color={T.purp} accent /><KPI icon={Banknote} label="Cash-in mensuel" value="47M" sub="FCFA" color={T.ok} trend={12} accent />
    </div>
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
      <Card><SectionTitle>Avancement par projet</SectionTitle>
        {PJ.map((p,i)=><div key={i} style={{ display:"flex", alignItems:"center", gap:8, padding:"4px 0", borderBottom:`1px solid ${T.g100}` }}>
          <span style={{ fontSize:9, fontWeight:600, color:T.ink, minWidth:110 }}>{p.nom}</span>
          <div style={{ flex:1 }}><Pr value={p.av}/></div>
          <span style={{ fontSize:9, fontWeight:700, minWidth:28, textAlign:"right" }}>{p.av}%</span>
        </div>)}
      </Card>
      <Card><SectionTitle>Performance partenaires</SectionTitle>
        {[
          { n:"BTP Cameroun (MOEX)", del:88, qual:90 },
          { n:"Bati-Plus (MOEX)", del:72, qual:85 },
          { n:"Arc. Njoya (MOE)", del:95, qual:94 },
          { n:"Archi Design (MOE)", del:92, qual:96 },
          { n:"S. Kamga (AMOA)", del:96, qual:97 },
        ].map((p,i)=><div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"4px 0", borderBottom:`1px solid ${T.g100}`, fontSize:9 }}>
          <span style={{ fontWeight:600, color:T.ink }}>{p.n}</span>
          <div style={{ display:"flex", gap:8 }}>
            <span style={{ color:p.del>=90?T.ok:p.del>=80?T.warn:T.err }}>Délai {p.del}%</span>
            <span style={{ color:p.qual>=90?T.ok:T.warn }}>Qualité {p.qual}%</span>
          </div>
        </div>)}
      </Card>
    </div>
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
      <Card><SectionTitle>Commercial</SectionTitle>
        {[{ l:"Prospects actifs", v:"5" },{ l:"Conversion YTD", v:"67%" },{ l:"Pipeline", v:"475M" },{ l:"Cycle vente moyen", v:"42j" }].map((k,i)=><div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"4px 0", borderBottom:`1px solid ${T.g100}`, fontSize:9 }}><span style={{ color:T.g500 }}>{k.l}</span><span style={{ fontWeight:700, color:T.ink }}>{k.v}</span></div>)}
      </Card>
      <Card><SectionTitle>Financier</SectionTitle>
        {[{ l:"Cash-in YTD", v:"47M" },{ l:"Reste à encaisser", v:"243M" },{ l:"Créances >30j", v:"0" },{ l:"Taux relance OK", v:"85%" }].map((k,i)=><div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"4px 0", borderBottom:`1px solid ${T.g100}`, fontSize:9 }}><span style={{ color:T.g500 }}>{k.l}</span><span style={{ fontWeight:700, color:T.ink }}>{k.v}</span></div>)}
      </Card>
      <Card><SectionTitle>Relation client</SectionTitle>
        {[{ l:"Satisfaction estimée", v:"74%" },{ l:"Clients sereins", v:"3/5" },{ l:"Clients tendus", v:"1/5" },{ l:"Promesses tenues", v:"80%" }].map((k,i)=><div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"4px 0", borderBottom:`1px solid ${T.g100}`, fontSize:9 }}><span style={{ color:T.g500 }}>{k.l}</span><span style={{ fontWeight:700, color:T.ink }}>{k.v}</span></div>)}
      </Card>
    </div>
  </div>
);

/* ═══════════════ IA KOMA ═══════════════ */
const PgIA = () => (
  <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
      <div style={{ width:32, height:32, borderRadius:8, background:`linear-gradient(135deg, ${T.koma}, ${T.purp})`, display:"flex", alignItems:"center", justifyContent:"center" }}><Brain size={16} color="#fff"/></div>
      <div><h2 style={{ fontSize:20, fontWeight:800, color:T.ink, margin:0 }}>IA KOMA — Intelligence SPOC</h2><p style={{ fontSize:10, color:T.g500 }}>Assistant exécutif · 16 avril 2026</p></div>
    </div>
    {/* Synthèse du jour */}
    <Card style={{ background:`linear-gradient(135deg, ${T.komaXL}, ${T.purpL}30)`, border:`1px solid ${T.koma}20` }}>
      <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:10 }}><Sparkles size={14} color={T.koma}/><span style={{ fontSize:13, fontWeight:700, color:T.ink }}>Synthèse IA du jour</span></div>
      <div style={{ fontSize:10, color:T.g700, lineHeight:1.9 }}>
        <b style={{ color:T.err }}>Priorité 1 — PRJ-004 Reprise Bali</b> : Retard +8j non justifié sur le diagnostic structure. Le client P. Essomba est frustré (temp. 30/100). Le devis est bloqué. Appel client recommandé immédiatement. Préparer un plan de rattrapage avec la MOEX Bati-Plus.
        <br/><br/>
        <b style={{ color:T.warn }}>Priorité 2 — Conversion M. Eyinga</b> : Score 91, immeuble R+3 locatif à 250M FCFA. Prospect prêt pour conversion. Planifier RDV cadrage + proposer AMOA WeCare. Potentiel commercial très élevé.
        <br/><br/>
        <b style={{ color:T.info }}>Finance</b> : 16,4M en attente (FAC-003 + FAC-007). FAC-003 conditionne les matériaux Phase 2 de PRJ-001. FAC-004 en retard de paiement depuis le 15/04.
        <br/><br/>
        <b>Opérationnel</b> : Météo rouge vendredi 18/04 — coulage PRJ-001 avancé à jeudi. Stock carreau 60×60 en rupture — DA-005 à arbitrer (hors budget +12%).
      </div>
    </Card>
    {/* Recommandations */}
    <Card><SectionTitle>Recommandations hiérarchisées</SectionTitle>
      {[
        { prio:"P1", action:"Appeler P. Essomba (PRJ-004) — retard +8j, client frustré, devis bloqué", type:"Relation client", impact:"Risque perte client" },
        { prio:"P1", action:"Convertir M. Eyinga — RDV cadrage + proposition AMOA WeCare", type:"Commercial", impact:"250M pipeline" },
        { prio:"P1", action:"Relancer FAC-003 J-P Fouda — 8,4M conditionne livraison matériaux", type:"Finance", impact:"Blocage approvisionnement" },
        { prio:"P2", action:"Arbitrer DA-005 carreau +12% — valider surcoût ou alternative", type:"Achats", impact:"Retard Lot IV" },
        { prio:"P2", action:"Proposer 3 MOE à M. Ndiaye (PRJ-002) — attente depuis 10 jours", type:"Coordination", impact:"Risque frustration client" },
        { prio:"P3", action:"Transmettre rapport visite AMOA 12/04 au client Fouda", type:"Reporting", impact:"Promesse client" },
        { prio:"P3", action:"Suivre livraison fer HA 12mm — DA-002 en transit", type:"Achats", impact:"Coffrage R+1" },
      ].map((r,i)=><div key={i} style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 0", borderBottom:`1px solid ${T.g100}` }}>
        <Badge v={r.prio==="P1"?"danger":r.prio==="P2"?"warning":"dark"}>{r.prio}</Badge>
        <span style={{ flex:1, fontSize:10, color:T.ink, lineHeight:1.4 }}>{r.action}</span>
        <Badge v="info" small>{r.type}</Badge>
        <span style={{ fontSize:7, color:T.g400, maxWidth:100, textAlign:"right" }}>{r.impact}</span>
      </div>)}
    </Card>
    {/* Modules IA */}
    <SectionTitle>Modules IA disponibles</SectionTitle>
    <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:8 }}>
      {[
        { t:"Préparation appel client", d:"Résumé client + historique + points ouverts + promesses + risques", i:Phone, ready:true },
        { t:"Détection dérive budget", d:"Alerte automatique si coût ou marge dépasse les seuils définis", i:AlertTriangle, ready:true },
        { t:"Synthèse avant réunion", d:"Briefing complet : avancement, blocages, points à valider", i:Briefcase, ready:true },
        { t:"Reporting client auto", d:"Génération CR client structuré à partir des rapports MOEX/AMOA", i:FileText, ready:true },
        { t:"Scoring prospects", d:"Score de conversion + recommandation d'action commerciale", i:Target, ready:true },
        { t:"Aide choix partenaire", d:"Ranking MOE/MOEX par performance, disponibilité, zone, spécialité", i:UserCheck, ready:false },
        { t:"Prévision encaissement", d:"Projection cash basée sur jalons, historique et comportement client", i:Banknote, ready:false },
        { t:"Proposition d'arbitrage", d:"Analyse coût/délai/qualité/client pour chaque décision en attente", i:Scale, ready:false },
        { t:"Synthèse hebdomadaire", d:"Résumé portefeuille + KPIs + alertes + actions de la semaine", i:Calendar, ready:true },
      ].map((c,i)=><Card key={i} style={{ borderColor:c.ready?T.koma+"20":T.brd }}>
        <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:6 }}>
          <div style={{ width:26, height:26, borderRadius:7, background:c.ready?T.koma+"10":T.g100, display:"flex", alignItems:"center", justifyContent:"center" }}><c.i size={12} color={c.ready?T.koma:T.g400}/></div>
          {!c.ready && <Badge v="dark" small>Bientôt</Badge>}
        </div>
        <div style={{ fontSize:10, fontWeight:700, color:T.ink }}>{c.t}</div>
        <div style={{ fontSize:9, color:T.g500, marginTop:3, lineHeight:1.5 }}>{c.d}</div>
      </Card>)}
    </div>
  </div>
);

/* ═══════════════ MAIN APP ═══════════════ */
export default function KomaSPOC() {
  const [nav, setNav] = useState("cockpit");
  const pages = {
    cockpit: <PgCockpit onNav={setNav}/>,
    portfolio: <PgPortfolio/>,
    prospects: <PgProspects/>,
    projet: <PgProjet/>,
    devis: <PgDevis/>,
    taches: <PgTaches/>,
    achats: <PgAchats/>,
    stock: <PgStock/>,
    facturation: <PgFacturation/>,
    rapports: <PgRapports/>,
    ged: <PgGED/>,
    msg: <PgMsg/>,
    meteo: <PgMeteo/>,
    video: <PgVideo/>,
    kpi: <PgKPI/>,
    ia: <PgIA/>,
  };
  return <div style={{ display:"flex", height:"100vh", width:"100%", fontFamily:"'DM Sans', 'Segoe UI', system-ui, sans-serif", background:T.bg, overflow:"hidden" }}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
      * { box-sizing:border-box; margin:0; }
      ::-webkit-scrollbar { width:5px; }
      ::-webkit-scrollbar-thumb { background:#CBD5E1; border-radius:3px; }
      ::-webkit-scrollbar-thumb:hover { background:#94A3B8; }
      button:hover { opacity:0.92; }
      @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
    `}</style>
    <Sidebar nav={nav} onNav={setNav}/>
    <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <div style={{ height:48, padding:"0 20px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:`1px solid ${T.brd}`, background:T.w }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ display:"flex", alignItems:"center", gap:4, background:T.g50, borderRadius:6, padding:"4px 10px", border:`1px solid ${T.brd}`, width:240 }}>
            <Search size={12} color={T.g400}/><input placeholder="Rechercher projet, client, tâche..." style={{ border:"none", background:"transparent", outline:"none", fontSize:10, color:T.g700, width:"100%" }}/>
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ fontSize:9, color:T.g500 }}>16 Avril 2026 · 14:22</div>
          <div style={{ position:"relative", cursor:"pointer" }}><Bell size={16} color={T.g500}/><div style={{ position:"absolute", top:-2, right:-2, width:7, height:7, borderRadius:"50%", background:T.err, border:"2px solid #fff" }}/></div>
        </div>
      </div>
      <div style={{ flex:1, overflow:"auto", padding:20 }}>{pages[nav]||<PgCockpit onNav={setNav}/>}</div>
    </div>
  </div>;
}
/**
 * Symptom categories with patterns for automatic categorization
 * Each category has:
 * - name: Display name of the category
 * - patterns: Array of substrings to match in symptom names for automatic categorization
 */
export const symptomCategories = {
  common: {
    name: "Common Symptoms",
    patterns: [
      "fever",
      "fatigue",
      "headache",
      "weakness",
      "chills",
      "sweating",
      "dehydration",
      "tired",
      "exhaustion",
      "malaise",
      "lethargy",
      "drowsiness",
      "insomnia",
      "temperature",
      "hot",
      "cold",
      "night_sweat",
      "frailty",
      "weight_loss",
      "weight_gain",
      "appetite",
      "dizziness",
      "vertigo",
      "light_headed",
      "faint",
      "blackout",
      "tremor",
      "shaking",
      "shiver",
      "flu",
      "sneeze",
      "sweat",
    ],
  },
  pain: {
    name: "Pain Related",
    patterns: [
      "pain",
      "ache",
      "sore",
      "tender",
      "discomfort",
      "burning",
      "cramping",
      "stiff",
      "spasm",
      "sharp",
      "dull",
      "throbbing",
      "shooting",
      "stabbing",
      "pressure",
      "heaviness",
      "bloating",
      "tight",
      "strain",
      "hurt",
      "migraine",
      "tension_headache",
      "back_pain",
      "stomach_pain",
      "abdominal_pain",
      "joint_pain",
      "muscle_pain",
      "chest_pain",
      "throat_pain",
      "ear_pain",
      "neck_pain",
      "shoulder_pain",
      "knee_pain",
      "inflammation",
      "burn",
    ],
  },
  digestive: {
    name: "Digestive",
    patterns: [
      "nausea",
      "vomit",
      "diarrhea",
      "constipation",
      "indigestion",
      "stomach",
      "bowel",
      "gastric",
      "flatulence",
      "gas",
      "belch",
      "burp",
      "heartburn",
      "acid",
      "reflux",
      "stomach_upset",
      "gastrointestinal",
      "bloated",
      "intestinal",
      "bowel_movement",
      "stool",
      "defecate",
      "blood_in_stool",
      "hemorrhoid",
      "dyspepsia",
      "digest",
      "stomach_cramp",
      "irritable_bowel",
      "ulcer",
      "abdomen",
      "colon",
      "appendix",
      "fecal",
      "bile",
      "gallbladder",
      "pancrea",
      "liver",
      "jaundice",
      "yellow_skin",
    ],
  },
  respiratory: {
    name: "Respiratory",
    patterns: [
      "cough",
      "breath",
      "chest",
      "wheeze",
      "sneezing",
      "congestion",
      "sinus",
      "lung",
      "phlegm",
      "mucus",
      "sputum",
      "throat",
      "shortness_of_breath",
      "dyspnea",
      "tightness_in_chest",
      "runny_nose",
      "stuffy_nose",
      "nasal",
      "bronchitis",
      "pneumonia",
      "asthma",
      "emphysema",
      "tuberculosis",
      "pleurisy",
      "apnea",
      "respiratory",
      "pulmonary",
      "airway",
      "trachea",
      "bronchi",
      "alveoli",
      "oxygen",
      "ventilat",
      "inhale",
      "exhale",
      "breathless",
      "suffocate",
    ],
  },
  skin: {
    name: "Skin & External",
    patterns: [
      "rash",
      "itch",
      "skin",
      "swelling",
      "lump",
      "blister",
      "sore",
      "lesion",
      "acne",
      "pimple",
      "boil",
      "mole",
      "wart",
      "cyst",
      "eczema",
      "dermatitis",
      "psoriasis",
      "hives",
      "bruise",
      "burn",
      "cut",
      "wound",
      "scab",
      "scar",
      "dry_skin",
      "flaky",
      "pale",
      "jaundice",
      "flushing",
      "discoloration",
      "redness",
      "pallor",
      "cyanosis",
      "yellow",
      "rosacea",
      "cellulitis",
      "abscess",
      "fungal",
      "pus",
      "scaly",
      "peeling",
      "dandruff",
      "sensitive_skin",
      "pigment",
      "melanoma",
      "freckle",
      "birthmark",
      "pore",
      "blush",
      "complexion",
    ],
  },
  neurological: {
    name: "Neurological",
    patterns: [
      "dizz",
      "confusion",
      "memory",
      "coordination",
      "balance",
      "numbness",
      "tingling",
      "seizure",
      "headache",
      "migraine",
      "nerve",
      "neuro",
      "brain",
      "spinal",
      "reflex",
      "consciousness",
      "cognition",
      "thought",
      "attention",
      "concentration",
      "focus",
      "paralysis",
      "weakness",
      "stroke",
      "numb",
      "paresthesia",
      "tremor",
      "spasm",
      "coma",
      "unconscious",
      "faint",
      "epilepsy",
      "convulsion",
      "dementia",
      "alzheimer",
      "parkinson",
      "multiple_sclerosis",
      "motor_function",
      "sensory",
      "speech",
      "slurred",
      "aphasia",
      "memory_loss",
      "forgetful",
      "disorientation",
    ],
  },
  eyes: {
    name: "Eye & Vision",
    patterns: [
      "eye",
      "vision",
      "sight",
      "blind",
      "blur",
      "double_vision",
      "diplopia",
      "conjunctivitis",
      "pink_eye",
      "cataract",
      "glaucoma",
      "retina",
      "iris",
      "pupil",
      "cornea",
      "sclera",
      "eyestrain",
      "eyelid",
      "tear",
      "dry_eye",
      "itchy_eye",
      "watery_eye",
      "red_eye",
      "floater",
      "sensitivity_to_light",
      "photophobia",
      "astigmatism",
      "presbyopia",
      "myopia",
      "hyperopia",
      "stye",
      "ocular",
      "optic",
      "lens",
      "vitreous",
      "macular",
      "sight",
    ],
  },
  ears: {
    name: "Ear & Hearing",
    patterns: [
      "ear",
      "hearing",
      "deaf",
      "tinnitus",
      "vertigo",
      "ear_pain",
      "earache",
      "ear_infection",
      "otitis",
      "eardrum",
      "eustachian",
      "acoustic",
      "auditory",
      "cochlea",
      "inner_ear",
      "middle_ear",
      "outer_ear",
      "ear_wax",
      "cerumen",
      "ear_pressure",
      "ear_popping",
      "ear_fullness",
      "ringing",
      "buzzing",
      "hiss",
      "hearing_loss",
      "ear_discharge",
      "ear_bleeding",
      "ear_drainage",
      "vestibular",
    ],
  },
  cardiovascular: {
    name: "Heart & Circulation",
    patterns: [
      "heart",
      "cardio",
      "pulse",
      "blood_pressure",
      "hypertension",
      "hypotension",
      "palpitation",
      "arrhythmia",
      "chest_pain",
      "angina",
      "heart_attack",
      "infarct",
      "circulation",
      "vascular",
      "vein",
      "artery",
      "aorta",
      "valve",
      "clot",
      "thrombosis",
      "embolism",
      "stroke",
      "tachycardia",
      "bradycardia",
      "murmur",
      "coronary",
      "atherosclerosis",
      "aneurysm",
      "varicose",
      "peripheral",
      "edema",
      "swell",
      "cholesterol",
      "lipid",
      "blood",
      "bleeding",
      "bruise",
      "anemia",
    ],
  },
  urinary: {
    name: "Urinary & Kidney",
    patterns: [
      "urinate",
      "urine",
      "bladder",
      "kidney",
      "renal",
      "urinary",
      "incontinence",
      "frequency",
      "urgency",
      "retention",
      "dysuria",
      "painful_urination",
      "blood_in_urine",
      "hematuria",
      "cloudy_urine",
      "foamy_urine",
      "urethral",
      "cystitis",
      "pyelonephritis",
      "kidney_stone",
      "urolithiasis",
      "nocturia",
      "polyuria",
      "oliguria",
      "anuria",
      "uti",
      "urinary_tract_infection",
      "dialysis",
      "urethra",
      "prostate",
      "flank_pain",
    ],
  },
  reproductive: {
    name: "Reproductive",
    patterns: [
      "menstruation",
      "period",
      "menstrual",
      "vagina",
      "vulva",
      "uterus",
      "ovary",
      "breast",
      "testicle",
      "penis",
      "prostate",
      "erectile",
      "libido",
      "sexual",
      "fertility",
      "pregnancy",
      "contraception",
      "miscarriage",
      "abortion",
      "childbirth",
      "labor",
      "postpartum",
      "gynecological",
      "obstetric",
      "genital",
      "std",
      "sti",
      "sexually_transmitted",
      "impotence",
      "testicle",
      "scrotum",
      "pms",
      "hormonal",
      "estrogen",
      "testosterone",
      "penile",
      "vaginal",
      "cervix",
      "cervical",
      "fallopian",
      "semen",
      "sperm",
    ],
  },
  mental: {
    name: "Mental Health",
    patterns: [
      "anxiety",
      "depression",
      "stress",
      "mood",
      "psychiatric",
      "mental",
      "psychological",
      "emotional",
      "bipolar",
      "schizophrenia",
      "psychosis",
      "delusion",
      "hallucination",
      "paranoia",
      "phobia",
      "obsessive",
      "compulsive",
      "ocd",
      "panic_attack",
      "trauma",
      "ptsd",
      "adhd",
      "attention_deficit",
      "autism",
      "asperger",
      "eating_disorder",
      "anorexia",
      "bulimia",
      "suicide",
      "self_harm",
      "insomnia",
      "sleep",
      "nightmare",
      "sleep_apnea",
      "narcolepsy",
      "somnambulism",
      "sleepwalking",
      "addiction",
      "substance_abuse",
    ],
  },
  immune: {
    name: "Immune & Inflammatory",
    patterns: [
      "allergy",
      "allergic",
      "autoimmune",
      "immune",
      "inflammation",
      "inflammatory",
      "lymph",
      "lymphatic",
      "lupus",
      "rheumatoid",
      "arthritis",
      "sjogren",
      "scleroderma",
      "vasculitis",
      "anaphylaxis",
      "histamine",
      "immunodeficiency",
      "hiv",
      "aids",
      "vaccine",
      "immunization",
      "immunocompromised",
      "hypersensitivity",
      "asthma",
      "eczema",
      "contact_dermatitis",
      "hay_fever",
      "rhinitis",
      "food_allergy",
      "celiac",
      "gluten",
      "lactose",
      "intolerance",
      "gland",
      "thyroid",
      "goiter",
      "hashimoto",
      "graves",
      "addison",
      "cushing",
      "diabetes",
      "insulin",
    ],
  },
  other: {
    name: "Other Symptoms",
    patterns: [],
  },
};

/**
 * Category icons for display
 */
export const categoryIcons = {
  common: "🤒",
  pain: "🔥",
  digestive: "🤢",
  respiratory: "😮‍💨",
  skin: "🧴",
  neurological: "🧠",
  other: "❓",
};

/**
 * Category colors for styling
 */
export const categoryColors = {
  common: "bg-blue-100 text-blue-800",
  pain: "bg-red-100 text-red-800",
  digestive: "bg-green-100 text-green-800",
  respiratory: "bg-yellow-100 text-yellow-800",
  skin: "bg-pink-100 text-pink-800",
  neurological: "bg-purple-100 text-purple-800",
  other: "bg-gray-100 text-gray-800",
};

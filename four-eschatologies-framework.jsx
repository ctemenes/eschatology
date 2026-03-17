import { useState, useEffect, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════════════════════
// DATA MODEL
// ═══════════════════════════════════════════════════════════════════════════════

const COLORS = {
  bg: "#0a0a0c",
  surface: "#111114",
  surfaceHover: "#18181c",
  border: "#1e1e22",
  borderActive: "#333",
  text: "#e0dcd2",
  textMuted: "#888",
  textDim: "#555",
  gold: "#c9a84c",
  crimson: "#b84c4c",
  emerald: "#3b8a6e",
  cobalt: "#4c6eb8",
  amber: "#d4a017",
  purple: "#7c3aed",
};

const FONTS = {
  prose: "'Cormorant Garamond', Georgia, serif",
  system: "'IBM Plex Mono', monospace",
};

const DOMAIN_COLORS = {
  military: "#b84c4c",
  economic: "#c9a84c",
  religious: "#7c3aed",
  political: "#4c6eb8",
  technological: "#3b8a6e",
};

const STATUS_COLORS = {
  active: "#3b8a6e",
  partial: "#c9a84c",
  "early-signs": "#d4a017",
  dormant: "#555",
};

const STATUS_LABELS = {
  active: "Active",
  partial: "Partial",
  "early-signs": "Early Signs",
  dormant: "Dormant",
};

// ─── Traditions ──────────────────────────────────────────────────────────────

const TRADITIONS = [
  {
    id: "jewish",
    label: "Jewish",
    color: COLORS.gold,
    glyph: "\u2721",
    core: "Messianic Fulfilment",
    keyDoctrine:
      "The messianic age requires territorial restoration, the Third Temple, and global governance from Jerusalem.",
    beliefs: [
      {
        title: "Greater Israel",
        desc: "The land God promised Abraham \u2014 from the Nile to the Euphrates. Territorial expansion to reclaim the biblical boundaries of Eretz Yisrael, absorbing parts of the GCC, Turkey, and Egypt.",
      },
      {
        title: "Third Temple",
        desc: "Rebuilding of the Temple in Jerusalem on the Temple Mount. Requires removal of Al-Aqsa Mosque. The Temple is the seat of messianic governance and the headquarters of the coming world order.",
      },
      {
        title: "Pax Judaica",
        desc: "A messianic age of universal peace governed from Jerusalem. In the analytical framing: a one-world government underpinned by AI surveillance, digital ID, digital currency, and centralised control \u2014 the 'mark of the beast' in Christian terms.",
      },
      {
        title: "Ingathering of Exiles",
        desc: "All Jews return to Israel. Capital, technology, and talent flow to Jerusalem as the global centre of power. Companies like Nvidia, Oracle, Microsoft, and Google eventually transfer operations to Israel.",
      },
    ],
    geoPredictions: [
      "Israel expands territory (absorbing GCC, parts of Turkey/Egypt)",
      "Al-Aqsa destroyed to make way for Third Temple",
      "Tech giants relocate to Israel as global power centre",
      "Jerusalem becomes the seat of one-world governance",
      "Rise of anti-Semitism forces diaspora return",
    ],
  },
  {
    id: "christian",
    label: "Christian Zionist",
    color: COLORS.crimson,
    glyph: "\u271D",
    core: "Tribulation & Second Coming",
    keyDoctrine:
      "The current wars are the Great Tribulation. The Antichrist system is being built. Christ returns after Armageddon.",
    beliefs: [
      {
        title: "The Antichrist System",
        desc: "A one-world government that appears as peace but is tyrannical. Mapped directly onto Pax Judaica \u2014 same structure, different interpretation of who benefits. What Judaism calls messianic peace, Christianity calls the Antichrist.",
      },
      {
        title: "Mark of the Beast",
        desc: "A system of total control where you cannot buy or sell without compliance. Connected to AI surveillance, digital ID, biometric tracking, and centralised financial systems being built now.",
      },
      {
        title: "The Great Tribulation",
        desc: "A period of unprecedented suffering, war, and persecution before Christ returns. The current multi-front wars, civil conflicts, and economic collapse are read as this unfolding in real time.",
      },
      {
        title: "Armageddon",
        desc: "A final battle in the Middle East. Nations gather against Israel. The culmination of the Iran/Russia vs Israel confrontation. US troops have been told this war is 'for Armageddon, the return of Jesus.'",
      },
    ],
    geoPredictions: [
      "AI surveillance state established (same as Pax Judaica, different moral lens)",
      "Global war escalation \u2014 US civil conflict, Middle East ground war",
      "Mark of the Beast via digital control systems",
      "Final confrontation between world powers in the Middle East",
    ],
  },
  {
    id: "islamic",
    label: "Islamic",
    color: COLORS.emerald,
    glyph: "\u262A",
    core: "End of Days & Justice",
    keyDoctrine:
      "The destruction of Al-Aqsa triggers the final era. A great war draws all nations. Justice is ultimately restored to Jerusalem.",
    beliefs: [
      {
        title: "Destruction of Al-Aqsa",
        desc: "A major sign of the end times. The third holiest site in Islam being destroyed triggers a unified Muslim response and marks the beginning of the final era. Two billion Muslims become religiously obligated to respond.",
      },
      {
        title: "Rise of Persia / Shia Mobilisation",
        desc: "Iran's victory reactivates Persian civilisational identity. The Shia world unites. In some traditions, a righteous force emerges from the East (Khorasan). Iran controls the Strait of Hormuz, extracts tribute, and industrialises.",
      },
      {
        title: "Great War (Al-Malhama)",
        desc: "A cataclysmic war involving all nations. The current multi-front conflict \u2014 Iran, GCC, Turkey, Saudi Arabia, Russia-Ukraine \u2014 is framed as the beginning of this prophesied war.",
      },
      {
        title: "Liberation of Jerusalem",
        desc: "Jerusalem is ultimately liberated from oppression. The end-times narrative culminates in justice being restored to the Holy Land after the great tribulation.",
      },
    ],
    geoPredictions: [
      "Al-Aqsa destroyed \u2014 triggers unified Islamic response",
      "Iran wins the war, becomes regional superpower",
      "GCC collapses, Strait of Hormuz controlled by Iran",
      "Multi-front war draws in Turkey and Saudi Arabia",
    ],
  },
  {
    id: "orthodox",
    label: "Russian Orthodox",
    color: COLORS.cobalt,
    glyph: "\u2626",
    core: "Third Rome Prophecy",
    keyDoctrine:
      "Moscow inherits the mantle of Christian civilisation. The West must fall. Constantinople must return. Russia fulfils divine purpose.",
    beliefs: [
      {
        title: "Moscow as Third Rome",
        desc: "'Two Romes have fallen, a third stands, a fourth there shall not be.' After Rome fell and Constantinople fell, Moscow inherits the mantle of Christian civilisation and becomes the guardian of Orthodox faith.",
      },
      {
        title: "Destruction of the West",
        desc: "Europe and NATO represent the degenerate West that must be dismantled for Orthodox civilisation to fulfil its destiny. The Ukraine war is not merely territorial \u2014 it serves this eschatological purpose.",
      },
      {
        title: "Return of Constantinople",
        desc: "Istanbul (Constantinople) returned to Christendom. Russia backs Greece against Turkey. Only possible once NATO is destroyed and Turkey is weakened by its entry into the Iran war.",
      },
      {
        title: "Gog & Magog Coalition",
        desc: "Russia and Persia march together against Israel in the final battle. Shared with Jewish and Christian traditions but from the Orthodox lens, Russia is fulfilling divine purpose as the leader of the coalition.",
      },
    ],
    geoPredictions: [
      "Russia wins in Ukraine, NATO collapses",
      "Europe economically and militarily destroyed",
      "Greece retakes Constantinople with Russian backing",
      "Russia + Iran form the prophesied Gog coalition",
    ],
  },
];

// ─── Convergence Points ─────────────────────────────────────────────────────

const CONVERGENCE_POINTS = [
  {
    id: "C1",
    title: "Destruction of Al-Aqsa / Third Temple",
    traditions: ["jewish", "christian", "islamic"],
    desc: "Judaism requires it for the Third Temple. Christianity sees it as a tribulation sign and precondition for the Antichrist system. Islam sees it as an end-times trigger that obligates two billion Muslims to respond. All three agree it happens \u2014 they disagree on what it means.",
    strength: 3,
  },
  {
    id: "C2",
    title: "One-World Government from Jerusalem",
    traditions: ["jewish", "christian"],
    desc: "Jewish tradition: messianic peace (Pax Judaica). Christian tradition: the Antichrist system. Same structure \u2014 AI surveillance, digital ID, centralised control \u2014 opposite moral valence. Both agree it will be built.",
    strength: 2,
  },
  {
    id: "C3",
    title: "Persia + Russia vs Israel (Gog & Magog)",
    traditions: ["jewish", "christian", "islamic", "orthodox"],
    desc: "All four traditions anticipate a coalition led by Persia and Russia marching against Israel. The single strongest convergence point across all eschatologies. The war of Gog and Magog is the joint where every script aligns.",
    strength: 4,
  },
  {
    id: "C4",
    title: "Destruction of Europe / NATO",
    traditions: ["orthodox", "christian"],
    desc: "Orthodox eschatology requires the fall of the West for Moscow's Third Rome. Christian eschatology frames it as the collapse of secular civilisation during tribulation. Both agree Europe falls.",
    strength: 2,
  },
  {
    id: "C5",
    title: "Global War Centred on the Middle East",
    traditions: ["jewish", "christian", "islamic", "orthodox"],
    desc: "Armageddon (Christian), Al-Malhama (Islamic), the war of Gog & Magog (Jewish/Orthodox). All four traditions place the final apocalyptic conflict in or around the Middle East. The strongest convergence on geography.",
    strength: 4,
  },
  {
    id: "C6",
    title: "Rise of Iran as a Superpower",
    traditions: ["islamic", "orthodox"],
    desc: "Islamic eschatology needs a powerful Eastern force to challenge oppression. Orthodox eschatology needs Persia as an ally in the Gog coalition. Both require Iran to win, industrialise, and project power across the region.",
    strength: 2,
  },
  {
    id: "C7",
    title: "US & China Exit the World Stage",
    traditions: ["jewish", "christian", "islamic", "orthodox"],
    desc: "All four traditions agree: the United States and China are not part of the eschatological future. Something happens to both that makes them irrelevant. For the US, the prediction is civil war and economic collapse. For China, the mechanism is unspecified but implied.",
    strength: 4,
  },
];

// ─── Predictions ─────────────────────────────────────────────────────────────

const PREDICTIONS = [
  {
    id: "P1",
    title: "US Deploys Ground Troops in Iran",
    domain: "military",
    traditions: ["christian", "jewish"],
    whatHappens:
      "The United States escalates from air strikes and siege warfare to a ground invasion of Iran. The inverse cost pyramid (air-heavy, infantry-light) proves unsustainable. Mission creep draws America into mountainous terrain where it cannot win.",
    howItHappens:
      "Iran's guerrilla warfare strategy ('hide and seek') neutralises American air supremacy. Iran hides in mountains and strikes GCC/Israel with cheap drones ($35-50K each vs $1M THAAD interceptors). Iran produces ~500 drones/day with a stockpile of ~80,000. The GCC cannot defend itself \u2014 it's flat desert against a mountain fortress. US bases prove unable to defend themselves either. Senator Blumenthal confirms: 'We are on a path toward deploying American troops on the ground.' Iran's FM Araghchi tells NBC: 'We are waiting for them... we have been preparing for about 20 years.'",
    convergencePoints: ["C5"],
    feedsInto: ["P2", "P3"],
    fedBy: [],
    status: "early-signs",
    evidence: [
      "Senator Blumenthal's post-briefing statement confirms path to ground troops",
      "No articulated budget or end-date for the war (open-ended commitment)",
      "Iran's Foreign Minister expresses confidence in guerrilla warfare readiness",
      "Iran has been preparing mountainous defensive positions for 20 years",
    ],
  },
  {
    id: "P2",
    title: "National Draft Triggers US Civil War",
    domain: "political",
    traditions: ["christian"],
    whatHappens:
      "Ground troop deployment requires conscription. Young Americans refuse to fight. Mass protests erupt. The National Guard is deployed domestically. Civil conflict spirals. America tears itself apart.",
    howItHappens:
      "The US lacks the political will and manufacturing capacity for a sustained ground war. Coffins returning home trigger Vietnam-era unrest. A national draft forces the issue. The domestic population fractures along existing fault lines (elite overproduction, factionalism, inequality). 'A lot of young people are going to refuse to fight in this war. This is going to create protests, then America will have no choice but to deploy the National Guard.'",
    convergencePoints: ["C7"],
    feedsInto: ["P17"],
    fedBy: ["P1"],
    status: "dormant",
    evidence: [
      "US lacks manufacturing capacity \u2014 factories shipped to China",
      "Political will for sustained casualties is near zero",
      "Elite overproduction and factionalism already visible in US politics",
    ],
  },
  {
    id: "P3",
    title: "US Loses Ground War / CENTCOM Transfers to Israel",
    domain: "military",
    traditions: ["jewish", "islamic"],
    whatHappens:
      "The American military is defeated in Iran's mountainous terrain after 5-10 years of guerrilla warfare. CENTCOM \u2014 the US military command structure in the Middle East \u2014 transfers operational control to Israel. America exits the region.",
    howItHappens:
      "Iran is three times the size of Iraq, mountainous, and has 92 million people (50% Persian, with Kurd, Azeri, and Baloch minorities). 'Most analysts will tell you it is suicidal for the American military to invade Iran. It is a mountain fortress.' The US cannot sustain casualties, cannot rebuild manufacturing fast enough (5 years minimum), and cannot maintain political will at home. Israel absorbs American military infrastructure as the US withdraws.",
    convergencePoints: ["C5", "C7"],
    feedsInto: ["P10", "P9"],
    fedBy: ["P1"],
    status: "dormant",
    evidence: [
      "Iran's mountainous terrain makes conventional military victory near-impossible",
      "US manufacturing capacity insufficient for sustained war production",
      "Historical precedent: every empire that invaded Persia was defeated or drained",
    ],
  },
  {
    id: "P4",
    title: "Nuclear Weapons Will NOT Be Used",
    domain: "military",
    traditions: ["jewish", "christian", "islamic", "orthodox"],
    whatHappens:
      "Despite possessing nuclear weapons, neither Israel nor the United States will use them in this war. The escalation ladder must be climbed sequentially.",
    howItHappens:
      "The escalation ladder proceeds: decapitation \u2192 military targets \u2192 economic embargo \u2192 civilian infrastructure \u2192 secret weapons \u2192 biochemical weapons \u2192 nuclear weapons. As of now, secret weapons and biochemical weapons have not been deployed. Israel specifically does not want nukes because they would end the war too quickly \u2014 Israel needs a long war that exhausts the US. 'Unless I see biochemical weapons being used, I refuse to believe that nuclear weapons are on the table.'",
    convergencePoints: [],
    feedsInto: [],
    fedBy: [],
    status: "active",
    evidence: [
      "Escalation ladder has not reached biochemical or secret weapons stage",
      "Israel benefits from prolonged US involvement, not quick resolution",
      "Nuclear use would make Greater Israel project radioactively uninhabitable",
    ],
  },
  {
    id: "P5",
    title: "Al-Aqsa Mosque Destroyed / Third Temple Built",
    domain: "religious",
    traditions: ["jewish", "christian", "islamic"],
    whatHappens:
      "The Al-Aqsa Mosque and Dome of the Rock are destroyed during the war. The Third Temple of Solomon is constructed on the Temple Mount in Jerusalem. This becomes the headquarters of the new world order.",
    howItHappens:
      "All eschatologies either actively require or are indifferent to this event. Jewish and Christian Zionist eschatology demand the Third Temple. Pete Hegseth (Secretary of Defense) gave a 2018 speech in Jerusalem calling the Temple rebuild the next 'miracle' after 1917/1948/1967/2017. An Israeli rabbi was filmed suggesting a false flag: 'I would pretend that one missile came from Iran and shoot it down... then all the Arabs will go against Iran.' The analyst stakes his entire model on this prediction: 'If they do not destroy the mosque, my analysis is completely wrong.'",
    convergencePoints: ["C1"],
    feedsInto: ["P11", "P16"],
    fedBy: [],
    status: "early-signs",
    evidence: [
      "Pete Hegseth's 2018 Jerusalem speech explicitly calls for Temple rebuilding",
      "Israeli rabbi filmed discussing false flag scenario for Dome of the Rock",
      "US troops told the war is 'for Armageddon' \u2014 the Temple is central to this",
      "Schneerson urged Netanyahu to 'hurry up' the Messiah (1990 video)",
    ],
  },
  {
    id: "P6",
    title: "GCC Economies Deliberately Collapsed",
    domain: "economic",
    traditions: ["jewish", "islamic"],
    whatHappens:
      "The economies of the Gulf Cooperation Council states (UAE, Saudi Arabia, Bahrain, Qatar, Kuwait) are systematically destroyed. Their wealth is redirected. Their territories become available for absorption.",
    howItHappens:
      "Iran closes the Strait of Hormuz, cutting off 20% of world oil supply. The GCC imports 80% of its food through this strait. GCC states are flat desert \u2014 indefensible against Iranian drones and rockets. Dubai's airport shut down; wealthy residents paying $250K to flee. Bahrain (50% Shia population ruled by Sunnis) predicted to fall first via Shia revolution. 'For Israel to achieve the Greater Israel project, it needs to absorb the GCC and parts of Turkey and Egypt. The GCC is basically finished.'",
    convergencePoints: ["C5"],
    feedsInto: ["P10", "P17"],
    fedBy: [],
    status: "active",
    evidence: [
      "Iran has closed the Strait of Hormuz",
      "Iranian attacks on Dubai shut down the airport",
      "Iranian missiles hit US Fifth Fleet base in Bahrain",
      "GCC states attacked across Qatar, Kuwait, Abu Dhabi",
      "Water stress: Dubai 17,000%, Bahrain ~4,000%, Saudi Arabia 883%",
    ],
  },
  {
    id: "P7",
    title: "Turkey Enters the War",
    domain: "military",
    traditions: ["orthodox", "islamic"],
    whatHappens:
      "Turkey is drawn into the wider Middle East conflict and suffers severe military and economic damage. This weakens Turkey for the subsequent Greek-Russian operation to retake Constantinople.",
    howItHappens:
      "The war is designed to 'weaken opposition to these eschatologies as much as possible.' Turkey's entry weakens NATO's southern flank. Turkey's participation exhausts its military capacity. Once NATO collapses (P13), Turkey loses its alliance protection, making it vulnerable to the Third Rome prophecy.",
    convergencePoints: ["C5"],
    feedsInto: ["P14"],
    fedBy: ["P13"],
    status: "dormant",
    evidence: [
      "Turkey's geographic position between Iran and Europe makes involvement likely",
      "NATO Article 5 obligations could draw Turkey in",
    ],
  },
  {
    id: "P8",
    title: "Saudi Arabia Enters the War",
    domain: "military",
    traditions: ["islamic"],
    whatHappens:
      "Saudi Arabia is drawn into the conflict against Iran and suffers tremendous damage. Its already fragile economy is devastated. Its military proves insufficient against Iranian asymmetric warfare.",
    howItHappens:
      "Saudi Arabia wants to destroy Iran but lacks the capability. Its entry into the war further exhausts GCC resources. 'Turkey and Saudi Arabia will enter this war and they will suffer tremendously because of their participation.' Saudi oil infrastructure is indefensible against cheap Iranian drones in flat desert terrain.",
    convergencePoints: ["C5"],
    feedsInto: ["P6"],
    fedBy: [],
    status: "dormant",
    evidence: [
      "Saudi oil facilities have been struck before (2019 Aramco attack)",
      "Saudi involvement in Yemen demonstrated military limitations",
    ],
  },
  {
    id: "P9",
    title: "Rise of Persia \u2014 Iran Becomes Regional Superpower",
    domain: "political",
    traditions: ["islamic", "orthodox"],
    whatHappens:
      "Iran wins the war. Persian civilisational identity is reactivated. Iran controls the Strait of Hormuz, extracts tribute from the GCC, and industrialises rapidly. Within 5-10 years, an economic miracle transforms Iran into the dominant Middle Eastern power.",
    howItHappens:
      "American strategy paradoxically strengthens Iran: (1) Decapitation solves elite overproduction \u2014 leaner, more meritocratic leadership emerges. (2) Carpet bombing unifies the urban-secular and rural-religious divide \u2014 greater social cohesion. (3) Arming ethnic insurgents (Kurds, Baloch, Azeris) activates Persian nationalism rather than fracturing the state. If the US leaves, Iran says to the GCC: 'You attacked us. You owe compensation. And now we control the strait \u2014 pay us a toll.' Trillions of dollars flow to Iran instead of the US stock market.",
    convergencePoints: ["C6"],
    feedsInto: ["P16"],
    fedBy: ["P3"],
    status: "early-signs",
    evidence: [
      "Iran's guerrilla warfare proving effective against US air power",
      "Iranian drones cost $35-50K vs $1M US interceptors \u2014 unsustainable cost ratio",
      "Iran has closed the Strait of Hormuz, demonstrating strategic control",
      "FM Araghchi's confident statements about ground war readiness",
    ],
  },
  {
    id: "P10",
    title: "Greater Israel Project Achieved",
    domain: "political",
    traditions: ["jewish"],
    whatHappens:
      "Israel expands its territory to encompass the Promised Land \u2014 from the Nile to the Euphrates. Parts of the GCC, Turkey, and Egypt are absorbed. Capital, technology, and talent flow to Israel as the new global centre.",
    howItHappens:
      "With CENTCOM transferred to Israel (P3), GCC economies collapsed (P6), and regional opposition weakened, Israel fills the power vacuum. Tech companies (Nvidia, Oracle, Microsoft, Google) begin transferring operations to Israel 'because that is where the power will rest.' This is territorial expansion, distinct from Pax Judaica (P11), which is a governance system.",
    convergencePoints: ["C1"],
    feedsInto: ["P11"],
    fedBy: ["P3", "P6", "P15"],
    status: "dormant",
    evidence: [
      "Netanyahu's reading of 'Rome vs. the Jews' \u2014 'we lost it, we must win the next'",
      "Schneerson urged Netanyahu to 'speed up' the Messiah's coming (1990 video)",
      "Kushner and Witkoff's Gaza redevelopment plans suggest territorial ambition",
    ],
  },
  {
    id: "P11",
    title: "Pax Judaica \u2014 AI Surveillance World Government",
    domain: "technological",
    traditions: ["jewish", "christian"],
    whatHappens:
      "A one-world government is established from Jerusalem, headquartered in the rebuilt Third Temple. It operates through AI surveillance, digital ID, digital currency, and biometric control. Judaism calls it messianic peace; Christianity calls it the Antichrist system.",
    howItHappens:
      "The infrastructure is already being built: AI companies, digital ID systems, Central Bank Digital Currencies. Once the Third Temple is built (P5) and Greater Israel established (P10), the governance apparatus is activated. 'You cannot buy or sell without compliance' \u2014 the Mark of the Beast is a digital control system. Freemason eschatology specifically focuses on implementing this system through Solomon's Temple architecture.",
    convergencePoints: ["C2"],
    feedsInto: ["P16"],
    fedBy: ["P5", "P10"],
    status: "early-signs",
    evidence: [
      "CBDC development accelerating globally",
      "AI surveillance technology advancing rapidly",
      "Digital ID systems being deployed across multiple nations",
      "Hegseth explicitly links Temple rebuilding to governance",
    ],
  },
  {
    id: "P12",
    title: "Russia Wins in Ukraine",
    domain: "military",
    traditions: ["orthodox"],
    whatHappens:
      "Russia achieves its objectives in Ukraine. The war serves not merely territorial aims but the Orthodox eschatological goal of destroying NATO and the European order. 'This war was lost about 2 years ago.'",
    howItHappens:
      "The Ukraine war continues not because Ukraine can win, but because the perception of American invincibility must be maintained. Once that perception breaks, 'this entire edifice collapses.' Russia is simultaneously aiding Iran (confirmed by Blumenthal), creating a two-front pressure on the American-led order.",
    convergencePoints: ["C4"],
    feedsInto: ["P13"],
    fedBy: [],
    status: "active",
    evidence: [
      "Senator Blumenthal confirms 'active Russian aid to Iran'",
      "Ukraine war described as 'lost about 2 years ago'",
      "Russia simultaneously supporting Iran while fighting in Ukraine",
    ],
  },
  {
    id: "P13",
    title: "NATO and European Order Destroyed",
    domain: "political",
    traditions: ["orthodox", "christian"],
    whatHappens:
      "NATO collapses as an effective alliance. Europe is economically and militarily devastated. The post-WWII liberal order disintegrates. Germany and Japan \u2014 wealthy vassal states \u2014 are freed from American control.",
    howItHappens:
      "The Ukraine war drains European military capacity. America destroys European economic sovereignty (Nord Stream pipeline, forcing Germany out of Russian energy and Chinese markets). 'America could destroy Germany's pipeline, and there's nothing Germany can do about it.' European nations are vassal states whose wealth was never real sovereignty. The Plaza Accords precedent shows America can force allies to destroy their own economies.",
    convergencePoints: ["C4"],
    feedsInto: ["P14", "P7"],
    fedBy: ["P12"],
    status: "partial",
    evidence: [
      "Nord Stream pipeline destruction eliminated German energy independence",
      "Germany forced out of both Russian energy and Chinese export markets",
      "European military stocks depleted by Ukraine support",
      "Historical precedent: Plaza Accords forced Japan to destroy its own economy",
    ],
  },
  {
    id: "P14",
    title: "Greeks Return to Constantinople",
    domain: "political",
    traditions: ["orthodox"],
    whatHappens:
      "Greece goes to war against Turkey. Russia supports the Greeks. Istanbul (Constantinople) is returned to Christendom, fulfilling the Third Rome prophecy. 'Two Romes have fallen, a third stands, a fourth there shall not be.'",
    howItHappens:
      "This becomes possible only after: (1) NATO collapses (P13), removing Turkey's alliance protection. (2) Turkey is weakened by its entry into the Iran war (P7). (3) Russia has won in Ukraine (P12) and has military capacity to project southward. Russia backs Greece as the agent of Orthodox civilisational restoration.",
    convergencePoints: ["C4"],
    feedsInto: ["P16"],
    fedBy: ["P13", "P7", "P12"],
    status: "dormant",
    evidence: [
      "Third Rome prophecy is active in Russian Orthodox political theology",
      "Turkey's NATO membership is the primary obstacle \u2014 its removal unlocks this scenario",
    ],
  },
  {
    id: "P15",
    title: "Rise of Global Anti-Semitism",
    domain: "political",
    traditions: ["jewish"],
    whatHappens:
      "Anti-Semitism surges worldwide, making life untenable for diaspora Jews. This forces the remaining Jewish populations to emigrate to Israel, fulfilling the prophecy of the Ingathering of Exiles.",
    howItHappens:
      "This is not incidental but functional within the eschatological script. The war, Israel's actions, and the establishment of Pax Judaica generate global backlash. The backlash is anticipated and even desired because it forces diaspora return, which is a prerequisite for the messianic age. The population base of Greater Israel requires mass Jewish immigration.",
    convergencePoints: [],
    feedsInto: ["P10"],
    fedBy: [],
    status: "partial",
    evidence: [
      "Anti-Semitic incidents rising globally since October 2023",
      "Jewish emigration to Israel increasing",
      "Historical pattern: persecution drives aliyah",
    ],
  },
  {
    id: "P16",
    title: "War of Gog and Magog",
    domain: "military",
    traditions: ["jewish", "christian", "islamic", "orthodox"],
    whatHappens:
      "A coalition led by Persia (Iran) and Russia marches against Israel / Pax Judaica. This is the final war before the end of history. All four traditions anticipate this confrontation as the climactic event.",
    howItHappens:
      "After Iran rises as a superpower (P9), Russia fulfils the Third Rome prophecy (P12-P14), and Pax Judaica is established (P11), the stage is set. 'Gog' is interpreted as Persia and Russia. They march against the world government based in Jerusalem. This is the single strongest convergence point \u2014 where every eschatological script aligns on the same event.",
    convergencePoints: ["C3"],
    feedsInto: [],
    fedBy: ["P9", "P11", "P14", "P5"],
    status: "dormant",
    evidence: [
      "Russia already actively aiding Iran \u2014 coalition forming in real time",
      "Gog & Magog prophecy is shared across all four traditions",
      "Iran and Russia's current alliance is unprecedented in modern history",
    ],
  },
  {
    id: "P17",
    title: "US and China Become Irrelevant",
    domain: "political",
    traditions: ["jewish", "christian", "islamic", "orthodox"],
    whatHappens:
      "Both the United States and China exit the world stage. 'For whatever reason, the United States is not going to partake in future events. Neither will China.' All four eschatologies agree on this absence.",
    howItHappens:
      "For the US: civil war (P2), economic collapse from GCC money flow stopping (P6), military defeat in Iran (P3), and loss of global hegemony. 'The US cannot go home because if it does, the economy collapses. But it cannot stay because it will lose.' For China: the mechanism is unspecified but implied by the same dynamics \u2014 Strait of Hormuz closure cuts 40% of China's oil. 'Something will happen to these two countries that will make them not significant anymore.'",
    convergencePoints: ["C7"],
    feedsInto: [],
    fedBy: ["P2", "P6", "P3"],
    status: "early-signs",
    evidence: [
      "US economic dependence on GCC investment creates structural fragility",
      "China receives 40% of oil via the Strait of Hormuz",
      "Neither nation appears in any eschatological tradition's end-state",
      "Japan stated it runs out of oil in 8-9 months if the strait stays closed",
    ],
  },
];

// ─── Constraints ─────────────────────────────────────────────────────────────

const CONSTRAINTS = [
  {
    id: "K1",
    title: "Nuclear Weapons Will Not Be Used",
    desc: "The escalation ladder must be climbed sequentially. Secret weapons and biochemical weapons have not yet appeared. Israel benefits from a long war, not a quick one. Nuclear use would make Greater Israel radioactively uninhabitable.",
    relatedPredictions: ["P4"],
  },
  {
    id: "K2",
    title: "The US Cannot Simply Withdraw",
    desc: "If America goes home, GCC money stops flowing to the US stock market. The entire US economy \u2014 based on finance, AI, and foreign investment \u2014 collapses. 'You're better off sending people to Iran than having the people in America cause a revolution.'",
    relatedPredictions: ["P1", "P2", "P17"],
  },
  {
    id: "K3",
    title: "Iran Is Essentially Uninvadable",
    desc: "Three times the size of Iraq. Mountainous terrain. 92 million people. 20 years of preparation for a ground invasion. 'Most analysts will tell you it is suicidal for the American military to invade Iran. It is a mountain fortress.'",
    relatedPredictions: ["P1", "P3", "P9"],
  },
  {
    id: "K4",
    title: "US Lacks Manufacturing Capacity",
    desc: "America shipped all its factories to China. It cannot produce munitions at the scale needed for sustained war. Maybe 5 years from now it will have capacity, but right now it doesn't.",
    relatedPredictions: ["P1", "P3"],
  },
  {
    id: "K5",
    title: "American Strategy Paradoxically Strengthens Iran",
    desc: "Decapitation solves elite overproduction. Carpet bombing unifies urban-secular and rural-religious populations. Arming ethnic insurgents (Kurds, Baloch, Azeris) activates Persian nationalism. All three US strategies backfire.",
    relatedPredictions: ["P9"],
  },
  {
    id: "K6",
    title: "Iran Cannot Destroy Israel",
    desc: "Israel has nuclear weapons. Iran can humble Israel but cannot eliminate it. This constraint shapes Iran's strategic ceiling \u2014 it aims for regional dominance, not Israeli destruction.",
    relatedPredictions: ["P9", "P16"],
  },
  {
    id: "K7",
    title: "GCC Cannot Defend Itself",
    desc: "Flat desert vs. mountain fortress. Iranian Shahed drones cost $35-50K; US THAAD interceptors cost $1M each and require 2-3 per drone. Desalination plants, oil fields, and military bases are all indefensible. 80% of food is imported through the strait Iran now controls.",
    relatedPredictions: ["P6", "P8"],
  },
  {
    id: "K8",
    title: "No Ceasefire or Truce Is Possible",
    desc: "Both the American empire and Iran are fighting for the nature and structure of reality itself. This is not a conventional conflict with negotiable aims \u2014 it is an eschatological confrontation where both sides believe they are fulfilling divine mandate.",
    relatedPredictions: ["P1", "P3"],
  },
  {
    id: "K9",
    title: "Bribed Proxies Are Unreliable",
    desc: "Ethnic insurgents the US is arming and paying are 'hustlers' who will take American money without fighting effectively. 'They're not fighting because they want more freedom. They're fighting because they want to rip off the US government.'",
    relatedPredictions: ["P1", "P3"],
  },
  {
    id: "K10",
    title: "Empires That Fall Never Return",
    desc: "Once an empire falls, it does not recover. 'When societies fall they just die off.' The hubris that made them dominant prevents self-correction. A new group may inherit the territory but they are a different civilisation.",
    relatedPredictions: ["P17"],
  },
];

// ─── State Actors ────────────────────────────────────────────────────────────

const STATE_ACTORS = [
  {
    id: "SA1",
    name: "United States",
    flag: "\uD83C\uDDFA\uD83C\uDDF8",
    traditions: ["christian"],
    predictions: ["P1", "P2", "P3", "P4", "P17"],
    role: "The Empire",
    desc: "Current global hegemon fighting a war it cannot win, cannot afford, and cannot exit. Suffering from inequality, elite overproduction, factionalism, hubris, and lack of manufacturing capacity. Christian Zionist eschatology operates at the cabinet level (Hegseth, Trump). The empire's own military has been told this war is 'for Armageddon.'",
  },
  {
    id: "SA2",
    name: "Iran",
    flag: "\uD83C\uDDEE\uD83C\uDDF7",
    traditions: ["islamic"],
    predictions: ["P1", "P3", "P9", "P16"],
    role: "The Mountain Fortress",
    desc: "92 million people. Shia theocracy with Zoroastrian strategic DNA. 50% Persian with Kurd, Azeri, and Baloch minorities. Fighting via guerrilla warfare, drones, and Strait of Hormuz control. 20 years of preparation for exactly this war. Assassination of Ayatollah Khamenei galvanised martyrdom motivation.",
  },
  {
    id: "SA3",
    name: "Israel",
    flag: "\uD83C\uDDEE\uD83C\uDDF1",
    traditions: ["jewish"],
    predictions: ["P5", "P10", "P11", "P16"],
    role: "The Eschatological State",
    desc: "Nuclear-armed. Pursuing the Greater Israel Project and Pax Judaica. Secretly wants the US to lose and be exhausted so Israel becomes sole regional hegemon. Netanyahu views America ('Rome') as the ultimate adversary, not the permanent ally. Chabad-Lubavitch provides the eschatological engine.",
  },
  {
    id: "SA4",
    name: "Russia",
    flag: "\uD83C\uDDF7\uD83C\uDDFA",
    traditions: ["orthodox"],
    predictions: ["P12", "P13", "P14", "P16"],
    role: "The Third Rome",
    desc: "Already actively aiding Iran (confirmed by Blumenthal). The Ukraine war serves Orthodox eschatology: destroy NATO, destroy Europe, achieve the Third Rome prophecy. Russia uses Chabad-Lubavitch to monitor Russian-Jewish oligarchs. The coalition with Persia forms the prophesied Gog.",
  },
  {
    id: "SA5",
    name: "Saudi Arabia",
    flag: "\uD83C\uDDF8\uD83C\uDDE6",
    traditions: ["islamic"],
    predictions: ["P6", "P8"],
    role: "The Reluctant Combatant",
    desc: "Wants to destroy Iran, humble Israel, and free itself from American vassalage. Oil economy in terminal decline. Will enter the war and suffer tremendously. Its participation accelerates GCC economic collapse.",
  },
  {
    id: "SA6",
    name: "Turkey",
    flag: "\uD83C\uDDF9\uD83C\uDDF7",
    traditions: ["islamic"],
    predictions: ["P7", "P13", "P14"],
    role: "The Sacrificial NATO Member",
    desc: "Drawn into the war, weakened by participation, then abandoned when NATO collapses. Loses Constantinople to a Greek-Russian operation. Its NATO membership \u2014 the only thing protecting it \u2014 becomes worthless.",
  },
  {
    id: "SA7",
    name: "China",
    flag: "\uD83C\uDDE8\uD83C\uDDF3",
    traditions: [],
    predictions: ["P17"],
    role: "The Absent Superpower",
    desc: "Not part of any eschatological framework. Receives 40% of oil through the Strait of Hormuz. Described as 'neutral' and 'okay with either scenario.' Something unspecified will happen to make China irrelevant. 'China is done.'",
  },
  {
    id: "SA8",
    name: "GCC States",
    flag: "\uD83C\uDDF6\uD83C\uDDE6",
    traditions: [],
    predictions: ["P6"],
    role: "The Indefensible Desert",
    desc: "UAE, Bahrain, Qatar, Kuwait. Cannot defend themselves \u2014 flat desert against a mountain fortress. 80% of food imported. Dubai 17,000% water stress. Bahrain (50% Shia) may fall first via internal revolution. Their destruction is 'part of the plan' for Greater Israel.",
  },
  {
    id: "SA9",
    name: "Germany",
    flag: "\uD83C\uDDE9\uD83C\uDDE8",
    traditions: [],
    predictions: ["P13"],
    role: "The Future Empire",
    desc: "Currently a vassal state \u2014 Nord Stream destroyed, forced out of Russian energy and Chinese markets. But never was a world empire (lost WWI and WWII). Based on the asabiyyah framework, defeated marginalised peoples with high cohesion become future empires.",
  },
  {
    id: "SA10",
    name: "Japan",
    flag: "\uD83C\uDDEF\uD83C\uDDF5",
    traditions: [],
    predictions: ["P17"],
    role: "The Dependent Island",
    desc: "75% of oil from the Strait of Hormuz. Prime Minister stated Japan runs out of oil in 8-9 months if the strait stays closed. Like Germany, destroyed in WWII and forced into vassalage via the Plaza Accords. Predicted to rise as a future East Asian power.",
  },
  {
    id: "SA11",
    name: "Greece",
    flag: "\uD83C\uDDEC\uD83C\uDDF7",
    traditions: ["orthodox"],
    predictions: ["P14"],
    role: "The Inheritor of Constantinople",
    desc: "In Orthodox eschatology, Greece is the agent of civilisational restoration. With Russian backing and NATO dissolved, Greece retakes Istanbul/Constantinople \u2014 fulfilling the Third Rome prophecy.",
  },
  {
    id: "SA12",
    name: "Chabad-Lubavitch",
    flag: "\u2721",
    traditions: ["jewish"],
    predictions: ["P5", "P10", "P11"],
    role: "The Transnational Eschatological Network",
    desc: "Not a state but operates above state boundaries. Powerful in Russia, America, and Israel. Connects Netanyahu, Putin, Trump/Kushner, and Schneerson. 'Basically state-sanctioned Judaism.' Used by Putin to monitor Russian-Jewish oligarchs. The driving engine of accelerationist messianic eschatology.",
  },
];

// ─── Individual Actors ───────────────────────────────────────────────────────

const INDIVIDUAL_ACTORS = [
  {
    id: "IA1",
    name: "Donald Trump",
    initials: "DT",
    role: "President of the United States",
    tradition: "christian",
    significance:
      "Described by his own military commanders as 'anointed by Jesus to light the signal fire in Iran to cause Armageddon.' Moved the US embassy to Jerusalem (2017). Initiated the Iran war. Connected to Chabad-Lubavitch through Jared Kushner and Ivanka Trump.",
    connections: { actors: ["IA4", "IA5", "IA6", "IA10"], states: ["SA1"] },
  },
  {
    id: "IA2",
    name: "Benjamin Netanyahu",
    initials: "BN",
    role: "Prime Minister of Israel",
    tradition: "jewish",
    significance:
      "Shown in 1990 video receiving Schneerson's blessing to 'hurry up' the Messiah. Reading 'Rome vs. the Jews' \u2014 'we lost it. I think we have to win the next.' Views America ('Rome') as Israel's ultimate adversary, not permanent ally.",
    connections: { actors: ["IA3", "IA4", "IA10"], states: ["SA3"] },
  },
  {
    id: "IA3",
    name: "Rabbi Schneerson",
    initials: "RS",
    role: "Leader of Chabad-Lubavitch (deceased)",
    tradition: "jewish",
    significance:
      "The most powerful figure in extreme Jewish eschatology. Urged Netanyahu to accelerate the Messiah's coming. His gravesite was visited by Kushner on Trump's election day. The engine of accelerationist messianic activism that operates across national boundaries.",
    connections: { actors: ["IA2", "IA4", "IA19"], states: ["SA12"] },
  },
  {
    id: "IA4",
    name: "Jared Kushner",
    initials: "JK",
    role: "Senior Adviser / Trump Son-in-Law",
    tradition: "jewish",
    significance:
      "Chabad-Lubavitch connection. Visited Schneerson's gravesite on Trump's election day. FBI source: 'Kushner moved a lot of Russian investment money around.' Met with Putin on Ukraine, with Omanis on Iran, with Netanyahu on Gaza redevelopment. The node connecting Trump, Netanyahu, Putin, and Chabad.",
    connections: {
      actors: ["IA1", "IA2", "IA3", "IA9", "IA11"],
      states: ["SA1", "SA3", "SA4"],
    },
  },
  {
    id: "IA5",
    name: "Pete Hegseth",
    initials: "PH",
    role: "Secretary of Defense",
    tradition: "christian",
    significance:
      "Gave a 2018 speech in Jerusalem calling the Temple rebuilding the next 'miracle' in a divine sequence (1917, 1948, 1967, 2017). 'There's no reason why the miracle of the reestablishment of the temple on the temple mount is not possible.' Christian Zionism at the cabinet level.",
    connections: { actors: ["IA1"], states: ["SA1"] },
  },
  {
    id: "IA6",
    name: "Marco Rubio",
    initials: "MR",
    role: "US Secretary of State",
    tradition: "christian",
    significance:
      "Gave what the analyst calls a 'moronic' justification for the war \u2014 claiming the US attacked Iran preemptively because 'we heard the Israelis were going to attack first.' The incoherence of this rationale is cited as evidence that no rational geopolitical explanation exists.",
    connections: { actors: ["IA1"], states: ["SA1"] },
  },
  {
    id: "IA7",
    name: "Ayatollah Khamenei",
    initials: "AK",
    role: "Supreme Leader of Iran (assassinated)",
    tradition: "islamic",
    significance:
      "Assassinated in an Israeli/American decapitation strike. Died with his daughter, son-in-law, and grandchildren. Had prostate cancer but chose to stay in Tehran rather than flee to Moscow. His death is framed as martyrdom, galvanising Shia resistance rather than breaking it.",
    connections: { actors: ["IA8"], states: ["SA2"] },
  },
  {
    id: "IA8",
    name: "Abbas Araghchi",
    initials: "AA",
    role: "Foreign Minister of Iran",
    tradition: "islamic",
    significance:
      "Told NBC News: 'We are waiting for them... we are confident that we can confront them and that would be a big disaster for them.' His calm confidence in guerrilla warfare readiness contrasts with Washington's insularity.",
    connections: { actors: ["IA7"], states: ["SA2"] },
  },
  {
    id: "IA9",
    name: "Jeffrey Epstein",
    initials: "JE",
    role: "Operative of Transnational Network",
    tradition: "jewish",
    significance:
      "Not merely a Mossad agent but an operative of the Rothschild family network. Connected intelligence, crime, finance, and science. Dershowitz told prosecutors Epstein 'belonged to both US and allied intelligence services.' The Epstein files (~3 million documents) reveal connections to Putin, Thiel, Musk, Gates, and Prince Andrew.",
    connections: {
      actors: ["IA4", "IA10", "IA12", "IA13", "IA14"],
      states: ["SA1", "SA3"],
    },
  },
  {
    id: "IA10",
    name: "Steve Witkoff",
    initials: "SW",
    role: "US Envoy / Negotiator",
    tradition: "jewish",
    significance:
      "Sabotaged Iran peace negotiations by publicly claiming Iranian uranium enrichment during talks. Partnered with Kushner on Gaza real estate redevelopment plans. His actions suggest peace talks were theatre for war justification.",
    connections: { actors: ["IA1", "IA4"], states: ["SA1"] },
  },
  {
    id: "IA11",
    name: "Vladimir Putin",
    initials: "VP",
    role: "President of Russia",
    tradition: "orthodox",
    significance:
      "Connected to the eschatological network via Masha Drokova (former contact in Putin's Russian youth movement, now in Silicon Valley). Uses Chabad-Lubavitch to monitor Russian-Jewish oligarchs. Actively aiding Iran while pursuing the Third Rome prophecy in Ukraine.",
    connections: { actors: ["IA4", "IA9"], states: ["SA4"] },
  },
  {
    id: "IA12",
    name: "Alan Dershowitz",
    initials: "AD",
    role: "Harvard Professor / Attorney",
    tradition: "jewish",
    significance:
      "Represented Epstein. Told US Attorney that Epstein 'belonged to both US and allied intelligence services.' Debriefed by Mossad after Epstein calls. The legal-academic node connecting intelligence, law, and the eschatological network.",
    connections: { actors: ["IA9"], states: ["SA1", "SA3"] },
  },
  {
    id: "IA13",
    name: "Senator Blumenthal",
    initials: "RB",
    role: "US Senator / Gang of Eight Member",
    tradition: "",
    significance:
      "After a classified Gang of Eight briefing, publicly confirmed: no budget or end-date for the war, a path toward ground troops, and 'the spectre of active Russian aid to Iran.' His statements are key evidence supporting multiple predictions.",
    connections: { actors: [], states: ["SA1"] },
  },
  {
    id: "IA14",
    name: "Ehud Barak",
    initials: "EB",
    role: "Former Prime Minister of Israel",
    tradition: "jewish",
    significance:
      "Described as Epstein's intelligence mentor \u2014 'Epstein trained as a spy under him.' Believed Netanyahu was a criminal. The node connecting Israeli intelligence to the Epstein network.",
    connections: { actors: ["IA9", "IA2"], states: ["SA3"] },
  },
  {
    id: "IA15",
    name: "Ibn Khaldun",
    initials: "IK",
    role: "Muslim Scholar-Historian",
    tradition: "islamic",
    significance:
      "Proposed the concept of asabiyyah (group cohesion/solidarity) \u2014 the mechanism by which marginal groups conquer wealthy empires. His theory is the analytical backbone of the entire predictive framework. Empires fall because mass, organisation, and capacity to absorb death become inequality, factionalism, and hubris.",
    connections: { actors: [], states: [] },
  },
  {
    id: "IA16",
    name: "Peter Turchin",
    initials: "PT",
    role: "Historian / Complexity Scientist",
    tradition: "",
    significance:
      "Coined the term 'elite overproduction' \u2014 the condition where too many elites compete for too few positions, creating factional warfare within the ruling class. Applied to the US (Democrats vs. Republicans) and Iran (where American decapitation paradoxically solves the problem).",
    connections: { actors: [], states: [] },
  },
  {
    id: "IA17",
    name: "John Larson",
    initials: "JL",
    role: "Journalist (Substack)",
    tradition: "",
    significance:
      "Reported that US troops were told the Iran war is 'for Armageddon, the return of Jesus.' Published an NCO complaint email describing a combat readiness briefing where a commander cited the Book of Revelation. 16 service members filed complaints with the MRFF.",
    connections: { actors: [], states: ["SA1"] },
  },
  {
    id: "IA18",
    name: "Yosef Yitzchak Schneersohn",
    initials: "YY",
    role: "Previous Lubavitcher Rebbe",
    tradition: "jewish",
    significance:
      "Father-in-law of Rabbi Schneerson. Rescued from Nazi-occupied Warsaw in 1939 through extraordinary cross-border coordination: American Jews, US State Department, Nazi military intelligence (Admiral Canaris), all cooperated to extract one rabbi during active warfare. Proof that eschatological networks operate above nation-state boundaries.",
    connections: { actors: ["IA3", "IA19", "IA20"], states: ["SA12"] },
  },
  {
    id: "IA19",
    name: "Admiral Wilhelm Canaris",
    initials: "WC",
    role: "Head of German Military Intelligence (Abwehr)",
    tradition: "",
    significance:
      "A 'skeptical Nazi who disapproved of SS atrocities.' Enlisted to help rescue Yosef Yitzchak from Warsaw by Helmuth Wohlthat. Dispatched Major Ernst Bloch to physically extract the Rebbe. Evidence that eschatological networks can coordinate across enemy lines during wartime.",
    connections: { actors: ["IA18", "IA20"], states: [] },
  },
  {
    id: "IA20",
    name: "Major Ernst Bloch",
    initials: "EB",
    role: "Wehrmacht Officer / Rebbe's Rescuer",
    tradition: "",
    significance:
      "Distinguished WWI veteran. A 'Mischling' (partial Jewish ancestry) declared 'of German blood' by Hitler in 1939. Personally located and extracted Yosef Yitzchak from Warsaw. The physical instrument through which the eschatological network operated across enemy lines.",
    connections: { actors: ["IA18", "IA19"], states: [] },
  },
];

// ─── Causal Web ──────────────────────────────────────────────────────────────

const CAUSAL_LINKS = [
  { from: "P1", to: "P2", label: "Ground troops require draft" },
  { from: "P1", to: "P3", label: "Ground invasion leads to defeat" },
  { from: "P2", to: "P17", label: "Civil war ends American hegemony" },
  { from: "P3", to: "P10", label: "CENTCOM transfers to Israel" },
  { from: "P3", to: "P9", label: "US defeat enables Iranian rise" },
  { from: "P5", to: "P11", label: "Temple becomes governance HQ" },
  { from: "P5", to: "P16", label: "Mosque destruction triggers Muslim mobilisation" },
  { from: "P6", to: "P10", label: "GCC collapse enables territorial absorption" },
  { from: "P6", to: "P17", label: "GCC money stops flowing to US" },
  { from: "P8", to: "P6", label: "Saudi entry accelerates GCC collapse" },
  { from: "P9", to: "P16", label: "Risen Persia forms Gog coalition" },
  { from: "P10", to: "P11", label: "Territory enables governance system" },
  { from: "P11", to: "P16", label: "Pax Judaica provokes final war" },
  { from: "P12", to: "P13", label: "Russian victory destroys NATO" },
  { from: "P13", to: "P14", label: "NATO collapse exposes Turkey" },
  { from: "P13", to: "P7", label: "NATO collapse draws Turkey into war" },
  { from: "P7", to: "P14", label: "Weakened Turkey loses Constantinople" },
  { from: "P14", to: "P16", label: "Russia fulfils Third Rome, joins Gog" },
  { from: "P15", to: "P10", label: "Diaspora return populates Greater Israel" },
];

const FEEDBACK_LOOPS = [
  {
    id: "FL1",
    name: "The American Trap",
    predictions: ["P1", "P2", "P3", "P17"],
    desc: "The US cannot withdraw (economy collapses) and cannot stay (military defeat). Ground troops lead to draft, draft leads to civil war, civil war leads to irrelevance. A self-reinforcing death spiral.",
  },
  {
    id: "FL2",
    name: "The Backfire Paradox",
    predictions: ["P1", "P9"],
    desc: "Every American strategy strengthens Iran. Decapitation solves elite overproduction. Bombing unifies the population. Arming insurgents activates nationalism. The harder America fights, the stronger Iran becomes.",
  },
  {
    id: "FL3",
    name: "The Convergence Engine",
    predictions: ["P5", "P10", "P11", "P16"],
    desc: "Temple destruction enables Pax Judaica, which provokes Gog and Magog, which fulfils every eschatology simultaneously. Each step makes the next inevitable.",
  },
  {
    id: "FL4",
    name: "The European Cascade",
    predictions: ["P12", "P13", "P7", "P14"],
    desc: "Russian victory destroys NATO. NATO collapse weakens Turkey. Turkey's weakness enables Constantinople's return. Each domino falls into the next.",
  },
];

// ─── Timeline ────────────────────────────────────────────────────────────────

const TIMELINE_PHASES = [
  {
    id: "T1",
    label: "Immediate",
    timeframe: "Weeks \u2013 Months",
    color: "#999",
    events: [
      { predictionId: "P4", label: "No nuclear weapons used", timeframe: "Ongoing" },
      { predictionId: "P6", label: "Strait of Hormuz closed; GCC under attack", timeframe: "Ongoing" },
      { predictionId: "P12", label: "Russia aids Iran; Ukraine war continues", timeframe: "Ongoing" },
      { predictionId: "P1", label: "Air war + siege warfare proves insufficient", timeframe: "Weeks" },
    ],
  },
  {
    id: "T2",
    label: "Near-Term",
    timeframe: "1 \u2013 2 Years",
    color: COLORS.gold,
    events: [
      { predictionId: "P1", label: "US ground troops deployed in Iran", timeframe: "Months" },
      { predictionId: "P5", label: "Al-Aqsa Mosque destroyed / Third Temple initiated", timeframe: "1-2 years" },
      { predictionId: "P7", label: "Turkey drawn into conflict", timeframe: "1-2 years" },
      { predictionId: "P8", label: "Saudi Arabia enters the war", timeframe: "1-2 years" },
    ],
  },
  {
    id: "T3",
    label: "Medium-Term",
    timeframe: "2 \u2013 4 Years",
    color: COLORS.crimson,
    events: [
      { predictionId: "P2", label: "National draft triggers civil war in US", timeframe: "2-3 years" },
      { predictionId: "P3", label: "US loses ground war; CENTCOM transfers", timeframe: "2-4 years" },
      { predictionId: "P6", label: "GCC economies fully collapsed", timeframe: "2-3 years" },
      { predictionId: "P10", label: "Greater Israel Project underway", timeframe: "3-4 years" },
      { predictionId: "P12", label: "Russia achieves objectives in Ukraine", timeframe: "2-3 years" },
      { predictionId: "P13", label: "NATO effectively dissolved", timeframe: "3-4 years" },
    ],
  },
  {
    id: "T4",
    label: "Long-Term",
    timeframe: "5 \u2013 10 Years",
    color: COLORS.purple,
    events: [
      { predictionId: "P9", label: "Iran industrialises; Persian superpower rises", timeframe: "5-10 years" },
      { predictionId: "P11", label: "Pax Judaica governance system activated", timeframe: "5-10 years" },
      { predictionId: "P14", label: "Greeks return to Constantinople", timeframe: "5-10 years" },
      { predictionId: "P17", label: "US and China fully irrelevant", timeframe: "5-10 years" },
      { predictionId: "P16", label: "War of Gog and Magog", timeframe: "10+ years" },
    ],
  },
];

// ─── Evidence Tracker ────────────────────────────────────────────────────────

const EVIDENCE_ITEMS = [
  {
    id: "E1",
    predictionId: "P1",
    label: "Blumenthal confirms path to ground troops",
    status: "active",
    detail:
      "After a classified Gang of Eight briefing, Senator Blumenthal stated: 'We are on a path toward deploying American troops on the ground in Iran.' No budget or end-date was articulated.",
  },
  {
    id: "E2",
    predictionId: "P1",
    label: "Russia actively aiding Iran",
    status: "active",
    detail:
      "Blumenthal confirmed 'the spectre of active Russian aid to Iran putting in danger American lives.' This makes the war significantly harder for the US.",
  },
  {
    id: "E3",
    predictionId: "P5",
    label: "Hegseth calls for Third Temple rebuilding",
    status: "active",
    detail:
      "Secretary of Defense Pete Hegseth gave a 2018 speech in Jerusalem listing 1917/1948/1967/2017 as miracles and stating: 'There is no reason why the miracle of the reestablishment of the temple on the temple mount is not possible.'",
  },
  {
    id: "E4",
    predictionId: "P5",
    label: "Israeli rabbi suggests false flag on Dome of the Rock",
    status: "active",
    detail:
      "An Israeli rabbi was filmed suggesting: 'I would pretend that one missile came from Iran and shoot it down at the Dome of the Rock... then all the Arabs will go against Iran.'",
  },
  {
    id: "E5",
    predictionId: "P5",
    label: "Schneerson urged Netanyahu to accelerate Messiah",
    status: "active",
    detail:
      "1990 video shows Rabbi Schneerson urging Netanyahu to 'hurry up' the return of the Messiah. Kushner visited Schneerson's gravesite on Trump's election day.",
  },
  {
    id: "E6",
    predictionId: "P1",
    label: "US troops told war is for Armageddon",
    status: "active",
    detail:
      "John Larson (Substack): US troops were told 'President Trump has been anointed by Jesus to light the signal fire in Iran to cause Armageddon and mark his return to earth.' 16 soldiers filed complaints with the MRFF.",
  },
  {
    id: "E7",
    predictionId: "P6",
    label: "Strait of Hormuz closed by Iran",
    status: "active",
    detail:
      "Iran has closed the Strait of Hormuz. Japan's PM states the country runs out of oil in 8-9 months. 20% of world oil supply affected. GCC food imports cut off.",
  },
  {
    id: "E8",
    predictionId: "P6",
    label: "Iranian attacks on GCC states",
    status: "active",
    detail:
      "Dubai airport shut down. Wealthy residents paying $250K to flee. Fifth Fleet base in Bahrain struck. Qatar, Kuwait, Abu Dhabi all attacked. Dubai water stress at 17,000%.",
  },
  {
    id: "E9",
    predictionId: "P9",
    label: "Iran's asymmetric warfare proving effective",
    status: "active",
    detail:
      "Iranian Shahed drones ($35-50K each) vs US THAAD interceptors ($1M each, 2-3 needed per drone). Iran produces ~500 drones/day with 80K stockpile. Cost ratio is unsustainable for the US.",
  },
  {
    id: "E10",
    predictionId: "P12",
    label: "Ukraine war described as already lost",
    status: "partial",
    detail:
      "The analyst states the war was 'lost about 2 years ago.' It continues to maintain the perception of American invincibility. Russia simultaneously aids Iran while fighting in Ukraine.",
  },
  {
    id: "E11",
    predictionId: "P13",
    label: "European economic sovereignty destroyed",
    status: "partial",
    detail:
      "Nord Stream pipeline destroyed. Germany forced out of Russian energy and Chinese export markets. European military stocks depleted by Ukraine support. Plaza Accords precedent demonstrates US control over 'allied' economies.",
  },
  {
    id: "E12",
    predictionId: "P11",
    label: "Digital control infrastructure being built",
    status: "early-signs",
    detail:
      "CBDCs in development globally. AI surveillance technology advancing. Digital ID systems deployed in multiple countries. The infrastructure for 'the mark of the beast' is being constructed in real time.",
  },
  {
    id: "E13",
    predictionId: "P15",
    label: "Anti-Semitism rising globally",
    status: "partial",
    detail:
      "Anti-Semitic incidents rising sharply since October 2023. Jewish emigration to Israel increasing. Historical pattern: persecution drives aliyah (immigration to Israel).",
  },
  {
    id: "E14",
    predictionId: "P10",
    label: "Netanyahu views America as ultimate rival",
    status: "early-signs",
    detail:
      "Netanyahu reading 'Rome vs. the Jews' \u2014 'we lost it. I think we have to win the next.' Israel's strategic objective is to exhaust America (the new 'Rome') through the Iran war, not to help it win.",
  },
  {
    id: "E15",
    predictionId: "P9",
    label: "Iran FM confident in guerrilla warfare readiness",
    status: "active",
    detail:
      "Foreign Minister Araghchi told NBC: 'We are waiting for them... we have been preparing for about 20 years for this... we are confident that we can confront them and that would be a big disaster for them.'",
  },
  {
    id: "E16",
    predictionId: "P4",
    label: "Escalation ladder not yet at nuclear threshold",
    status: "active",
    detail:
      "Secret weapons and biochemical weapons stages have not been reached. Nuclear use remains far down the escalation ladder. Israel benefits from prolonged war, not quick resolution via nukes.",
  },
];

// ─── Gaps & Falsification ────────────────────────────────────────────────────

const ANALYTICAL_GAPS = [
  {
    id: "G1",
    title: "China's Exit Mechanism Is Missing",
    severity: "critical",
    relatedPredictions: ["P17"],
    gap: "Every other prediction has a 'how it happens.' P17 claims China becomes irrelevant and all four traditions agree \u2014 but the transcripts never specify the mechanism. The Strait of Hormuz cutting 40% of oil is a pressure, not a death blow. China has overland pipelines (Russia, Central Asia), strategic petroleum reserves, and the world's largest domestic manufacturing base.",
    whatWouldFillIt: "A specific causal chain: what event or sequence removes China from global significance within the 2-10 year timeframe? Economic collapse? Internal revolution? Taiwan conflict? The framework needs this or P17 is half-unfounded.",
    falsification: "If China navigates the Strait of Hormuz closure without existential crisis \u2014 through pipeline diversification, reserves, or diplomatic resolution \u2014 the 'both superpowers fall' thesis loses its symmetry.",
  },
  {
    id: "G2",
    title: "Four Cosmologies Claimed, Eight Promised",
    severity: "structural",
    relatedPredictions: [],
    gap: "The lecturer lists eight eschatologies (Zoroastrian, Jewish, Christian Zionist, Freemason, Sunni, Shia, Catholic, Russian Orthodox) but only four are developed with doctrines and geopolitical predictions. Freemasonry is described as 'working within Christian Zionism' without independent beliefs. Catholic eschatology gets only a passing reference to St. Augustine. Zoroastrianism is referenced as Iran's strategic DNA but never laid out. Sunni and Shia are collapsed into a single 'Islamic' category.",
    whatWouldFillIt: "Independent doctrinal analysis for each of the missing four traditions. Do they produce different convergence points? Do Sunni and Shia eschatologies actually agree, or does their disagreement create a gap the model ignores?",
    falsification: "If the missing traditions produce convergence points that contradict the existing four \u2014 e.g., if Catholic eschatology doesn't require American collapse, or if Sunni eschatology opposes Iranian rise \u2014 the convergence model weakens.",
  },
  {
    id: "G3",
    title: "Al-Aqsa to Gog & Magog Skips Several Steps",
    severity: "major",
    relatedPredictions: ["P5", "P16"],
    gap: "The causal claim: mosque destroyed \u2192 2 billion Muslims obligated to war \u2192 Gog and Magog. But the mechanism for how 2 billion people across 50 countries with no unified command structure actually organise into a military coalition is never explained. The Rise of Persia (P9) is supposed to provide leadership, but P9 depends on Iran winning a war that hasn't escalated to ground troops yet.",
    whatWouldFillIt: "A theory of Muslim military unification. What institution or leader coordinates this? How does religious obligation translate into military capability? The OIC has never achieved this. Neither has any pan-Islamic movement in modern history.",
    falsification: "If Al-Aqsa were destroyed and the Muslim world responded with diplomatic outrage rather than unified military action \u2014 as it has to every previous provocation including Gaza \u2014 the causal chain breaks.",
  },
  {
    id: "G4",
    title: "CENTCOM Transfer Has No Mechanism",
    severity: "major",
    relatedPredictions: ["P3", "P10"],
    gap: "P3 claims CENTCOM 'transfers to Israel' after the US loses. But why would a defeated, collapsing America hand its military command infrastructure to Israel? Historical precedent: withdrawing empires destroy or evacuate bases, they don't donate them. The British didn't hand the Suez Canal zone to Israel. The Soviets didn't hand Afghan bases to the mujahideen.",
    whatWouldFillIt: "A specific mechanism: does Israel seize the bases? Does the US negotiate a handover? Is it a gradual absorption? The prediction needs a 'how,' not just a 'what.'",
    falsification: "If the US withdraws from the Middle East and either destroys its infrastructure or transfers it to a different regional partner (Saudi Arabia, for instance), the prediction fails.",
  },
  {
    id: "G5",
    title: "Israel Benefits in Every Scenario (Unfalsifiable)",
    severity: "structural",
    relatedPredictions: ["P10", "P11"],
    gap: "If the US wins \u2192 Israel benefits (Iran destroyed). If the US loses \u2192 Israel benefits (becomes sole hegemon). If the war drags on \u2192 Israel benefits (everyone else weakened). There is no scenario presented where Israel does not benefit. Netanyahu reading a book about Rome is suggestive but not evidence of strategic intent. An analytical framework that cannot identify a failure condition for a key actor is unfalsifiable.",
    whatWouldFillIt: "A scenario where Israel's strategy backfires. What if the US pulls support entirely? What if Pax Judaica's surveillance infrastructure is rejected domestically? What if the Third Temple provokes nuclear retaliation from Pakistan?",
    falsification: "If Israel suffers strategic defeat \u2014 territorial loss, regime change, economic collapse, or failure to build the Temple \u2014 the model's central thesis breaks.",
  },
  {
    id: "G6",
    title: "Anti-Semitism Feedback Loop Is Circular",
    severity: "moderate",
    relatedPredictions: ["P15", "P10"],
    gap: "Anti-Semitism rises \u2192 Jews return to Israel \u2192 Greater Israel populated. But Greater Israel's actions cause more anti-Semitism \u2192 more return. This is presented as both a prediction and a desired outcome, making it impossible to evaluate independently. If anti-Semitism rises, the prediction is confirmed. If it doesn't, the model has no contingency.",
    whatWouldFillIt: "Quantitative thresholds. What level of anti-Semitism triggers mass aliyah vs. what is absorbed by diaspora communities? Historical data shows most Jews stayed put even during the 1930s until it was too late. Voluntary emigration requires more than hostility \u2014 it requires fear of imminent violence.",
    falsification: "If anti-Semitism rises but diaspora Jews choose to stay (as American Jews largely have since October 2023), the ingathering prophecy stalls and Greater Israel's population base doesn't materialise.",
  },
  {
    id: "G7",
    title: "Iran's 20-Year Preparation vs. Immediate Naval Loss",
    severity: "moderate",
    relatedPredictions: ["P1", "P9"],
    gap: "Araghchi's claim that Iran has prepared for 20 years is treated as evidence of readiness. But Iran's navy was destroyed almost immediately (the transcripts acknowledge this). A country that prepared for 20 years but lost its entire navy in days has significant preparation gaps the model doesn't interrogate. Was the preparation only for land warfare? If so, how does Iran project power across the strait without a navy?",
    whatWouldFillIt: "An honest assessment of what Iran prepared for vs. what it didn't. If the preparation was exclusively guerrilla land defence, then Iran's offensive capability (especially maritime) is much weaker than presented.",
    falsification: "If Iran cannot maintain Strait of Hormuz closure without a navy \u2014 if the US reopens it \u2014 then P6 (GCC collapse), P9 (rise of Persia), and P17 (US irrelevance via economic collapse) all weaken significantly.",
  },
  {
    id: "G8",
    title: "Germany/Japan as Future Empires Lacks Timeline",
    severity: "minor",
    relatedPredictions: ["P13"],
    gap: "The asabiyyah framework (defeated, marginalised peoples with high cohesion become future empires) is applied to Germany and Japan. But this is a centuries-long historical pattern. The Qin dynasty example took hundreds of years. There is no mechanism for how Germany goes from a deindustrialised vassal state to an empire within any actionable timeframe.",
    whatWouldFillIt: "Either a much longer timeline (50-100 years) or a specific catalyst that accelerates the process. Does NATO's collapse free Germany to rearm? Does energy independence via renewables restore sovereignty?",
    falsification: "Not falsifiable within the 2-10 year prediction window. This is better understood as a long-range hypothesis than a prediction.",
  },
  {
    id: "G9",
    title: "Evidence Tracker Has Selection Bias",
    severity: "structural",
    relatedPredictions: [],
    gap: "The evidence tracker contains 16 items, almost all coded 'active' or 'partial.' This is because the source material only cites confirming evidence. There is no counter-evidence tracked. A genuine analytical framework must ask: what would disprove each prediction? The lecturer provides one falsification criterion (P5 \u2014 'if they do not destroy the mosque, ignore me for the rest of my life'). The other 16 predictions have no stated falsification conditions.",
    whatWouldFillIt: "Each prediction needs a falsification criterion \u2014 a specific, observable event that would disprove it. Without this, the framework is advocacy, not analysis.",
    falsification: "This gap is meta-structural. The framework itself needs to be falsifiable to function as an analytical tool rather than a belief system.",
  },
  {
    id: "G10",
    title: "Epstein Network Doesn't Map to Predictions",
    severity: "moderate",
    relatedPredictions: [],
    gap: "The Epstein files material provides evidence of transnational elite networks connecting intelligence, crime, finance, and religion. But these connections don't map mechanistically onto specific predictions. Kushner knowing Putin, Epstein knowing Dershowitz, Drokova connecting Silicon Valley to the Kremlin \u2014 these are adjacencies, not causal mechanisms. 'Powerful people know each other' is not evidence of coordinated eschatological execution.",
    whatWouldFillIt: "Specific evidence of eschatological planning within the Epstein network. Did Epstein fund Temple Mount organisations? Did the network coordinate military policy? Without this, the Epstein material is atmospheric, not structural.",
    falsification: "If the Epstein network is better explained by ordinary elite corruption (sex trafficking, financial fraud, intelligence leverage) than by eschatological coordination, then its inclusion in the model is a category error.",
  },
];

const SEVERITY_COLORS = {
  critical: "#e53e3e",
  structural: "#c9a84c",
  major: "#d4a017",
  moderate: "#4c6eb8",
  minor: "#555",
};

const SEVERITY_LABELS = {
  critical: "Critical Gap",
  structural: "Structural Weakness",
  major: "Major Gap",
  moderate: "Moderate Gap",
  minor: "Minor Gap",
};

// ─── Navigation Sections ─────────────────────────────────────────────────────

const SECTIONS = [
  { id: "cosmologies", numeral: "I", label: "Cosmologies" },
  { id: "convergence", numeral: "II", label: "Convergence" },
  { id: "predictions", numeral: "III", label: "Predictions" },
  { id: "constraints", numeral: "IV", label: "Constraints" },
  { id: "state-actors", numeral: "V", label: "States" },
  { id: "individual-actors", numeral: "VI", label: "Actors" },
  { id: "causal-web", numeral: "VII", label: "Causal Web" },
  { id: "timeline", numeral: "VIII", label: "Timeline" },
  { id: "evidence", numeral: "IX", label: "Evidence" },
  { id: "gaps", numeral: "X", label: "Gaps" },
];

// ═══════════════════════════════════════════════════════════════════════════════
// UTILITY COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

function PredictionTag({ id, onClick, small }) {
  const pred = PREDICTIONS.find((p) => p.id === id);
  if (!pred) return null;
  const domainColor = DOMAIN_COLORS[pred.domain] || COLORS.textDim;
  return (
    <span
      onClick={(e) => {
        e.stopPropagation();
        onClick(id);
      }}
      style={{
        fontFamily: FONTS.system,
        fontSize: small ? "9px" : "10px",
        color: domainColor,
        border: `1px solid ${domainColor}44`,
        borderRadius: "3px",
        padding: small ? "1px 5px" : "2px 7px",
        cursor: "pointer",
        transition: "all 0.2s",
        display: "inline-block",
        userSelect: "none",
      }}
      title={pred.title}
    >
      {id}
    </span>
  );
}

function TraditionBadge({ traditionId, small }) {
  const t = TRADITIONS.find((tr) => tr.id === traditionId);
  if (!t) return null;
  return (
    <span
      style={{
        fontFamily: FONTS.system,
        fontSize: small ? "8px" : "9px",
        color: t.color,
        border: `1px solid ${t.color}44`,
        borderRadius: "3px",
        padding: small ? "1px 4px" : "2px 6px",
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        display: "inline-block",
      }}
    >
      {t.glyph} {t.label}
    </span>
  );
}

function DomainBadge({ domain }) {
  const color = DOMAIN_COLORS[domain] || COLORS.textDim;
  return (
    <span
      style={{
        fontFamily: FONTS.system,
        fontSize: "9px",
        color: color,
        border: `1px solid ${color}33`,
        background: `${color}0a`,
        borderRadius: "3px",
        padding: "2px 7px",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
      }}
    >
      {domain}
    </span>
  );
}

function StatusDot({ status }) {
  const color = STATUS_COLORS[status] || COLORS.textDim;
  const isActive = status === "active";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
      <span
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: color,
          display: "inline-block",
          animation: isActive ? "pulse 2s ease-in-out infinite" : "none",
          boxShadow: isActive ? `0 0 8px ${color}` : "none",
        }}
      />
      <span
        style={{
          fontFamily: FONTS.system,
          fontSize: "9px",
          color: color,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        {STATUS_LABELS[status]}
      </span>
    </span>
  );
}

function SectionLabel({ children }) {
  return (
    <div
      style={{
        fontFamily: FONTS.system,
        fontSize: "10px",
        color: COLORS.textDim,
        textTransform: "uppercase",
        letterSpacing: "0.14em",
        marginBottom: "10px",
        fontWeight: 700,
      }}
    >
      {children}
    </div>
  );
}

function ChamberHeader({ numeral, title, subtitle }) {
  return (
    <div style={{ marginBottom: "32px", paddingTop: "20px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "14px",
          marginBottom: "8px",
        }}
      >
        <span
          style={{
            fontFamily: FONTS.system,
            fontSize: "11px",
            color: COLORS.textDim,
            letterSpacing: "0.15em",
          }}
        >
          {numeral}
        </span>
        <h2
          style={{
            fontFamily: FONTS.prose,
            fontSize: "clamp(22px, 4vw, 32px)",
            fontWeight: 700,
            color: COLORS.text,
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          {title}
        </h2>
      </div>
      {subtitle && (
        <p
          style={{
            fontFamily: FONTS.system,
            fontSize: "10px",
            color: COLORS.textDim,
            letterSpacing: "0.08em",
            lineHeight: 1.6,
            margin: 0,
            maxWidth: "700px",
          }}
        >
          {subtitle}
        </p>
      )}
      <div
        style={{
          width: "100%",
          height: "1px",
          background: `linear-gradient(90deg, ${COLORS.border}, transparent)`,
          marginTop: "16px",
        }}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CHAMBER COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

// ─── I. Cosmologies ──────────────────────────────────────────────────────────

function CosmologyCard({ tradition, isExpanded, onToggle }) {
  const t = tradition;
  return (
    <div
      onClick={onToggle}
      style={{
        border: `1px solid ${isExpanded ? t.color + "66" : COLORS.border}`,
        borderLeft: `3px solid ${t.color}`,
        background: isExpanded ? `${t.color}08` : COLORS.surface,
        borderRadius: "6px",
        padding: "18px 20px",
        cursor: "pointer",
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "22px" }}>{t.glyph}</span>
          <div>
            <div
              style={{
                fontFamily: FONTS.prose,
                fontSize: "18px",
                fontWeight: 700,
                color: isExpanded ? t.color : COLORS.text,
                transition: "color 0.3s",
              }}
            >
              {t.label}
            </div>
            <div
              style={{
                fontFamily: FONTS.system,
                fontSize: "10px",
                color: t.color,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                opacity: 0.7,
              }}
            >
              {t.core}
            </div>
          </div>
        </div>
        <span
          style={{
            fontFamily: FONTS.system,
            fontSize: "14px",
            color: COLORS.textDim,
            transition: "transform 0.3s",
            transform: isExpanded ? "rotate(90deg)" : "rotate(0)",
          }}
        >
          \u25B8
        </span>
      </div>

      {isExpanded && (
        <div
          style={{
            marginTop: "20px",
            paddingTop: "16px",
            borderTop: `1px solid ${t.color}22`,
            animation: "fadeIn 0.25s ease",
          }}
        >
          <p
            style={{
              fontFamily: FONTS.prose,
              fontSize: "14px",
              color: COLORS.textMuted,
              lineHeight: 1.7,
              fontStyle: "italic",
              margin: "0 0 20px 0",
            }}
          >
            {t.keyDoctrine}
          </p>

          <SectionLabel>Core Beliefs</SectionLabel>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              marginBottom: "24px",
            }}
          >
            {t.beliefs.map((b, i) => (
              <div key={i}>
                <div
                  style={{
                    fontFamily: FONTS.prose,
                    fontSize: "15px",
                    fontWeight: 700,
                    color: COLORS.text,
                    marginBottom: "4px",
                  }}
                >
                  {b.title}
                </div>
                <div
                  style={{
                    fontFamily: FONTS.prose,
                    fontSize: "13px",
                    color: COLORS.textMuted,
                    lineHeight: 1.65,
                  }}
                >
                  {b.desc}
                </div>
              </div>
            ))}
          </div>

          <SectionLabel>Geopolitical Outcomes</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {t.geoPredictions.map((p, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                }}
              >
                <span
                  style={{
                    fontFamily: FONTS.system,
                    fontSize: "11px",
                    color: t.color,
                    opacity: 0.5,
                    marginTop: "2px",
                  }}
                >
                  \u2192
                </span>
                <span
                  style={{
                    fontFamily: FONTS.prose,
                    fontSize: "13px",
                    color: "#bbb",
                    lineHeight: 1.5,
                  }}
                >
                  {p}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── II. Convergence ─────────────────────────────────────────────────────────

function ConvergenceCard({ point, isExpanded, onToggle }) {
  const traditions = point.traditions.map((tid) =>
    TRADITIONS.find((t) => t.id === tid)
  );
  return (
    <div
      onClick={onToggle}
      style={{
        border: `1px solid ${isExpanded ? COLORS.borderActive : COLORS.border}`,
        borderRadius: "6px",
        padding: "16px 20px",
        background: isExpanded ? COLORS.surfaceHover : COLORS.surface,
        cursor: "pointer",
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            flex: 1,
          }}
        >
          <div style={{ display: "flex", gap: "3px", flexShrink: 0 }}>
            {traditions.map((t, i) => (
              <div
                key={i}
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: t.color,
                  boxShadow: `0 0 4px ${t.color}44`,
                }}
              />
            ))}
          </div>
          <span
            style={{
              fontFamily: FONTS.prose,
              fontSize: "16px",
              fontWeight: 600,
              color: COLORS.text,
            }}
          >
            {point.title}
          </span>
          <span
            style={{
              fontFamily: FONTS.system,
              fontSize: "9px",
              color: COLORS.textDim,
              border: `1px solid ${COLORS.border}`,
              borderRadius: "3px",
              padding: "1px 5px",
            }}
          >
            {point.strength}/4
          </span>
        </div>
        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
          {traditions.map((t) => (
            <TraditionBadge key={t.id} traditionId={t.id} small />
          ))}
        </div>
      </div>
      {isExpanded && (
        <div
          style={{
            marginTop: "14px",
            paddingTop: "14px",
            borderTop: `1px solid ${COLORS.border}`,
            animation: "fadeIn 0.25s ease",
          }}
        >
          <p
            style={{
              fontFamily: FONTS.prose,
              fontSize: "14px",
              color: COLORS.textMuted,
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {point.desc}
          </p>
        </div>
      )}
    </div>
  );
}

// ─── III. Predictions ────────────────────────────────────────────────────────

function PredictionCard({ pred, isExpanded, onToggle, onPredictionClick }) {
  return (
    <div
      id={`pred-${pred.id}`}
      onClick={onToggle}
      style={{
        border: `1px solid ${isExpanded ? DOMAIN_COLORS[pred.domain] + "55" : COLORS.border}`,
        borderLeft: `3px solid ${DOMAIN_COLORS[pred.domain]}`,
        borderRadius: "6px",
        padding: "16px 20px",
        background: isExpanded ? `${DOMAIN_COLORS[pred.domain]}06` : COLORS.surface,
        cursor: "pointer",
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flex: 1,
          }}
        >
          <span
            style={{
              fontFamily: FONTS.system,
              fontSize: "11px",
              color: DOMAIN_COLORS[pred.domain],
              fontWeight: 700,
              minWidth: "28px",
            }}
          >
            {pred.id}
          </span>
          <span
            style={{
              fontFamily: FONTS.prose,
              fontSize: "16px",
              fontWeight: 600,
              color: COLORS.text,
              lineHeight: 1.3,
            }}
          >
            {pred.title}
          </span>
        </div>
        <div style={{ display: "flex", gap: "6px", alignItems: "center", flexWrap: "wrap" }}>
          <DomainBadge domain={pred.domain} />
          <StatusDot status={pred.status} />
        </div>
      </div>

      {isExpanded && (
        <div
          style={{
            marginTop: "16px",
            paddingTop: "16px",
            borderTop: `1px solid ${COLORS.border}`,
            animation: "fadeIn 0.25s ease",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ marginBottom: "20px" }}>
            <SectionLabel>What Happens</SectionLabel>
            <p
              style={{
                fontFamily: FONTS.prose,
                fontSize: "14px",
                color: COLORS.text,
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {pred.whatHappens}
            </p>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <SectionLabel>How It Happens</SectionLabel>
            <p
              style={{
                fontFamily: FONTS.prose,
                fontSize: "13px",
                color: COLORS.textMuted,
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {pred.howItHappens}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              marginBottom: "16px",
            }}
          >
            <div>
              <SectionLabel>Traditions</SectionLabel>
              <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                {pred.traditions.map((tid) => (
                  <TraditionBadge key={tid} traditionId={tid} />
                ))}
              </div>
            </div>

            {pred.feedsInto.length > 0 && (
              <div>
                <SectionLabel>Feeds Into</SectionLabel>
                <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                  {pred.feedsInto.map((pid) => (
                    <PredictionTag
                      key={pid}
                      id={pid}
                      onClick={onPredictionClick}
                    />
                  ))}
                </div>
              </div>
            )}

            {pred.fedBy.length > 0 && (
              <div>
                <SectionLabel>Fed By</SectionLabel>
                <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                  {pred.fedBy.map((pid) => (
                    <PredictionTag
                      key={pid}
                      id={pid}
                      onClick={onPredictionClick}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {pred.evidence.length > 0 && (
            <div>
              <SectionLabel>Evidence</SectionLabel>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                {pred.evidence.map((ev, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: FONTS.system,
                        fontSize: "10px",
                        color: COLORS.textDim,
                        marginTop: "3px",
                      }}
                    >
                      \u25AA
                    </span>
                    <span
                      style={{
                        fontFamily: FONTS.prose,
                        fontSize: "13px",
                        color: COLORS.textMuted,
                        lineHeight: 1.5,
                      }}
                    >
                      {ev}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── IV. Constraints ─────────────────────────────────────────────────────────

function ConstraintCard({ constraint, isExpanded, onToggle, onPredictionClick }) {
  return (
    <div
      onClick={onToggle}
      style={{
        border: `1px solid ${isExpanded ? COLORS.borderActive : COLORS.border}`,
        borderRadius: "6px",
        padding: "14px 18px",
        background: isExpanded ? COLORS.surfaceHover : COLORS.surface,
        cursor: "pointer",
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              fontFamily: FONTS.system,
              fontSize: "10px",
              color: COLORS.crimson,
              fontWeight: 700,
            }}
          >
            {constraint.id}
          </span>
          <span
            style={{
              fontFamily: FONTS.prose,
              fontSize: "15px",
              fontWeight: 600,
              color: COLORS.text,
            }}
          >
            {constraint.title}
          </span>
        </div>
        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
          {constraint.relatedPredictions.map((pid) => (
            <PredictionTag
              key={pid}
              id={pid}
              onClick={onPredictionClick}
              small
            />
          ))}
        </div>
      </div>
      {isExpanded && (
        <div
          style={{
            marginTop: "12px",
            paddingTop: "12px",
            borderTop: `1px solid ${COLORS.border}`,
            animation: "fadeIn 0.25s ease",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <p
            style={{
              fontFamily: FONTS.prose,
              fontSize: "13px",
              color: COLORS.textMuted,
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {constraint.desc}
          </p>
        </div>
      )}
    </div>
  );
}

// ─── V. State Actors ─────────────────────────────────────────────────────────

function StateActorCard({ actor, isExpanded, onToggle, onPredictionClick }) {
  return (
    <div
      onClick={onToggle}
      style={{
        border: `1px solid ${isExpanded ? COLORS.borderActive : COLORS.border}`,
        borderRadius: "6px",
        padding: "16px 20px",
        background: isExpanded ? COLORS.surfaceHover : COLORS.surface,
        cursor: "pointer",
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "18px" }}>{actor.flag}</span>
          <div>
            <span
              style={{
                fontFamily: FONTS.prose,
                fontSize: "16px",
                fontWeight: 700,
                color: COLORS.text,
              }}
            >
              {actor.name}
            </span>
            <div
              style={{
                fontFamily: FONTS.system,
                fontSize: "9px",
                color: COLORS.textDim,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {actor.role}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
          {actor.traditions.map((tid) => (
            <TraditionBadge key={tid} traditionId={tid} small />
          ))}
        </div>
      </div>

      {isExpanded && (
        <div
          style={{
            marginTop: "14px",
            paddingTop: "14px",
            borderTop: `1px solid ${COLORS.border}`,
            animation: "fadeIn 0.25s ease",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <p
            style={{
              fontFamily: FONTS.prose,
              fontSize: "13px",
              color: COLORS.textMuted,
              lineHeight: 1.7,
              margin: "0 0 14px 0",
            }}
          >
            {actor.desc}
          </p>
          <SectionLabel>Connected Predictions</SectionLabel>
          <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
            {actor.predictions.map((pid) => (
              <PredictionTag key={pid} id={pid} onClick={onPredictionClick} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── VI. Individual Actors ───────────────────────────────────────────────────

function ActorPortrait({ actor, isExpanded, onToggle }) {
  const tradition = TRADITIONS.find((t) => t.id === actor.tradition);
  const accentColor = tradition ? tradition.color : COLORS.textDim;
  return (
    <div
      onClick={onToggle}
      style={{
        border: `1px solid ${isExpanded ? accentColor + "44" : COLORS.border}`,
        borderRadius: "6px",
        padding: "16px 18px",
        background: isExpanded ? `${accentColor}06` : COLORS.surface,
        cursor: "pointer",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: `${accentColor}18`,
            border: `2px solid ${accentColor}44`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: FONTS.system,
              fontSize: "14px",
              fontWeight: 700,
              color: accentColor,
            }}
          >
            {actor.initials}
          </span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: FONTS.prose,
              fontSize: "15px",
              fontWeight: 700,
              color: COLORS.text,
              lineHeight: 1.2,
            }}
          >
            {actor.name}
          </div>
          <div
            style={{
              fontFamily: FONTS.system,
              fontSize: "9px",
              color: COLORS.textDim,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginTop: "2px",
            }}
          >
            {actor.role}
          </div>
        </div>
        {tradition && <TraditionBadge traditionId={tradition.id} small />}
      </div>

      {isExpanded && (
        <div
          style={{
            marginTop: "14px",
            paddingTop: "14px",
            borderTop: `1px solid ${COLORS.border}`,
            animation: "fadeIn 0.25s ease",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <p
            style={{
              fontFamily: FONTS.prose,
              fontSize: "13px",
              color: COLORS.textMuted,
              lineHeight: 1.7,
              margin: "0 0 14px 0",
            }}
          >
            {actor.significance}
          </p>

          {(actor.connections.actors.length > 0 ||
            actor.connections.states.length > 0) && (
            <div>
              <SectionLabel>Connections</SectionLabel>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "6px",
                }}
              >
                {actor.connections.actors.map((aid) => {
                  const a = INDIVIDUAL_ACTORS.find((ia) => ia.id === aid);
                  if (!a) return null;
                  const aTrad = TRADITIONS.find((t) => t.id === a.tradition);
                  const aColor = aTrad ? aTrad.color : COLORS.textDim;
                  return (
                    <span
                      key={aid}
                      style={{
                        fontFamily: FONTS.system,
                        fontSize: "9px",
                        color: aColor,
                        border: `1px solid ${aColor}33`,
                        borderRadius: "3px",
                        padding: "2px 6px",
                      }}
                    >
                      {a.initials} {a.name.split(" ").pop()}
                    </span>
                  );
                })}
                {actor.connections.states.map((sid) => {
                  const s = STATE_ACTORS.find((sa) => sa.id === sid);
                  if (!s) return null;
                  return (
                    <span
                      key={sid}
                      style={{
                        fontFamily: FONTS.system,
                        fontSize: "9px",
                        color: COLORS.textMuted,
                        border: `1px solid ${COLORS.border}`,
                        borderRadius: "3px",
                        padding: "2px 6px",
                      }}
                    >
                      {s.flag} {s.name}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── VII. Causal Web ─────────────────────────────────────────────────────────

function CausalWebSection({ onPredictionClick }) {
  return (
    <div>
      <SectionLabel>Directed Links</SectionLabel>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          marginBottom: "28px",
        }}
      >
        {CAUSAL_LINKS.map((link, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 10px",
              background: COLORS.surface,
              borderRadius: "4px",
              border: `1px solid ${COLORS.border}`,
            }}
          >
            <PredictionTag id={link.from} onClick={onPredictionClick} />
            <span
              style={{
                fontFamily: FONTS.system,
                fontSize: "10px",
                color: COLORS.textDim,
              }}
            >
              \u2192
            </span>
            <PredictionTag id={link.to} onClick={onPredictionClick} />
            <span
              style={{
                fontFamily: FONTS.prose,
                fontSize: "12px",
                color: COLORS.textMuted,
                flex: 1,
                marginLeft: "6px",
              }}
            >
              {link.label}
            </span>
          </div>
        ))}
      </div>

      <SectionLabel>Feedback Loops</SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {FEEDBACK_LOOPS.map((loop) => (
          <div
            key={loop.id}
            style={{
              border: `1px solid ${COLORS.crimson}33`,
              borderRadius: "6px",
              padding: "16px 18px",
              background: `${COLORS.crimson}06`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "10px",
              }}
            >
              <span
                style={{
                  fontFamily: FONTS.system,
                  fontSize: "10px",
                  color: COLORS.crimson,
                  fontWeight: 700,
                }}
              >
                {loop.id}
              </span>
              <span
                style={{
                  fontFamily: FONTS.prose,
                  fontSize: "16px",
                  fontWeight: 700,
                  color: COLORS.text,
                }}
              >
                {loop.name}
              </span>
              <span
                style={{
                  fontFamily: FONTS.system,
                  fontSize: "14px",
                  color: COLORS.crimson,
                  opacity: 0.5,
                }}
              >
                \u21BB
              </span>
            </div>
            <p
              style={{
                fontFamily: FONTS.prose,
                fontSize: "13px",
                color: COLORS.textMuted,
                lineHeight: 1.7,
                margin: "0 0 10px 0",
              }}
            >
              {loop.desc}
            </p>
            <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
              {loop.predictions.map((pid, i) => (
                <span key={pid} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <PredictionTag id={pid} onClick={onPredictionClick} />
                  {i < loop.predictions.length - 1 && (
                    <span
                      style={{
                        fontFamily: FONTS.system,
                        fontSize: "10px",
                        color: COLORS.textDim,
                      }}
                    >
                      \u2192
                    </span>
                  )}
                </span>
              ))}
              <span
                style={{
                  fontFamily: FONTS.system,
                  fontSize: "10px",
                  color: COLORS.crimson,
                  opacity: 0.5,
                }}
              >
                \u21BB
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── VIII. Timeline ──────────────────────────────────────────────────────────

function TimelineSection({ onPredictionClick }) {
  return (
    <div style={{ position: "relative", paddingLeft: "32px" }}>
      <div
        style={{
          position: "absolute",
          left: "11px",
          top: 0,
          bottom: 0,
          width: "2px",
          background: `linear-gradient(to bottom, ${COLORS.textDim}, ${COLORS.gold}, ${COLORS.crimson}, ${COLORS.purple})`,
        }}
      />

      {TIMELINE_PHASES.map((phase) => (
        <div key={phase.id} style={{ marginBottom: "36px", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: "-28px",
              top: "4px",
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              background: COLORS.bg,
              border: `2px solid ${phase.color}`,
              zIndex: 1,
            }}
          />
          <div style={{ marginBottom: "14px" }}>
            <div
              style={{
                fontFamily: FONTS.prose,
                fontSize: "18px",
                fontWeight: 700,
                color: phase.color,
                marginBottom: "2px",
              }}
            >
              {phase.label}
            </div>
            <div
              style={{
                fontFamily: FONTS.system,
                fontSize: "10px",
                color: COLORS.textDim,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              {phase.timeframe}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {phase.events.map((ev, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px 12px",
                  background: COLORS.surface,
                  borderRadius: "4px",
                  border: `1px solid ${COLORS.border}`,
                }}
              >
                <div
                  style={{
                    position: "relative",
                    left: "-40px",
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: phase.color,
                    flexShrink: 0,
                    marginRight: "-34px",
                  }}
                />
                <PredictionTag
                  id={ev.predictionId}
                  onClick={onPredictionClick}
                  small
                />
                <span
                  style={{
                    fontFamily: FONTS.prose,
                    fontSize: "13px",
                    color: COLORS.text,
                    flex: 1,
                  }}
                >
                  {ev.label}
                </span>
                <span
                  style={{
                    fontFamily: FONTS.system,
                    fontSize: "9px",
                    color: COLORS.textDim,
                    flexShrink: 0,
                  }}
                >
                  {ev.timeframe}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── IX. Evidence ────────────────────────────────────────────────────────────

function EvidenceRow({ item, onPredictionClick }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        padding: "12px 16px",
        background: COLORS.surface,
        borderRadius: "4px",
        border: `1px solid ${COLORS.border}`,
      }}
    >
      <div style={{ paddingTop: "2px", flexShrink: 0 }}>
        <StatusDot status={item.status} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "4px",
            flexWrap: "wrap",
          }}
        >
          <PredictionTag
            id={item.predictionId}
            onClick={onPredictionClick}
            small
          />
          <span
            style={{
              fontFamily: FONTS.prose,
              fontSize: "14px",
              fontWeight: 600,
              color: COLORS.text,
            }}
          >
            {item.label}
          </span>
        </div>
        <p
          style={{
            fontFamily: FONTS.prose,
            fontSize: "12px",
            color: COLORS.textMuted,
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {item.detail}
        </p>
      </div>
    </div>
  );
}

// ─── X. Gaps & Falsification ─────────────────────────────────────────────────

function GapCard({ gap, isExpanded, onToggle, onPredictionClick }) {
  const sevColor = SEVERITY_COLORS[gap.severity] || COLORS.textDim;
  return (
    <div
      onClick={onToggle}
      style={{
        border: `1px solid ${isExpanded ? sevColor + "55" : COLORS.border}`,
        borderLeft: `3px solid ${sevColor}`,
        borderRadius: "6px",
        padding: "16px 20px",
        background: isExpanded ? `${sevColor}06` : COLORS.surface,
        cursor: "pointer",
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
          <span
            style={{
              fontFamily: FONTS.system,
              fontSize: "10px",
              color: sevColor,
              fontWeight: 700,
            }}
          >
            {gap.id}
          </span>
          <span
            style={{
              fontFamily: FONTS.prose,
              fontSize: "16px",
              fontWeight: 600,
              color: COLORS.text,
              lineHeight: 1.3,
            }}
          >
            {gap.title}
          </span>
        </div>
        <div style={{ display: "flex", gap: "6px", alignItems: "center", flexWrap: "wrap" }}>
          <span
            style={{
              fontFamily: FONTS.system,
              fontSize: "9px",
              color: sevColor,
              border: `1px solid ${sevColor}33`,
              background: `${sevColor}0a`,
              borderRadius: "3px",
              padding: "2px 7px",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {SEVERITY_LABELS[gap.severity]}
          </span>
          {gap.relatedPredictions.map((pid) => (
            <PredictionTag key={pid} id={pid} onClick={onPredictionClick} small />
          ))}
        </div>
      </div>

      {isExpanded && (
        <div
          style={{
            marginTop: "16px",
            paddingTop: "16px",
            borderTop: `1px solid ${COLORS.border}`,
            animation: "fadeIn 0.25s ease",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ marginBottom: "18px" }}>
            <SectionLabel>The Gap</SectionLabel>
            <p
              style={{
                fontFamily: FONTS.prose,
                fontSize: "14px",
                color: COLORS.text,
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {gap.gap}
            </p>
          </div>

          <div style={{ marginBottom: "18px" }}>
            <SectionLabel>What Would Fill It</SectionLabel>
            <p
              style={{
                fontFamily: FONTS.prose,
                fontSize: "13px",
                color: COLORS.textMuted,
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {gap.whatWouldFillIt}
            </p>
          </div>

          <div
            style={{
              background: `${COLORS.crimson}08`,
              border: `1px solid ${COLORS.crimson}22`,
              borderRadius: "4px",
              padding: "12px 14px",
            }}
          >
            <SectionLabel>Falsification Criterion</SectionLabel>
            <p
              style={{
                fontFamily: FONTS.prose,
                fontSize: "13px",
                color: COLORS.crimson,
                lineHeight: 1.7,
                margin: 0,
                fontStyle: "italic",
              }}
            >
              {gap.falsification}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════════════════════════════

function NavRail({ activeSection }) {
  const scrollTo = (sectionId) => {
    const el = document.getElementById(`section-${sectionId}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: `${COLORS.bg}ee`,
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${COLORS.border}`,
        display: "flex",
        justifyContent: "center",
        padding: "0 8px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "0",
          maxWidth: "1100px",
          width: "100%",
          overflowX: "auto",
        }}
      >
        {SECTIONS.map((s) => {
          const isActive = activeSection === s.id;
          return (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              style={{
                background: "none",
                border: "none",
                borderBottom: `2px solid ${isActive ? COLORS.gold : "transparent"}`,
                padding: "10px 10px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                flexShrink: 0,
                transition: "all 0.2s",
              }}
            >
              <span
                style={{
                  fontFamily: FONTS.system,
                  fontSize: "9px",
                  color: isActive ? COLORS.gold : COLORS.textDim,
                  letterSpacing: "0.05em",
                }}
              >
                {s.numeral}
              </span>
              <span
                style={{
                  fontFamily: FONTS.system,
                  fontSize: "10px",
                  color: isActive ? COLORS.text : COLORS.textMuted,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {s.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export default function EschatologicalCathedral() {
  const [activeSection, setActiveSection] = useState("cosmologies");
  const [expandedItems, setExpandedItems] = useState(new Set());

  const toggleItem = useCallback((id) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const scrollToPrediction = useCallback((predId) => {
    setExpandedItems((prev) => new Set(prev).add(predId));
    setTimeout(() => {
      const el = document.getElementById(`pred-${predId}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
  }, []);

  // IntersectionObserver for active section tracking
  useEffect(() => {
    const observers = [];
    SECTIONS.forEach((s) => {
      const el = document.getElementById(`section-${s.id}`);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(s.id);
        },
        { rootMargin: "-20% 0px -70% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.bg,
        color: COLORS.text,
        fontFamily: FONTS.prose,
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=IBM+Plex+Mono:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 4px currentColor; }
          50% { opacity: 0.5; box-shadow: 0 0 12px currentColor; }
        }
        * { box-sizing: border-box; }
        body { margin: 0; background: ${COLORS.bg}; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: ${COLORS.bg}; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.border}; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: ${COLORS.borderActive}; }
      `}</style>

      <NavRail activeSection={activeSection} />

      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: "60px 20px 80px",
        }}
      >
        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: "56px", paddingTop: "20px" }}>
          <h1
            style={{
              fontFamily: FONTS.prose,
              fontSize: "clamp(28px, 5vw, 46px)",
              fontWeight: 800,
              background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.crimson}, ${COLORS.emerald}, ${COLORS.cobalt})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: "0 0 12px 0",
              lineHeight: 1.15,
            }}
          >
            Eschatological Convergence
          </h1>
          <p
            style={{
              fontFamily: FONTS.system,
              fontSize: "11px",
              color: COLORS.textDim,
              letterSpacing: "0.1em",
              lineHeight: 1.7,
              maxWidth: "640px",
              margin: "0 auto 8px",
              textTransform: "uppercase",
            }}
          >
            An Analytical Cathedral
          </p>
          <p
            style={{
              fontFamily: FONTS.prose,
              fontSize: "15px",
              color: COLORS.textMuted,
              lineHeight: 1.7,
              maxWidth: "640px",
              margin: "0 auto",
              fontStyle: "italic",
            }}
          >
            Four religious traditions. Different prophecies. The same predicted outcomes.
            Where the scripts converge, the predictions form. Where the predictions cluster, the future takes shape.
          </p>
        </div>

        {/* ── I. Cosmologies ── */}
        <section id="section-cosmologies" style={{ marginBottom: "56px" }}>
          <ChamberHeader
            numeral="I"
            title="The Cosmologies"
            subtitle="The foundational belief systems from which all predictions flow. Each expandable, each colour-coded, each containing its core doctrines and the geopolitical outcomes those doctrines demand."
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {TRADITIONS.map((t) => (
              <CosmologyCard
                key={t.id}
                tradition={t}
                isExpanded={expandedItems.has(t.id)}
                onToggle={() => toggleItem(t.id)}
              />
            ))}
          </div>
        </section>

        {/* ── II. Convergence ── */}
        <section id="section-convergence" style={{ marginBottom: "56px" }}>
          <ChamberHeader
            numeral="II"
            title="Points of Convergence"
            subtitle="Where cosmologies that disagree on meaning nonetheless agree on outcome. The more traditions that align on a single point, the stronger the prediction."
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {CONVERGENCE_POINTS.map((cp) => (
              <ConvergenceCard
                key={cp.id}
                point={cp}
                isExpanded={expandedItems.has(cp.id)}
                onToggle={() => toggleItem(cp.id)}
              />
            ))}
          </div>
        </section>

        {/* ── III. Predictions ── */}
        <section id="section-predictions" style={{ marginBottom: "56px" }}>
          <ChamberHeader
            numeral="III"
            title="The Predictions"
            subtitle="Numbered, categorised by domain, each expandable into two layers: what happens (the strategic sequence) and how it happens (the mechanism, the data, the geography)."
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {PREDICTIONS.map((pred) => (
              <PredictionCard
                key={pred.id}
                pred={pred}
                isExpanded={expandedItems.has(pred.id)}
                onToggle={() => toggleItem(pred.id)}
                onPredictionClick={scrollToPrediction}
              />
            ))}
          </div>
        </section>

        {/* ── IV. Constraints ── */}
        <section id="section-constraints" style={{ marginBottom: "56px" }}>
          <ChamberHeader
            numeral="IV"
            title="The Constraints"
            subtitle="Factors that narrow the scenario space. Things that will not happen. Asymmetries that shape who blinks first. Escalation paths that widen or close."
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {CONSTRAINTS.map((k) => (
              <ConstraintCard
                key={k.id}
                constraint={k}
                isExpanded={expandedItems.has(k.id)}
                onToggle={() => toggleItem(k.id)}
                onPredictionClick={scrollToPrediction}
              />
            ))}
          </div>
        </section>

        {/* ── V. State Actors ── */}
        <section id="section-state-actors" style={{ marginBottom: "56px" }}>
          <ChamberHeader
            numeral="V"
            title="State Actors"
            subtitle="Nations and institutions, each tagged with the cosmology that drives them and the predictions they connect to. Tap any prediction tag to navigate there."
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "10px",
            }}
          >
            {STATE_ACTORS.map((sa) => (
              <StateActorCard
                key={sa.id}
                actor={sa}
                isExpanded={expandedItems.has(sa.id)}
                onToggle={() => toggleItem(sa.id)}
                onPredictionClick={scrollToPrediction}
              />
            ))}
          </div>
        </section>

        {/* ── VI. Individual Actors ── */}
        <section id="section-individual-actors" style={{ marginBottom: "56px" }}>
          <ChamberHeader
            numeral="VI"
            title="Individual Actors"
            subtitle="Named human beings operating at the intersection of belief and power. Each with their role, their tradition, their significance to the model, and their connections."
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "10px",
            }}
          >
            {INDIVIDUAL_ACTORS.map((ia) => (
              <ActorPortrait
                key={ia.id}
                actor={ia}
                isExpanded={expandedItems.has(ia.id)}
                onToggle={() => toggleItem(ia.id)}
                onPredictionClick={scrollToPrediction}
              />
            ))}
          </div>
        </section>

        {/* ── VII. Causal Web ── */}
        <section id="section-causal-web" style={{ marginBottom: "56px" }}>
          <ChamberHeader
            numeral="VII"
            title="The Causal Web"
            subtitle="Every link between predictions, showing how one feeds into another. Feedback loops identified and named. The system is not linear; it is recursive."
          />
          <CausalWebSection onPredictionClick={scrollToPrediction} />
        </section>

        {/* ── VIII. Timeline ── */}
        <section id="section-timeline" style={{ marginBottom: "56px" }}>
          <ChamberHeader
            numeral="VIII"
            title="The Timeline"
            subtitle="Phased, colour-graded, with each event tagged back to its prediction. A vertical line descending through time, dotted with the moments the model anticipates."
          />
          <TimelineSection onPredictionClick={scrollToPrediction} />
        </section>

        {/* ── IX. Evidence ── */}
        <section id="section-evidence" style={{ marginBottom: "56px" }}>
          <ChamberHeader
            numeral="IX"
            title="Evidence Tracker"
            subtitle="Each prediction matched against observable reality. Colour-coded status: active, partial, early signs, dormant. A pulsing dot for anything in motion right now."
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {EVIDENCE_ITEMS.map((item) => (
              <EvidenceRow
                key={item.id}
                item={item}
                onPredictionClick={scrollToPrediction}
              />
            ))}
          </div>
        </section>

        {/* ── X. Gaps & Falsification ── */}
        <section id="section-gaps" style={{ marginBottom: "56px" }}>
          <ChamberHeader
            numeral="X"
            title="Gaps & Falsification Criteria"
            subtitle="Where the model is thin, circular, or unfalsifiable. Every analytical framework must identify its own weaknesses. These are the places where new data would most change the picture."
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {ANALYTICAL_GAPS.map((gap) => (
              <GapCard
                key={gap.id}
                gap={gap}
                isExpanded={expandedItems.has(gap.id)}
                onToggle={() => toggleItem(gap.id)}
                onPredictionClick={scrollToPrediction}
              />
            ))}
          </div>
        </section>

        {/* ── Footer ── */}
        <div
          style={{
            textAlign: "center",
            borderTop: `1px solid ${COLORS.border}`,
            paddingTop: "28px",
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          <p
            style={{
              fontFamily: FONTS.system,
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: COLORS.textDim,
              marginBottom: "14px",
            }}
          >
            The Framework's Logic
          </p>
          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.7,
              color: COLORS.textMuted,
              fontStyle: "italic",
              marginBottom: "16px",
            }}
          >
            Each tradition tells a different story about <em>why</em> these events happen &mdash;
            but they all agree on <em>what</em> happens. The convergence points become the
            predictions. The disagreements are about meaning, not outcome. Feed it new data.
            It will organise itself.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "6px",
              flexWrap: "wrap",
            }}
          >
            {TRADITIONS.map((t) => (
              <span
                key={t.id}
                style={{
                  fontFamily: FONTS.system,
                  fontSize: "10px",
                  color: t.color,
                  border: `1px solid ${t.color}33`,
                  borderRadius: "4px",
                  padding: "4px 10px",
                  background: `${t.color}0a`,
                }}
              >
                {t.glyph} {t.label}
              </span>
            ))}
          </div>
          <p
            style={{
              fontFamily: FONTS.system,
              fontSize: "9px",
              color: COLORS.textDim,
              marginTop: "20px",
              letterSpacing: "0.08em",
            }}
          >
            The Law of Eschatological Convergence &mdash; Analytical Framework
          </p>
        </div>
      </div>
    </div>
  );
}

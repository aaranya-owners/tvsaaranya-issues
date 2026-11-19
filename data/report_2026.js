/* Narrative content from "Aaranya Residents' Association — Tenure Report & Handover Summary"
   (position as of November 2026). Item numbers match data/tracker_2026.js. */
window.REPORT = {
  title: "Tenure Report & Handover Summary",
  asOf: "November 2026",
  tvsUpdate: "17 November 2026",

  note: [
    "Over our term, the Association raised, tracked and pursued every concern brought to us with TVS, the Panchayat and the facility teams. This report sets out what has been achieved, what remains open, and what the incoming committee needs to carry forward. It is based on our consolidated issue tracker, which records 174 items, TVS responses up to July 2026 and updates reported by TVS on 17 November 2026.",
    "About three in four items are now closed (132 of 174), including several that affected daily safety and comfort. A smaller number are still open, and a few depend on decisions TVS has so far declined. We have written this plainly so residents can see where things stand and the next committee can start on day one."
  ],

  areaCovers: {
    "Community": "Roads, drains, security, OSRs, water, TVS commitments",
    "Clubhouse": "Floor-by-floor defects (pool, gym, restrooms, creche, etc.)",
    "OSR 1": "Sports courts, gym equipment, wiring, fencing",
    "OSR 2": "Paths, bushes, debris, pipeline"
  },

  resolved: [
    { title: "Entrance road relaid", major: true, text: "The main entrance road was relaid. This was a major, high-cost work and was achieved with a lot of difficulty." },
    { title: "Entrance park built", major: true, text: "An entrance park was constructed between Aaranya and Shobha on land that outsiders had been using as a dump yard. This was a major, high-cost work and was achieved with a lot of difficulty." },
    { title: "Outdoor theatre equipment installed", major: true, text: "The outdoor theatre was fully set up with screen, projector, speakers and amplifier. This was a high-cost item." },
    { title: "Pond reconstructed and lit", major: true, text: "The pond was reconstructed and lighting was provided to keep snakes away. One related item is still open: the water line re-route at the pond (item 160)." },
    { title: "Roads, drains and flooding", text: "Amla Street damage repaired; Berry Street relaid; Cherry Street spine road repaired; Berry and Amla Street roads relaid; missing paver blocks, open chamber hazard and debris near the EB station cleared; Shenbaga Street water-logging fixed and its trench connected to the Panchayat drain; concrete waste and water-logging near the entrance arch cleared; water-logging fixed across the community; construction debris removed around the compound wall and from the Udyana Ph1/Ph2 dump; roadside bitumen waste and garden cleanup done; Cherry Street roadside garden damage closed." },
    { title: "Security and boundary", text: "Perimeter wall height corrected; compound wall gaps closed and wall fenced; trespassing in OSR 3 stopped; the Kurinji theft and bombing issue resolved; additional OSR 1 entrance for Phase 2 residents; fire extinguishers installed; missing CCTV marked complete." },
    { title: "Lighting and electrical safety", text: "Street-light dead spots fixed (including OSR 3); exposed live wires, exposed conduit and unsafe wiring at charging stations and light poles rectified; exposed wiring without conduit in OSR 1 fixed." },
    { title: "Snakes and wildlife", text: "Snake-catching activity run in Aaranya (around 15 snakes caught on the same day) and a snake awareness session held for residents with live snakes." },
    { title: "Amenities", text: "Flag post installed; OSR 3 ramp for the physically challenged and paver work done; OSR 3 cleaning and bush clearance done; OSR 2 sitting pod relocated; clubhouse terrace garden cleaned up; villas used as storage cleared; scrap near the security desk removed; permanent staircase and terrace access card provided; kids' amenities interchanged for safety; table-tennis table ownership clarified." },
    { title: "Sports and play areas (OSR 1 and 2)", text: "19 of 22 OSR 1 snags and all 9 OSR 2 snags closed: rusted tennis, cricket, pillar and basketball-post frames, torn nets, dangerously placed steel rebars, mesh around OSR 1, decayed wooden logs in the kids' play area, mats, gym equipment, entry gate, ramp, bushes and debris." },
    { title: "Clubhouse", text: "53 of 55 clubhouse snags closed, including lights, urinal sensors, exhausts, showers, taps, drains and locks in restrooms on every floor; pool shower handles and fence height; the WTP pump; library lights and shades; gym flooring; games-room and play-room tiles; crèche doors, shades, flushes and tiles; terrace walls; grocery and clinic fittings and the sauna." },
    { title: "Water and utilities", text: "Borewell flushing done to address low yield; water treatment plant issues reviewed and closed; STP noise near Shenbaga Street closed." },
    { title: "Property tax", major: true, text: "Coordinated with the Panchayat president to enable property tax for all villas. A reduced rate was negotiated and tax is calculated from the date of possession rather than registration, saving some owners up to two years of tax." }
  ],

  critical: [
    {
      heading: "Lifestyle project heavy vehicle movement",
      tag: "CRITICAL – UNRESOLVED",
      items: [6, 167],
      text: "Heavy construction vehicles from the Lifestyle project continue to use our internal roads, damaging roads and creating safety, noise and dust problems for residents and children. Despite representations to the Panchayat to find an alternate route, and attempts to contact Lifestyle, there has been no result.",
      action: "Next committee to take this up.",
      detail: "Item 167: TVS says the roads are gifted and the Association should take it up with the Panchayat (comment: “Need to push”). Item 6: alternate route, now marked Critical (comment: “Representations given to Panchayat to find an alternate route”)."
    },
    {
      heading: "OSR 3 – handover and amenities audit",
      tag: "NOT YET HANDED OVER – AUDIT REQUIRED",
      items: [156, 159],
      text: "OSR 3 had not been handed over during our tenure. We have asked TVS to install all the amenities promised for OSR 3. TVS has said OSR 3 will be handed over with all amenities, with construction material removed and landscaping rectified, once the Phase 3 villa handovers are completed. Cleaning and bush clearance (item 56) is now marked complete. A fresh water line was also requested for OSR 3, but TVS said no provision exists and is still to confirm feasibility.",
      action: "Next committee to audit OSR 3 and follow up.",
      detail: "The amenities delivered must be audited against what was promised before the Association accepts OSR 3."
    }
  ],

  pendingNote: "Of the 37 items still unresolved, 24 are open, in progress, partially completed or under review and 13 were rejected by TVS. A further 5 need on-site verification. Item numbers follow the updated tracker, which is numbered by priority (Critical, High, Medium, Low) and then by status; items with no priority recorded are treated as Medium.",

  /* Section 5.1 / 5.2 — open, in progress, partial, under review */
  pending: {
    5:   { short: "Soil pile-up & low compound wall", where: "Soil next to the wall is being cleared to restore wall height. Adjacent land soil to be cleared after the remaining 7 Phase 3 villas are handed over; Kurinji, Pungam and Mantharai Street side to follow.", next: "Monitor; re-check wall heights after clearing." },
    6:   { short: "Alternate route for Lifestyle project construction vehicles", where: "Representations given to the Panchayat to find an alternate route, and attempts made to contact Lifestyle, with no result so far. TVS says the roads are gifted and the Association must work with the Panchayat.", next: "Next committee to take up with the Panchayat and Lifestyle." },
    7:   { short: "STP/WTP ventilation (clubhouse basement)", where: "Health and safety concern for maintenance staff. TVS design team is studying feasibility of venting to upper levels; management decision pending.", next: "Obtain written decision and timeline." },
    8:   { short: "Drainage blockage (storm-water drains)", disputed: true, where: "TVS reports complete, but Phase 3 construction can re-clog drains. TVS agreed in the meeting to confirm by email that the stretch from the Aaranya arch to the clubhouse and the Shenbaga Street stretch will be cleaned again before they leave. Email not yet received.", next: "Get the email confirmation from TVS." },
    30:  { short: "Sub-meters for amenities", where: "Needed to split utility costs between Aaranya and Udyana and to draft Federation bye-laws. TVS reviewed feasibility for the clinic, grocery store and OSR area; the tracker now shows this as partially completed.", next: "Confirm which sub-meters are in place; push for the rest." },
    31:  { short: "Clubhouse issues", where: "Tracked through the clubhouse snag list, where 53 of 55 items are now closed. Marked partially completed.", next: "Close the remaining snag items." },
    32:  { short: "Road quality / water stagnation", where: "TVS plan: resurface with sloped concrete only where water logs in Kurinji and Pungam Streets. Association to get consent from affected villa owners and confirm to TVS. Marked partially completed.", next: "Collect owner consent; confirm remaining stretches with TVS." },
    33:  { short: "Solar panel cleaning & restoration", where: "Panels to be cleaned with chemicals and paint stains removed.", next: "Monitor." },
    34:  { short: "Direct borewell water-check taps", where: "Taps being installed on each borewell to diagnose failures quickly.", next: "Monitor." },
    35:  { short: "Clubhouse window blinds (west side)", where: "Not approved / no budget in the June meeting; TVS now says it will review internally.", next: "Follow up for a decision." },
    36:  { short: "CTO renewal & handover to Association", where: "Prerequisite for the community to run independently (STP/WTP consent with PCB). TVS explained the process but has not supplied the required documents. TVS said it will mail if PCB adds any requirement and will bear the cost.", next: "Chase documents; get TVS commitments in writing." },
    37:  { short: "Future development lands", where: "TVS clarified: land between Udyana Ph1 and Ph2 belongs to Panchayat; sales office and project containers on Shenbaga Street belong to TVS with no development plans. Who maintains the bushes there is still to be clarified.", next: "Ask TVS to confirm in writing." },
    38:  { short: "Basketball court – patches / coating gone (OSR 1)", where: "Uneven surface; coating has come off in many areas.", next: "Include in follow-up email." },
    39:  { short: "Basketball area – cracked skirting wall (OSR 1)", where: "Skirting wall has given way and cracked in many places.", next: "Include in follow-up email." },
    157: { short: "Stray dogs & pool safety", disputed: true, where: "TVS reports complete; the tracker shows partially completed. Mesh fencing is not up to standard; TVS agreed to secure and stiffen it.", next: "Re-inspect fencing; raise with TVS." },
    158: { short: "Clubhouse light fittings & electrical junctions", where: "Light fittings are with TVS and will be handed to the Association; remaining work tracked on the snag list.", next: "Collect fittings; review work." },
    159: { short: "OSR 3 material dump", where: "TVS will clear material and landscape OSR 3 once Phase 3 villa handovers are done.", next: "Monitor; audit promised amenities before accepting handover." },
    160: { short: "Man-made pond hazard (snakes)", disputed: true, where: "TVS reports complete, but the water-line / drain re-route is still not done; feasibility for connecting trenches was under check.", next: "Insist on the re-route." },
    161: { short: "Multipurpose hall – tables shaking (clubhouse, 2nd floor)", where: "All tables in the multipurpose hall need to be fixed. No TVS response recorded yet.", next: "Include in follow-up email." },
    162: { short: "Stones not laid evenly (OSR 1)", where: "Uneven stone laying.", next: "Include in follow-up email." },
    163: { short: "Dump behind Kurinji & Mantharai Streets; ground levelling", where: "Dump to be cleared and ground height levelled. Still not done.", next: "Follow-up email." },
    164: { short: "Move garbage yards from Shenbaga Street to the common garbage area", where: "TVS (Siva Reddy) reported on 17 Nov 2026; not yet done.", next: "Follow-up email." },
    173: { short: "Additional seating in OSRs (3 per OSR)", where: "TVS: may be taken up last if budget permits.", next: "Follow up." },
    174: { short: "Drip watering system in OSRs", where: "TVS: may be taken up last if budget permits. No response since.", next: "Follow up." }
  },

  /* Section 5.3 */
  verify: {
    28:  { short: "OSR 1 inspection & defects", check: "TVS says completed; verify on site." },
    29:  { short: "OSR 2 inspection & defects", check: "TVS says completed; verify on site." },
    154: { short: "Open electrical boards (clubhouse)", check: "Boards to be clamped; temporary boards at Amla and Ashoka Street corners to be removed. Verify." },
    155: { short: "Peripheral wall – paint", check: "TVS says completed; verify on site, including the OSR 3 precast compound walls." },
    156: { short: "Fresh water lines in all OSRs", check: "OSR 1 and 2 done. OSR 3 had no provision; TVS to check feasibility. Verify OSR 3." }
  },

  /* Section 5.4 */
  rejectedNote: "For these 13 items TVS says the work is outside its scope or not budgeted, and that the Association may take them up once the asset and maintenance handover is complete. The new committee will need to decide, item by item, whether to accept, self-fund or keep pressing TVS.",
  rejected: {
    9:   { short: "Water TDS (above 800 ppm) & community RO plant", position: "RO declined; TVS committed only to water softness, not TDS (17 Nov 2026).", decision: "Evaluate cost of an RO plant for the community." },
    10:  { short: "Peripheral wall – outer plastering", position: "Not in scope, no budget.", decision: "Budget after handover; escalate if wall deteriorates." },
    40:  { short: "Pond-side entrance security (child drowning prevention)", position: "Not approved, lack of budget.", decision: "Highest safety priority. Fund and install after handover.", safety: true },
    41:  { short: "Relocate security desk/cabin; extra cabin near Phase 2 gate", position: "Not approved; may be discussed internally.", decision: "Decide whether to self-fund." },
    42:  { short: "Aaranya layout and villa map board", position: "Not approved, no budget.", decision: "Low cost; consider self-funding." },
    43:  { short: "Common restrooms & rest area for FM team", position: "TVS to deep-clean the existing restroom container and hand it over; Association to arrange the rest area.", decision: "Confirm the container is cleaned at handover." },
    165: { short: "Reception glass privacy stickers", position: "Not approved, no budget.", decision: "Low cost; self-fund." },
    166: { short: "Community store room", position: "Out of scope; Association to plan later.", decision: "Include in Association plan." },
    167: { short: "Heavy vehicle movement (Lifestyle project)", position: "Roads are gifted; Association to take it up with the Panchayat.", decision: "Continue Panchayat representation (see item 6)." },
    168: { short: "OSR gate retrofit (auto-close gates)", position: "Not in scope.", decision: "Decide on self-funding." },
    169: { short: "TVS canteen clutter", position: "Not in scope.", decision: "Raise again when canteen is removed." },
    170: { short: "Western-side street lights (Paradise Street)", position: "Not in scope.", decision: "Include in budget planning." },
    171: { short: "Gym – shading for all windows (clubhouse, 1st floor)", position: "Marked rejected in the snag list; no response text recorded.", decision: "Combine with the west-side blinds request (item 35)." }
  },

  initiativesNote: "In addition to the concerns resolved, we had planned the following initiatives. Items 1 to 4 could not proceed due to legal issues arising from the delay in the Association's registration. We hope the new committee will take these forward.",
  initiatives: [
    { title: "Maintenance vendor change (Aaranya)", text: "We obtained quotes from 2 to 3 vendors for Aaranya's maintenance but could not change the vendor.", blocked: true },
    { title: "Aaranya creche", text: "We planned to obtain quotes from multiple vendors to run the Aaranya creche on a Minimum Monthly Guarantee (MMG) rental basis, where the vendor pays the Association a fixed minimum rent every month regardless of how their business performs. The contract would be awarded to the H1 vendor — the one quoting the highest amount over and above the MMG — giving the best return for the Association. This could not proceed.", blocked: true },
    { title: "Grocery store and pharmacy", text: "Along with Udyana, we planned to obtain quotes from vendors to run a grocery store and pharmacy on the same MMG basis, with the contract going to the H1 vendor, i.e. the one offering the highest amount over and above the minimum monthly guarantee. This could not proceed.", blocked: true },
    { title: "Federation with Udyana", text: "We planned to form a federation with Udyana to set rules and agree on cost sharing for running the common amenities shared between Aaranya and Udyana. This could not proceed because the registration of both Aaranya and Udyana is pending.", blocked: true },
    { title: "Clubhouse guidelines", text: "Define and implement guidelines for the clubhouse." }
  ],

  firstSteps: [
    { phase: "First 30 days", steps: [
      "Send one consolidated email to TVS listing every item marked open (all items in the pending lists and clubhouse snags where the next step is a follow-up) and ask for dates.",
      "Get TVS commitments in writing: drain re-cleaning before TVS leaves (item 8), CTO renewal documents and PCB requirements (item 36), and the status of the future development lands (item 37).",
      "Verify the 5 items reported complete (28, 29, 154, 155, 156) and the TVS reports of “complete” that we dispute (8, 157, 160)."
    ]},
    { phase: "Within 60 days", steps: [
      "Decide on rejected items. Start with safety: pond-side entrance (40), the peripheral wall (10) and water quality (9). Agree what the Association will fund after handover.",
      "Push the sub-meters (30) to completion because they affect the Federation bye-laws and fair sharing of utility costs with Udyana.",
      "Collect resident consent for the road resurfacing in Kurinji and Pungam Streets (32) and confirm to TVS."
    ]},
    { phase: "Ongoing", steps: [
      "Watch Phase 3 impact: soil pile-up (5), construction vehicle route through the Panchayat (6, 167) and drains (8). OSR 3 material clearance (159) follows the Phase 3 villa handovers.",
      "Audit OSR 3 before accepting it: check every amenity promised for OSR 3 against what has actually been installed, and get gaps rectified by TVS first.",
      "Water quality: TDS is above 800 ppm and TVS declined an RO plant. The Association should get a cost estimate for an RO plant.",
      "Keep the tracker current. Record each TVS reply and the date so claims of completion can be checked.",
      "Once registration is complete, take up the planned initiatives, starting with the Udyana federation, as it sets the cost sharing for common amenities."
    ]}
  ],

  signoff: "We thank all residents for their support and cooperation during our tenure, and we wish the new committee every success.",
  signedBy: "Outgoing Committee, Aaranya Residents' Association"
};

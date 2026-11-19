# TVS Aaranya Villas — Issue Tracker & Handover Report

Live site: https://aaranya-owners.github.io/tvsaaranya-issues/

Static website presenting the consolidated issue tracker (174 items) and the
Tenure Report & Handover Summary (position as of November 2026).

**Ownership:** the website, design and code are the personal intellectual
property of Prabhu Krishnamoorthy (Villa #154). All rights reserved — see
[LICENSE](LICENSE). The content is Aaranya Residents' Association records from
an unregistered tenure.

## Updating the data

```
pip install openpyxl
python3 tools/build_tracker_data.py "Aaranya_Consolidated_Issues_Summary (3).xlsx"
```

This regenerates `data/tracker_2026.js`. Report text lives in `data/report_2026.js`.
The April 2026 site is preserved at `archive-april-2026.html`.

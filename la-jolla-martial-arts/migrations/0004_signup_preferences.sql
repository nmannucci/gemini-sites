-- Keep signup choices as structured values in addition to the registration message.
ALTER TABLE leads ADD COLUMN signup_for TEXT;
ALTER TABLE leads ADD COLUMN class_date TEXT;
ALTER TABLE leads ADD COLUMN saturday_interest TEXT CHECK (saturday_interest IS NULL OR saturday_interest IN ('Yes', 'No'));
-- Recover the explicit Yes/No values already saved by the Zumba signup form.
UPDATE leads SET saturday_interest = CASE
  WHEN instr(message, 'Interested in Saturday: Yes') > 0 THEN 'Yes'
  WHEN instr(message, 'Interested in Saturday: No') > 0 THEN 'No'
END WHERE program = 'zumba' AND saturday_interest IS NULL;

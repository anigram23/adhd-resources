ALTER TABLE static_page_section ADD COLUMN content text NOT NULL DEFAULT '';

DROP TABLE section_block;
DROP SEQUENCE section_block_seq;

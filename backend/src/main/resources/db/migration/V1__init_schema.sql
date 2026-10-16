-- Reference data: integer PKs
CREATE TABLE state (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    CONSTRAINT state_pkey PRIMARY KEY (id),
    CONSTRAINT uk_state_name UNIQUE (name)
);
CREATE SEQUENCE state_seq START WITH 1 INCREMENT BY 50;

CREATE TABLE city (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    state_id integer NOT NULL,
    CONSTRAINT city_pkey PRIMARY KEY (id),
    CONSTRAINT fk_city_state FOREIGN KEY (state_id) REFERENCES state (id)
);
CREATE SEQUENCE city_seq START WITH 1 INCREMENT BY 50;

CREATE TABLE professional_type (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    is_doctor boolean NOT NULL,
    can_diagnose boolean NOT NULL,
    can_prescribe_meds boolean NOT NULL,
    CONSTRAINT professional_type_pkey PRIMARY KEY (id),
    CONSTRAINT uk_professional_type_title UNIQUE (title)
);
CREATE SEQUENCE professional_type_seq START WITH 1 INCREMENT BY 50;

CREATE TABLE ticket_type (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    CONSTRAINT ticket_type_pkey PRIMARY KEY (id),
    CONSTRAINT uk_ticket_type_title UNIQUE (title)
);
CREATE SEQUENCE ticket_type_seq START WITH 1 INCREMENT BY 50;

-- Internal CMS content: integer PKs
CREATE TABLE static_page (
    id uuid NOT NULL,
    slug character varying(255) NOT NULL,
    title character varying(255) NOT NULL,
    is_active boolean NOT NULL DEFAULT false,
    created_at timestamp(6) with time zone,
    updated_at timestamp(6) with time zone,
    CONSTRAINT static_page_pkey PRIMARY KEY (id),
    CONSTRAINT uk_static_page_slug UNIQUE (slug)
);

CREATE TABLE static_page_section (
    id integer NOT NULL,
    static_page_id uuid NOT NULL,
    title character varying(255) NOT NULL,
    order_index integer NOT NULL,
    CONSTRAINT static_page_section_pkey PRIMARY KEY (id),
    CONSTRAINT fk_static_page_section_page FOREIGN KEY (static_page_id) REFERENCES static_page (id)
);
CREATE SEQUENCE static_page_section_seq START WITH 1 INCREMENT BY 50;

CREATE TABLE section_block (
    id integer NOT NULL,
    static_page_section_id integer NOT NULL,
    content text NOT NULL,
    order_index integer NOT NULL,
    CONSTRAINT section_block_pkey PRIMARY KEY (id),
    CONSTRAINT fk_section_block_section FOREIGN KEY (static_page_section_id) REFERENCES static_page_section (id)
);
CREATE SEQUENCE section_block_seq START WITH 1 INCREMENT BY 50;

-- User-facing: UUID PKs
CREATE TABLE reviewer (
    id uuid NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    created_at timestamp(6) with time zone,
    updated_at timestamp(6) with time zone,
    CONSTRAINT reviewer_pkey PRIMARY KEY (id),
    CONSTRAINT uk_reviewer_email UNIQUE (email)
);

CREATE TABLE professional (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    slug character varying(255) NOT NULL,
    professional_type_id integer NOT NULL,
    city_id integer NOT NULL,
    created_at timestamp(6) with time zone,
    updated_at timestamp(6) with time zone,
    CONSTRAINT professional_pkey PRIMARY KEY (id),
    CONSTRAINT uk_professional_slug UNIQUE (slug),
    CONSTRAINT fk_professional_type FOREIGN KEY (professional_type_id) REFERENCES professional_type (id),
    CONSTRAINT fk_professional_city FOREIGN KEY (city_id) REFERENCES city (id)
);

CREATE TABLE review (
    id uuid NOT NULL,
    professional_id uuid NOT NULL,
    reviewer_id uuid,
    does_online_consultations boolean NOT NULL,
    contact_number character varying(10) NOT NULL,
    address character varying(255) NOT NULL,
    consultation_fee integer NOT NULL,
    diagnosis_fee integer,
    content text NOT NULL,
    rating real NOT NULL,
    created_at timestamp(6) with time zone,
    updated_at timestamp(6) with time zone,
    CONSTRAINT review_pkey PRIMARY KEY (id),
    CONSTRAINT fk_review_professional FOREIGN KEY (professional_id) REFERENCES professional (id),
    CONSTRAINT fk_review_reviewer FOREIGN KEY (reviewer_id) REFERENCES reviewer (id)
);

CREATE TABLE ticket (
    id uuid NOT NULL,
    ticket_type_id integer NOT NULL,
    reviewer_id uuid NOT NULL,
    review_id uuid,
    status character varying(255) NOT NULL,
    content text NOT NULL,
    created_at timestamp(6) with time zone,
    updated_at timestamp(6) with time zone,
    CONSTRAINT ticket_pkey PRIMARY KEY (id),
    CONSTRAINT ck_ticket_status CHECK (status IN ('OPEN', 'ONGOING', 'CLOSED')),
    CONSTRAINT fk_ticket_type FOREIGN KEY (ticket_type_id) REFERENCES ticket_type (id),
    CONSTRAINT fk_ticket_reviewer FOREIGN KEY (reviewer_id) REFERENCES reviewer (id),
    CONSTRAINT fk_ticket_review FOREIGN KEY (review_id) REFERENCES review (id)
);

CREATE TABLE admin (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    is_super boolean NOT NULL,
    created_at timestamp(6) with time zone,
    updated_at timestamp(6) with time zone,
    CONSTRAINT admin_pkey PRIMARY KEY (id),
    CONSTRAINT uk_admin_email UNIQUE (email)
);

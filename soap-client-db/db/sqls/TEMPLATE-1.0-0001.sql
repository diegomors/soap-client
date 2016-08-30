CREATE TABLE template."TAB_PESSOA"
   (
       "ID_PESSOA" NUMBER(20,0) NOT NULL ENABLE,
       "NOME" VARCHAR2(255 BYTE) NOT NULL ENABLE,
       "IDADE" NUMBER NOT NULL ENABLE,
       "DATA_CRIACAO" TIMESTAMP (6),
       "DATA_ATUALIZACAO" TIMESTAMP (6),
       CONSTRAINT "PK_TAB_PESSOA" PRIMARY KEY ("ID_PESSOA") using index tablespace tbs_idx_template
    );

CREATE SEQUENCE template."SEQ_TAB_PESSOA" MINVALUE 0 MAXVALUE 9999999999 INCREMENT BY 1 START WITH 1 NOCACHE NOORDER NOCYCLE;
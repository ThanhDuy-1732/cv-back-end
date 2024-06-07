FROM postgres

RUN apt-get update
RUN apt-get install postgis -y

COPY ./db.sql /docker-entrypoint-initdb.d/
create table red(
    id int AUTO_INCREMENT,
    red varchar(100) not null,
    PRIMARY key(id)
) create table municipio(
    id int AUTO_INCREMENT,
    municipio varchar(100) not null,
    red int not null,
    PRIMARY key(id),
    FOREIGN key(red) REFERENCES red(id)
) create table establecimiento(
    id int AUTO_INCREMENT,
    establecimiento varchar(200) not null,
    nivel int not null,
    municipio int not null,
    creado datetime not null,
    modificado datetime null,
    usuario int not null,
    eliminado boolean DEFAULT false,
    PRIMARY key(id),
    FOREIGN key(municipio) REFERENCES municipio(id)
) create table rol(
    id int AUTO_INCREMENT,
    rol varchar(100) not null,
    nivel int not null,
    PRIMARY key(id)
) create table usuario(
    id int AUTO_INCREMENT,
    username varchar(200) not null,
    pass varchar(200) not null,
    nombre varchar(200) not null,
    apellido1 varchar(200) not null,
    apellido2 varchar(200) not null,
    correo varchar(200) not null,
    celular varchar(200) not null,
    direccion varchar(400) not null,
    estado boolean not null,
    codigo text,
    rol int null,
    establecimiento int not null,
    creado datetime not null,
    modificado datetime null,
    usuario int not null,
    eliminado boolean DEFAULT false,
    PRIMARY key(id),
    FOREIGN key(establecimiento) REFERENCES establecimiento(id),
    FOREIGN key(rol) REFERENCES rol(id)
) create table sesion(
    id int AUTO_INCREMENT,
    token text not null,
    usuario int not null,
    PRIMARY key(id),
    FOREIGN key (usuario) REFERENCES usuario(id)
) create table gestion(
    id int AUTO_INCREMENT,
    gestion text not null,
    estado boolean DEFAULT false,
    eliminado boolean DEFAULT false,
    modificado datetime null,
    usuario int not null,
    PRIMARY key(id)
);

create table mes(
    id int AUTO_INCREMENT,
    num int not null,
    mes text not null,
    ini datetime not null,
    fin datetime not null,
    eliminado boolean DEFAULT false,
    modificado datetime null,
    usuario int not null,
    gestion int not null,
    PRIMARY key(id)
);

create table variable(
    id int AUTO_INCREMENT,
    num int not null,
    variable text not null,
    gestion int not null,
    estado int DEFAULT 0,
    creado datetime not null,
    modificado datetime null,
    usuario int not null,
    PRIMARY key(id),
    FOREIGN key(gestion) REFERENCES gestion(id)
) create table indicador(
    id int AUTO_INCREMENT,
    num int not null,
    indicador text not null,
    variable int,
    ini date not null,
    fin date not null,
    estado int DEFAULT 1,
    creado datetime not null,
    modificado datetime null,
    usuario int not null,
    primary key(id),
    FOREIGN key(variable) REFERENCES variable(id)
) create table input(
    id int AUTO_INCREMENT,
    indicador int null,
    idinput int null,
    input text not null,
    orden int not null,
    nivel int not null,
    ini date not null,
    fin date not null,
    tope boolean DEFAULT 1,
    variable int not null,
    indicador_ int not null,
    cod text not null,
    estado int DEFAULT 1,
    creado datetime not null,
    modificado datetime null,
    usuario int not null,
    ordengen int not null,
    primary key(id),
    FOREIGN key(indicador) REFERENCES indicador(id)
) CREATE TABLE valor (
    id int(11) NOT NULL AUTO_INCREMENT,
    valor int(11) DEFAULT 0,
    fecha date DEFAULT NULL,
    hora time DEFAULT NULL,
    gestion int(11) NOT NULL,
    mes int(11) NOT NULL,
    usuario int(11) NOT NULL,
    input int(11) NOT NULL,
    cod text not null,
    indicador int not null,
    variable int not null,
    establecimiento int(11) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (gestion) REFERENCES gestion (id),
    FOREIGN KEY (mes) REFERENCES mes (id),
    FOREIGN KEY (usuario) REFERENCES usuario (id),
    FOREIGN KEY (input) REFERENCES input (id),
    FOREIGN KEY (establecimiento) REFERENCES establecimiento (id)
) create table cabeceras(
    id int AUTO_INCREMENT,
    variable int not null,
    nivel int not null,
    idinput int null,
    input text not null,
    tope int not null,
    orden int not null,
    primary key (id),
    FOREIGN key(variable) REFERENCES variable(id)
)
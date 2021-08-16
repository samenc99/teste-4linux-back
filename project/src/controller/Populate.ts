import {Request, Response} from "express";
import Database from "../data/Database";

const populate= async (req: Request, res: Response): Promise<any> => {
  try {
    await Database.connection.raw(`
      create table if not exists consultores(
        id int primary key not null auto_increment,
        nome varchar(255) not null ,
        email varchar(255) not null
      );
      create table if not exists servicos(
        id int primary key not null auto_increment,
        descricao text not null
      );
      create table if not exists rel_servico_consultor(
        id_servico int not null,
        id_consultor int not null ,
        foreign key (id_consultor) references consultores(id),
        foreign key (id_servico) references servicos(id),
        Constraint pk_servico_consultor primary key (id_servico, id_consultor)
      );
      create table if not exists agendamento(
        id int primary key not null auto_increment,
        data date not null ,
        id_consultor int not null ,
        id_servico int not null ,
        foreign key (id_servico) references servicos(id),
        foreign key (id_consultor) references consultores(id),
        email_cliente varchar(255) not null,
        Constraint servico_consultor unique (id_consultor, data)
      );
      insert into consultores(nome, email) values('Samuel', 'samuel@gmail.com'),
                                                  ('Vitoria', 'vitoria@gmail.com'),
                                                  ('4linux', '4linux@gmail.com');
      insert into servicos(descricao) values('Desenvolvimento de Landing Page'),
                                             ('Customização de CSS'),
                                             ('Instalação de Wordpress'),
                                             ('Desenvolvimento de Plugin'),
                                             ('Desenvolvimento de Tema');
      insert into rel_servico_consultor(id_consultor,id_servico) values(1,4),
                                                                        (1,5),
                                                                        (2,1),
                                                                        (3,2)
    `);
    res.status(201).send({message:'Base de dados criada.'})
  } catch (err) {
    res.status(500).send({message: err.message || err.sqlMessage})
  }
}

export default populate
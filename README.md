<!-- markdownlint-disable MD024 -->
# Clean Code e Clean Architecture - Branas.io

Este conteúdo é parte do curso Clean Code e Clean Architecture da Branas.io. Este repositório é um fork do [repositório original](https://github.com/rodrigobranas/cccat17_1) do curso, sendo aprimorado e refatorado a cada módulo.

## Módulo 1 - Clean Code | Refactoring | TDD - ✅

Utilizando as técnicas de refactoring que vimos na aula, refatore o código do UC1 - Signup, disponível em:
<https://github.com/rodrigobranas/cccat17_1/blob/master/src/signup.ts>

### UC1 - Signup

Ator: Passageiro, Motorista
Input: name, email, cpf, carPlate, password, isPassenger, isDriver
Output: account_id

* deve verificar se o email já existe e lançar um erro caso já exista
* deve gerar o account_id (uuid)
* deve validar o nome, email e cpf
* deve apenas salvar a senha, por enquanto em claro

Para testar adequadamente o UC1 será necessário criar o UC2 - GetAccount.

### UC2 - GetAccount

Input: account_id
Output: todas as informações da conta

Observações:

Crie uma API REST para interagir com os use cases criados por meio do protocolo HTTP e não se esqueça de também criar testes para a API.
O modelo de dados está disponível em <https://github.com/rodrigobranas/cccat17_1/blob/master/create.sql>

## Módulo 2 - Hexagonal Architecture | Tests Patterns (Tests Doubles) - ❌

### UC3 - Solicitar corrida

Ator: Passageiro
Input: passenger_id (account_id), from (lat, long), to (lat, long)
Output: ride_id

#### Regras

* deve verificar se o account_id tem is_passenger true
* deve verificar se já não existe uma corrida do passageiro em status diferente de "completed", se existir lançar um erro
* deve gerar o ride_id (uuid)
* deve definir o status como "requested"
* deve definir date com a data atual

### UC4 - GetRide

Input: ride_id
Output: todos as informações da ride juntamente com os dados do passageiro e do motorista (inicialmente null, definido após o use case de AcceptRide)

Considere o modelo de dados:

```sql
create table cccat16.ride (
  ride_id uuid,
  passenger_id uuid,
  driver_id uuid,
  status text,
  fare numeric,
  distance numeric,
  from_lat numeric,
  from_long numeric,
  to_lat numeric,
  to_long numeric,
  date timestamp
);
```

## Módulo 3 - Clean Architecture - ❌

### UC5 - AcceptRide

**Ator**: Motorista
**Input**: ride_id, driver_id (account_id)
**Output**: void

#### Regras

* deve verificar se o account_id tem is_driver true
* deve verificar se o status da corrida é "requested", se não for, lançar um erro
* deve verificar se o motorista já tem outra corrida com status "accepted" ou "in_progress", se tiver lançar um erro
* deve associar o driver_id na corrida
* deve mudar o status para "accepted"

### UC6 - StartRide

Ator: Motorista
Input: ride_id
Output: void

#### Regras

* Deve verificar se a corrida está em status "accepted", se não estiver lançar um erro
* Deve modificar o status da corrida para "in_progress"

### UC7 - UpdatePosition

Ator: Sistema
Input: ride_id, lat, long
Output: void

* Deve verificar se a corrida está em status "in_progress", se não estiver lançar um erro
* Deve gerar o position_id
* Deve salvar na tabela position: position_id, ride_id, lat, long e date

Considere o modelo de dados:

```sql
create table cccat17.position (
  position_id uuid,
  ride_id uuid,
  lat numeric,
  long numeric,
  date timestamp
);
```

## Módulo 4 - Transaction Script x Domain Model | Domain-Driven Design (Tactical Design) - ❌

### UC8 - FinishRide

Ator: Motorista
Input: ride_id
Output: void

#### Regras

* Deve verificar se a corrida está em status "in_progress", se não estiver lançar um erro
* Deve obter todas as positions e calcular a distância entre cada uma delas, para isso utilize um algoritmo que receba duas coordenadas (lat, long) e retorne a distância entre elas em km.
* Com a distância total calculada, calcule o valor da corrida (fare) multiplicando a distância por 2,1
* Atualizar a corrida com o status "completed", a distância e o valor da corrida (fare)

### UC9 - ProcessPayment

Ator: Sistema
Input: rideId, creditCardToken, amount
Output: void

#### Regras

* Deve simular o comportamento de um gateway de pagamento, sendo chamado a partir do use case FinishRide e fazendo o processamento do pagamento com base no cartão de crédito do passageiro
* O status deve ser sempre success

## Módulo 5 - Domain-Driven Design (Strategic Design) | Microservices | SOLID p.1 - ❌

### UC7 - ProcessPayment

Ator: Sistema
Input: rideId, amount
Output: void

#### Regras

* Deve simular o comportamento de um gateway de pagamento, sendo chamado a partir do use case FinishRide e fazendo o processamento do pagamento com base no cartão de crédito do passageiro
* O status deve ser sempre success
* Deve persistir na tabela transaction

Considere o modelo de dados:

```sql
create table cccat16.transaction (
  transaction_id uuid primary key,
  ride_id uuid,
  amount numeric,
  date timestamp,
  status text
);
```

Considere separar 3 microservices: *account*, *ride* e *payment* e faça a integração entre eles utilizando o protocolo HTTP

Chegou a hora de aplicar a modelagem estratégica e separar o domínio em 3 bounded contexts diferentes: **Ride**, **Account** e **Payment**.

Copie o projeto em backend/ride em backend/ride, backend/account e backend/payment, fazendo com que a relação entre eles aconteça por meio de requisições HTTP.

## Módulo 6 - SOLID p.2 | Event-Driven Architecture - ❌

## Módulo 7 - ORM + Repository | ACL + Gateway | CQRS | Mediator & Observer Patterns - ⌛

## Módulo 8 - Front-end w/ TDD, Clean Architecture & Design Patterns - ⌛

---
Para mais informações acesse: <https://branas.io/>

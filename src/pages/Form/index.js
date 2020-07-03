import React, { useState } from "react";
import {useHistory } from "react-router-dom";

import api from "../../services/api";

import "./styles.css";

import calculatorImg from "../../assets/calculatorImg.svg";

export default function Logon() {
  const [cpf, setCpf] = useState("");
  const [uf, setUf] = useState("");
  const [birth, setBirth] = useState("");
  const [requestedAmount, setRequestedAmount] = useState("");
  const [deadlinesMonths, setDeadlinesMonths] = useState("");
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post("/", {
        cpf,
        uf,
        birth,
        requestedAmount,
        deadlinesMonths,
      });

      localStorage.setItem("cpf", response.cpf);
      localStorage.setItem("uf", response.uf);
      localStorage.setItem("birth", response.birth);
      localStorage.setItem("requestedAmount", response.requestedAmount)
      localStorage.setItem("taxPerMonth", response.taxPerMonth);
      localStorage.setItem("totalPayable", response.totalPayable);
      localStorage.setItem("plots", response.plots);

      history.push("/loan-simulation");
    } catch (err) {
      alert("Falha ao simular, tente novamente");
    }
  }

  return (
    <div className="form-container">
      <div className="header">
        <h1>SIMULE E SOLICITE SEU EMPRÉSTIMO</h1>
        <img src={calculatorImg} alt="homeimage" />
      </div>

      <section className="form">
        <form onSubmit={handleLogin}>
          <h2>PREENCHA O FORMULÁRIO PARA SIMULAÇÃO</h2>

          <input
            placeholder="CPF"
            value={cpf}
            type="text"
            onChange={(e) => setCpf(e.target.value)}
          />
          <input
            placeholder="UF"
            value={uf}
            type="text"
            onChange={(e) => setUf(e.target.value)}
          />
          <input
            className="date"
            placeholder="DATA DE NASCIMENTO: DD/MM/AAAA"
            // type="date"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
          />
          <input
            placeholder="VALOR REQUERIDO"
            value={requestedAmount}
            type="number"
            onChange={(e) => setRequestedAmount(e.target.value)}
          />
          <input
            placeholder="MESES PARA PAGAR"
            value={deadlinesMonths}
            type="number"
            onChange={(e) => setDeadlinesMonths(e.target.value)}
          />

          <button className="button" type="submit">
            SIMULAR
          </button>
        </form>
      </section>
    </div>
  );
}

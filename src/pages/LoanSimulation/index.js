import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import api from "../../services/api";

import "./styles.css";

export default function Logon() {
  const userLoan = localStorage.getItem("userLoan");

  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();
    const cpf = localStorage.getItem("cpf");
    const uf = localStorage.getItem("uf");
    const birth = localStorage.getItem("birth");
    const requestedAmount = localStorage.getItem("requestedAmount");
    const taxPerMonth = localStorage.getItem("taxPerMonth");
    const totalPayable = localStorage.getItem("totalPayable");
    const plots = localStorage.getItem("plots");

    try {
      history.push("/loan-simulation");
    } catch (err) {
      alert("Falha ao simular, tente novamente");
    }
  }

  return (
    <div className="simulation-container">
      <div className="header">
        <h1>VEJA A SIMULAÇÃO PARA O SEU EMPRÉSTIMO ANTES DE EFETIVAR</h1>
      </div>

      <section className="form">
        <form onSubmit={handleLogin}>
          <div className="form-header">
            <div className="item">
              <h2>VALOR REQUERIDO</h2>
              <p>R$100.000,00</p>
            </div>
            <div className="item">
              <h2>TAXA DE JUROS</h2>
              <p>1%</p>
            </div>
          </div>

          <div className="item">
            <h2>PAGAR EM</h2>
            <p>3 Meses</p>
          </div>

          <div className="item">
            <h2>PROJEÇÃO DAS PARCELAS</h2>
            <div className="plots">
              <p>20/07/2020</p>
              <p>R$ 34.004,46</p>
            </div>
            <div className="plots">
              <p>20/08/2020</p>
              <p>R$ 34.004,46</p>
            </div>
            <div className="plots">
              <p>20/09/2020</p>
              <p>R$ 34.004,46</p>
            </div>
            <div className="total">
              <p>TOTAL</p>
              <p>R$ 102.013,37</p>
            </div>
          </div>

          <button className="button" type="submit">
            EFETIVAR EMPRÉSTIMO
          </button>
        </form>
      </section>
    </div>
  );
}

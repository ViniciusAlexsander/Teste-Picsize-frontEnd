import React from "react";
import { useHistory } from "react-router-dom";
import { formatPrice } from "../../lib/utils";

import api from "../../services/api";

import "./styles.css";

export default function LoanSimulation() {
  const cpf = localStorage.getItem("cpf");
  const uf = localStorage.getItem("uf");
  const birth = localStorage.getItem("birth");
  const deadlinesMonths = localStorage.getItem("deadlinesMonths");
  let requestedAmount = localStorage.getItem("requestedAmount");
  const taxPerMonth = localStorage.getItem("taxPerMonth");
  let totalPayable = localStorage.getItem("totalPayable");

  const json = localStorage.getItem("plots");
  const plots = JSON.parse(json);

  const data = {
    cpf,
    uf,
    birth,
    deadlinesMonths,
    requestedAmount,
    taxPerMonth,
    totalPayable,
    plots,
  };

  requestedAmount = formatPrice(requestedAmount);
  totalPayable = formatPrice(totalPayable);

  async function handleSimulation(e) {
    e.preventDefault();

    try {
      await api.post("loans", data);
      alert(`Simulação concluida com sucesso`);
    } catch (err) {
      console.log(err)
      alert("Falha ao simular, tente novamente");
    }
  }

  return (
    <div className="simulation-container">
      <div className="header">
        <h1>VEJA A SIMULAÇÃO PARA O SEU EMPRÉSTIMO ANTES DE EFETIVAR</h1>
      </div>

      <section className="form">
        <form onSubmit={handleSimulation}>
          <div className="form-header">
            <div className="item">
              <h2>VALOR REQUERIDO</h2>
              <p>{requestedAmount}</p>
            </div>
            <div className="item">
              <h2>TAXA DE JUROS</h2>
              <p>{taxPerMonth}%</p>
            </div>
          </div>

          <div className="item">
            <h2>PAGAR EM</h2>
            <p>{deadlinesMonths} Meses</p>
          </div>

          <div className="item">
            <h2>PROJEÇÃO DAS PARCELAS</h2>

            {plots.map((plot) => (
              <div className="plots">
                <p>{plot.installmentMaturity}</p>
                <p>{plot.installmentValue}</p>
              </div>
            ))}

            <div className="total">
              <p>TOTAL</p>
              <p>{totalPayable}</p>
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

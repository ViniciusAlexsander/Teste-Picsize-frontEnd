import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { updateDataLoan } from "../Store";
import { date, formatPrice } from "../../lib/utils";

import api from "../../services/api";

import "./styles.css";

import calculatorImg from "../../assets/calculatorImg.svg";

function Form() {
  const [cpf, setCpf] = useState("");
  const [uf, setUf] = useState("");
  const [birth, setBirth] = useState("");
  const [requestedAmount, setRequestedAmount] = useState("");
  const [deadlinesMonths, setDeadlinesMonths] = useState("");


  const history = useHistory();

  async function handleForm(e) {
    e.preventDefault();
    const userLoan = { cpf, uf, birth, requestedAmount, deadlinesMonths };

    try {
      const response = await api.post("form", userLoan);
      

      localStorage.setItem("cpf", response.data.cpf);
      localStorage.setItem("uf", response.data.uf);
      localStorage.setItem("birth", response.data.birth);
      localStorage.setItem("deadlinesMonths", response.data.deadlinesMonths);
      localStorage.setItem("requestedAmount", response.data.requestedAmount);
      localStorage.setItem("taxPerMonth", response.data.taxPerMonth);
      localStorage.setItem("totalPayable", response.data.totalPayable);
      
      const plots = JSON.stringify(response.data.plots)
      localStorage.setItem("plots", plots);

      updateDataLoan(response.data);

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
        <form onSubmit={handleForm}>
          <h2>PREENCHA O FORMULÁRIO PARA SIMULAÇÃO</h2>

          <input
            placeholder="CPF"
            value={cpf}
            type="text"
            onChange={(e) => setCpf(e.target.value)}
            required
          />
          <input
            placeholder="UF"
            value={uf}
            type="text"
            onChange={(e) => setUf(e.target.value)}
            required
          />
          <input
            className="date"
            placeholder="DATA DE NASCIMENTO: DD/MM/AAAA"
            type="date"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
            required
          />
          <input
            placeholder="VALOR REQUERIDO"
            value={requestedAmount}
            type="number"
            onChange={(e) => setRequestedAmount(e.target.value)}
            required
          />
          <input
            placeholder="MESES PARA PAGAR"
            value={deadlinesMonths}
            type="number"
            onChange={(e) => setDeadlinesMonths(e.target.value)}
            required
          />

          <button className="button" type="submit">
            SIMULAR
          </button>
        </form>
      </section>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return { updateDataLoan: (dataLoan) => dispatch(updateDataLoan(dataLoan)) };
};

export default connect(mapDispatchToProps)(Form);

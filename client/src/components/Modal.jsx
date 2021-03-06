import React from 'react';

const modal = props => (
  <div className={props.className}>
    <header className="modal__header"><h1>{props.title}</h1></header>
    <section className="modal__content">
      {props.children}
    </section>
    <section className="modal__actions">
      {props.canCancel && <button id="modal-button" className="btn" onClick={props.onCancel}>X</button> }
    </section>
  </div>
);

export default modal;
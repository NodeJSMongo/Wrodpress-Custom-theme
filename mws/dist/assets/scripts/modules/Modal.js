import $ from 'jquery';
class Modal {
  constructor() {
    this.openModalButton = $(".open-modal");
    this.modal = $(".modal_custom");
    this.closeModalButton =$(".modal_custom__close");

    this.events();
  }

  events(){
    //clicking the open modal button
    this.openModalButton.click(this.openModal.bind(this));
    //clicking the x close modal button
    this.closeModalButton.click(this.closeModal.bind(this));
    //pushes the escape key
    $(document).keyup(this.keyPressHandler.bind(this));
  }

  keyPressHandler(e){
    if(e.keyCode == 27){
      this.closeModal();
    }
  }
  openModal(){
    this.modal.addClass("modal_custom--is-visible");
    return false;
  }

  closeModal(){
    this.modal.removeClass("modal_custom--is-visible");
  }
}

export default Modal;

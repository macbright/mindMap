export function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

export function listenForOutsideClicks(listening, setListening, menuRef, setIsOpen) {
    return () => {
      if (listening) return;
      if (!menuRef.current) return;
      setListening(true);
      [`click`, `touchstart`].forEach(() => {
        document.addEventListener(`click`, (evt) => {
          if (menuRef.current?.contains(evt.target)) return;
          setIsOpen(false);
        });
      });
    }
  }
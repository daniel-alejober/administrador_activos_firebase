export const uid = () => {
  const head = Date.now().toString(36);
  const tail = Math.random().toString(36).substring(2);

  return head + tail;
};

capitalize(str) {
      const lower = str.toLowerCase()
      return str.charAt(0).toUpperCase() + lower.slice(1)
    },
      
      async getEntriesByTerm(id) {
      if (id === 1) {
        if (
          this.txtSearch.toLocaleLowerCase() === '' &&
          this.statusIdSelected === -1
        ) {
          await this.getAllOts()
        } else {
          this.dataOts = this.dataOts.filter((entry) =>
            entry.otActivity
              .toLowerCase()
              .includes(this.txtSearch.toLocaleLowerCase())
          )

        }
      }
    },

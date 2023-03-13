export class Tools {
    static transformMonth(month: number) {
        switch (month) {
            case 1:
                return "Enero";
            case 2:
                return "Febrero";
            case 3:
                return "Marzo";
            case 4:
                return "Abril";
            case 5:
                return "Mayo";
            case 6:
                return "Junio";
            case 7:
                return "Julio";
            case 8:
                return "Agosto";
            case 9:
                return "Septiembre";
            case 10:
                return "Octubre";
            case 11:
                return "Noviembre";
            case 12:
                return "Diciembre";
                
    }
  }

  static transformMonthShort(month: number) {
    switch (month) {
        case 1:
            return "Ene";
        case 2:
            return "Feb";
        case 3:
            return "Mar";
        case 4:
            return "Abr";
        case 5:
            return "May";
        case 6:
            return "Jun";
        case 7:
            return "Jul";
        case 8:
            return "Ago";
        case 9:
            return "Sep";
        case 10:
            return "Oct";
        case 11:
            return "Nov";
        case 12:
            return "Dic";
            
    }
  }

  static transformMonthNumber(month: string) {
    switch (month) {
        case "Enero":
            return 1;
        case "Febrero":
            return 2;
        case "Marzo":
            return 3;
        case "Abril":
            return 4;
        case "Mayo":
            return 5;
        case "Junio":
            return 6;
        case "Julio":
            return 7;
        case "Agosto":
            return 8;
        case "Septiembre":
            return 9;
        case "Octubre":
            return 10;
        case "Noviembre":
            return 11;
        case "Diciembre":
            return 12;
            
    }
  }
}
// const HOST = "server.com/";

// // Server

// const endpoints = {
//   "/": {
//     "get": "hello world",
//   }
// };

// const getFunc = ( url, data, cb ) => {
//   const domain = url.substring( 0, url.indexOf( "/" ) );
//   const endpoint = url.substring( url.indexOf( "/" ), url.length );

//   cb && cb( endpoints[endpoint]["get"] );
// }

// const api = {
//   get: getFunc,
// }

// const displayText = res => {
//   document.body.innerHTML += res;
// };

// document.onclick = () => {
//   api.get( HOST, {}, displayText );
// }

// SERVER-SIDE

const HOST = "server.com/";

const populateCategories = category => {
  const actveMenuItemName = activeItem.children[0].innerHTML;
  api.get( HOST + "categories", { category, menuItem: actveMenuItemName }, categories => {
    let newCategories = "";
    for ( const category of categories ) {
      newCategories += `
        <li class="menu__sub__categories__item">
          <a href="#" class="menu__sub__categories__item__link">${category}</a>
        </li>
      `;
    }
    const categoriesEle = document.getElementsByClassName( `menu__sub__categories__items--${category}` )[0];
    categoriesEle.innerHTML = newCategories;
  } );
};

const getCategories = data => {
  const result = [];
  switch ( data.category ) {
    case "top":
      switch ( data.menuItem ) {
        case "Fashion":
          result.push( "Jacket", "Jeans", "Scarf", "T-shirt", "Carg0 pants" );
          break;
        case "Motors":
          result.push( "Car", "Motorcycle", "Plane", "Trucks", "Wheels" );
          break;
        default:
          result.push( "Server apple", "Server banana", "Server pear", "Server orange" );
          break;
      }
      break;
    case "additional":
      switch ( data.menuItem ) {
        case "Fashion":
          result.push( "Shoe lace", "Buttons", "Belt" );
          break;
        case "Motors":
          result.push( "Tires", "Windshields", "Ski racks", "Doors", "Windows" );
          break;
        default:
          result.push( "Server apple", "Server banana", "Server pear", "Server orange" );
          break;
      }
      break;
    default:
      break;
  }
  return result;
};

const endpoints = {
  "/categories": {
    "get": getCategories,
  }
};

const getFunc = ( url, data, cb ) => {
  const domain = url.substring( 0, url.indexOf( "/" ) );
  const endpoint = url.substring( url.indexOf( "/" ), url.length );

  cb( endpoints[endpoint]["get"]( data ) );
};

const api = {
  get: getFunc,
};

// CLIENT-SIDE

let activeItem = null;

const showSubMenu = () => {
  const subMenu = document.getElementsByClassName( "menu__sub" )[0];
  subMenu.style.display = "flex";

  populateCategories( "top" );
  populateCategories( "additional" );
}

const hideSubMenu = () => {
  const subMenu = document.getElementsByClassName( "menu__sub" )[0];
  subMenu.style.display = "none";
  if ( activeItem ) {
    activeItem.classList.remove( "menu__main__item--active" );
    activeItem = null;
  }
}

const onMenuItemMouseEnter = item => {
  if ( activeItem ) {
    activeItem.classList.remove( "menu__main__item--active" );  
  }
  activeItem = item;
  activeItem.classList.add( "menu__main__item--active" );
  showSubMenu();
}

const menuItems = document.getElementsByClassName( "menu__main__item" );
for ( const menuItem of menuItems ) {
  menuItem.onmouseenter = () => onMenuItemMouseEnter( menuItem );
}

const menu = document.getElementsByClassName( "menu" )[0];
menu.onmouseleave = hideSubMenu;
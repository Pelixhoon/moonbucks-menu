// step1 요구사항 구현을 위한 전략
// - TODO 메뉴 추가
// - [O] 메뉴 이름을 추가받고, 확인 버튼을 클릭하면 추가된다.
// - [O] 메뉴 이름을 추가받고, 엔터를 누르면 추가된다.
// - [O] 추가되는 메뉴의 아래 마크업은 <ul id="espresso-menu-list" class="mt-3 pl-0"></ul> 안에 삽입해야 한다.
// - [O] 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
// - [O] 사용자 입력값이 빈 값이라면 추가되지 않는다.
// - [O] 총 메뉴 갯수를 count하여 상단에 보여준다.

// - TODO 메뉴 수정
// - [O] 수정할 메뉴를 입력하고, 수정 버튼을 눌러 메뉴 이름을 수정한다.
// - [O] 메뉴 수정시 브라우저에서 제공하는 prompt 인터페이스를 활용한다.

// TODO 메뉴 삭제
// - [O] 메뉴 삭제 버튼을 이용하여 메뉴 삭제할 수 있다.
// - [O] 메뉴 삭제시 브라우저에서 제공하는 confirm 인터페이스를 활용한다.

const $ = (selector) => document.querySelector(selector);

function App() {
  // Menu 총 갯수를 업데이트해주는 함수
  const UpdateMenuCount = () => {
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount} 개`;
  };

  // 메뉴명을 입력해주는 함수
  const addMenuName = () => {
    if ($("#espresso-menu-name").value === "") {
      alert("값을 입력해주세요");
      return;
    }
    const espressoMenuName = $("#espresso-menu-name").value;
    const menuItemTemplate = (espressoMenuName) => {
      return `
            <li class="menu-list-item d-flex items-center py-2">
                <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
                <button
                    type="button"
                    class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
                >
                    수정
                </button>
                <button
                    type="button"
                    class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
                >
                    삭제
                </button>
                </li>`;
    };

    // const 변수 = li 갯수를 카운팅해서 저장해줌
    UpdateMenuCount();
    $("#espresso-menu-name").value = "";

    // 메뉴명이 아래로 쭉 정렬되게 해줌
    $("#espresso-menu-list").insertAdjacentHTML(
      "beforeEnd",
      menuItemTemplate(espressoMenuName)
    ); // innerHTML을 사용하면 계속해서 덮어써짐. insertAdjacentHTML을 사용해야
  };

  const updateMenuName = (e) => {
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    const updatedMenuName = prompt("메뉴명을 수정하세요", $menuName.innerText);
    $menuName.innerText = updatedMenuName;
  };

  const removeMenuName = (e) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      e.target.closest("li").remove();
      UpdateMenuCount();
    }
  };

  //메뉴명 수정 및 삭제
  $("#espresso-menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      updateMenuName(e);
    }

    if (e.target.classList.contains("menu-remove-button")) {
      removeMenuName(e);
    }
  });

  // form태그가 자동으로 전송되는 것을 막아준다.
  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  $("#espresso-menu-submit-button").addEventListener("click", addMenuName);

  // 메뉴의 이름을 입력받는건 엔터키만!
  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key !== "Enter") {
      return;
    }
    addMenuName();
  });
}

App();

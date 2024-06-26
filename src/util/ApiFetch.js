import { URL_BASE } from "../App";

export class ApiFetch {
  constructor() {}

  async delete(basePath, isRemoveUser) {
    let info = {
      message: "",
      removed: false,
    };

    const token = localStorage.getItem("token");

    if (!token) {
      info.message = "Token inválido";
      return info;
    }

    const response = await fetch(`${URL_BASE}${basePath}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      info.message = "Erro do servidor";
      return info;
    }

    if (isRemoveUser) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    info = { ...info, message: "OK", removed: true };

    return { ...info };
  }

  async patch(basePath, data) {
    let info = {
      message: "",
      success: false,
    };

    const token = localStorage.getItem("token");

    if (!token) {
      info.message = "Token inválido";
      return info;
    }

    const response = await fetch(`${URL_BASE}${basePath}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      info.message = "Erro ao atualizar. Tente novamente!";
      return info;
    }

    info = { ...info, message: "OK", success: true };

    return { ...info };
  }

  async getPages(basePath, messageNotFound) {
    let info = {
      message: "",
      success: false,
      data: [],
      totalPages: 0,
    };

    const token = localStorage.getItem("token");

    let response;

    if (token) {
      response = await fetch(`${URL_BASE}${basePath}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      response = await fetch(`${URL_BASE}${basePath}`);
    }

    if ([403, 500].includes(response.status)) {
      info.message = "Erro ao buscar dados. Tente novamente!";
      return info;
    }

    if (response.status === 404) {
      info.message = messageNotFound;
      return info;
    }

    const responseJson = await response.json();
    const responsePage = responseJson.content;
    const totalPages = responseJson.totalPages;

    info = {
      ...info,
      message: "OK",
      success: true,
      data: responsePage,
      totalPages: totalPages,
    };

    return { ...info };
  }

  async postResponse(basePath) {
    let info = {
      message: "",
      success: false,
    };

    const token = localStorage.getItem("token");

    if (!token) {
      info.message = "Token inválido";
      return info;
    }

    const response = await fetch(`${URL_BASE}${basePath}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if ([403, 500].includes(response.status)) {
      info.message = "Erro ao cadastrar resposta!";
      return info;
    }

    info = { ...info, message: "OK", success: true };

    return { ...info };
  }

  async post(basePath, postData) {
    let info = {
      message: "",
      success: false,
      data: {}
    };

    const token = localStorage.getItem("token");

    if (!token) {
      info.message = "Token inválido";
      return info;
    }

    const response = await fetch(`${URL_BASE}${basePath}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(postData)
    });

    if ([403, 500].includes(response.status)) {
      info.message = "Erro ao cadastrar pontuação!";
      return info;
    }

    info = { ...info, message: "OK", success: true};

    return { ...info };
  }

  async get(basePath, messageNotFound) {
    let info = {
      message: "",
      success: false,
      data: [],
    };

    const token = localStorage.getItem("token");

    const response = await fetch(`${URL_BASE}${basePath}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })

    if ([403, 500].includes(response.status)) {
      info.message = "Erro ao buscar dados. Tente novamente!";
      return info;
    }

    if (response.status === 404) {
      info.message = messageNotFound;
      return info;
    }

    const responseJson = await response.json();

    info = {
      ...info,
      message: "OK",
      success: true,
      data: responseJson,
    };

    return { ...info };
  }
  
}

const API_URL = import.meta.env.VITE_API_URL;

export const participarSorteio = async (dadosParticipante) => {
  try {
    const response = await fetch(`${API_URL}/participar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosParticipante),
    });

    // 1. Lemos o JSON uma única vez aqui
    const data = await response.json();

    // 2. Verificamos se a resposta foi erro (400, 422, 500, etc)
    if (!response.ok) {
      // O FastAPI envia o erro em 'detail'. 
      // Se for um erro de validação (422), 'detail' pode ser uma lista, 
      // por isso tratamos para retornar sempre uma string.
      const msg = typeof data.detail === 'string' 
        ? data.detail 
        : 'Dados inválidos ou duplicados';
        
      throw new Error(msg);
    }

    // 3. Se chegou aqui, é sucesso. Retornamos os dados já lidos.
    return data;

  } catch (error) {
    // Esse throw repassa o erro (com a mensagem do detail) para o seu componente
    throw error;
  }
};
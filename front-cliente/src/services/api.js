const API_URL = import.meta.env.VITE_API_URL; // Ajuste para a URL do seu backend FastAPI

export const participarSorteio = async (dadosParticipante) => {
  try {
    const response = await fetch(`${API_URL}/participar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosParticipante),
    });

    // Se o backend retornar erro (como CPF duplicado), capturamos aqui
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Erro ao realizar cadastro');
    }

    return await response.json(); // Retorna o objeto Participante completo
  } catch (error) {
    throw error;
  }
};
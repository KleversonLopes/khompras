export default function Libs() {}


/**
 *  Função auxiliar para preparar a string para o parseFloat 
 */
export function parseLocalFloat(text: string) {
    // 1. Substitui TODAS as vírgulas por pontos
    const cleanText = text.replace(/,/g, '.');

    // 2. Garante que só há um ponto decimal (opcional: remove pontos extras se houver)
    // Para simplificar, vamos assumir que a substituição de vírgula é suficiente.
    // 3. Converte para número. Se a string for vazia ou inválida, retorna 0.
    return parseFloat(cleanText) || 0;
};


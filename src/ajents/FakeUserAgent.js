import { Agent, Tool } from 'ajent';

export class FakeUserAgent extends Agent {
    constructor() {
        super("user_info_agent", "Agente para fornecer informações de cadastro de um usuário com base no CPF");

        this.addTool(new Tool(
            'carregar_usuario',
            "Carrega as informações do usuário com base no CPF fornecido como parâmetro. A tool function espera cpf como string')",
            this.carregarUsuario
        ));
    }

    instruction = () => {
        if (!this.context['cpf']) {
            return `
                A função deste agente é auxiliar com os dados de cadastro de um usuário. 

                ⚠️ Para que o agente funcione corretamente, é **obrigatório** que o CPF do usuário esteja disponível no contexto (this.context['cpf']).  
                Caso o CPF não esteja presente, **não tente adivinhar dados nem gerar informações genéricas ou fictícias**. Apenas solicite que o CPF do usuário seja informado.

                Quando o CPF estiver disponível, use a ferramenta \`carregar_usuario\` para obter os dados reais simulados do cadastro.

                Todas as respostas deste agente devem ser geradas em **português**.
                `.trim();
        }

        return `CPF disponível: ${this.context['cpf']}. Use a ferramenta 'carregar_usuario' para obter os dados de cadastro.`;
    }

    carregarUsuario(cpf) {
        const usuario = this.getUser(cpf);

        if (!usuario) {
            return `Nenhum usuário encontrado com o CPF ${cpf}.`;
        }

        this.context['cpf'] = cpf;
        this.context['usuario'] = usuario;

        return `
            Usuário carregado com sucesso:
            - Nome: ${usuario.nome}
            - Idade: ${usuario.idade}
            - E-mail: ${usuario.email}
            - Profissão: ${usuario.profissao}
            - Localização: ${usuario.cidade}, ${usuario.estado}
        `.trim();
    }

    // Simula uma busca de usuários
    getUser(cpf) {
        const fakeDabase = {"123.456.789-00": {
                nome: "João da Silva",
                idade: 32,
                email: "joao.silva@example.com",
                profissao: "Desenvolvedor de Software",
                cidade: "São Paulo",
                estado: "SP"
            },
            "987.654.321-00": {
                nome: "Maria Oliveira",
                idade: 29,
                email: "maria.oliveira@example.com",
                profissao: "Designer Gráfico",
                cidade: "Rio de Janeiro",
                estado: "RJ"
            }
        };
        return fakeDabase[cpf] || null;
    }
}


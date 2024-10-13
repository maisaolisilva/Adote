
export default {
    testEnvironment: 'jsdom', // Define o ambiente de testes para o navegador (útil para testar componentes React)
    transform: {
      '^.+\\.tsx?$': 'ts-jest', // Usa ts-jest para lidar com ficheiros TypeScript
    },
    moduleNameMapper: {
      // Mapeia estilos e outros arquivos estáticos que podem causar erros nos testes
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Arquivo de setup
  };
  
  
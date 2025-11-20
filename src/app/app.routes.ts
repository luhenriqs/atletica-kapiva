import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { CadastroAluno } from './pages/cadastro-aluno/cadastro-aluno';
import { CadastroFuncionario } from './pages/cadastro-funcionario/cadastro-funcionario';
import { PainelAluno } from './pages/painel-aluno/painel-aluno';
import { PainelFuncionario } from './pages/painel-funcionario/painel-funcionario';
import { Sobre } from './pages/sobre/sobre';


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'cadastro-aluno', component: CadastroAluno },
  { path: 'cadastro-funcionario', component: CadastroFuncionario },
  { path: 'painel-aluno', component: PainelAluno },
  { path: 'painel-funcionario', component: PainelFuncionario },
  { path: 'sobre', component: Sobre },
];

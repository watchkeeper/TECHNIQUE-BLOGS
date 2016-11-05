"compatible              " be iMproved, required
filetype off                  " required

" ==============================================================================
" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim

" ==============================================================================
" 安装的所有插件
call vundle#begin()
Bundle 'Valloric/YouCompleteMe'

" 必须安装，let Vundle manage Vundle, required
Plugin 'VundleVim/Vundle.vim'

" 来自github

"主题
Plugin 'flazz/vim-colorschemes' 

"底部状态栏
Plugin 'Lokaltog/vim-powerline'

"文件目录
Plugin 'scrooloose/nerdtree'

"快速查找
Plugin 'kien/ctrlp.vim'

"快速注释
Plugin 'scrooloose/nerdcommenter'

"自动补全
Plugin 'Shougo/neocomplcache.vim'

" 来自vim

" non github repos

call vundle#end()            " required

" ==============================================================================
filetype plugin indent on    " required
" To ignore plugin indent changes, instead use:
"filetype plugin on

" ==============================================================================
" vundle命令
" :PluginList       - lists configured plugins
" :PluginInstall    - installs plugins; append `!` to update or just :PluginUpdate
" :PluginSearch foo - searches for foo; append `!` to refresh local cache
" :PluginClean      - confirms removal of unused plugins; append `!` to auto-approve removal

" ==============================================================================
" 组件设置
" flazz/vim-colorschemes,主题设置
colorscheme  codeschool

"NERDTree 插件配置
map <F3> :NERDTreeToggle<CR>
autocmd bufenter * if (winnr("$") == 1 && exists("b:NERDTree") && b:NERDTree.isTabTree()) | q | endif
let NERDTreeShowHidden = 1 "NERDTREE显示隐藏文件 
" ==============================================================================
" vim原生设置
" set rnu "显示相对行号
set nu
syntax on " 打开语法检测

set tabstop=2 "设置tab键长度
set sw=2
set ts=2

set list "设置空格显示为+号
set listchars=trail:+

set foldmethod=syntax "代码折叠
set foldlevelstart=99 "默认不折叠

set cursorline  "设置光标行
set noswapfile "不要生成swap文件
set nobackup
set bufhidden=hide "当buffer被丢弃的时候隐藏它
set guicursor=n-v-c:hor10 "normal下贯标显示为下划线
set expandtab                 "Use space instead of tabs

let mapleader = ","  "设置外部复制粘帖
let g:mapleader = ","
map Y "+y
map P "+p

"noremap ok o<esc> "插入新行

" Change cursor shape between insert and normal mode in iTerm2.app
if $TERM_PROGRAM =~ "iTerm.app"
    let &t_SI = "\<Esc>]50;CursorShape=1\x7" " Vertical bar in insert mode
    let &t_EI = "\<Esc>]50;CursorShape=0\x7" " Block in normal mode
endif

"neocomplcache.vim
let g:neocomplcache_enable_at_startup = 1 "打开vim时自动打开
let g:neocomplcache_force_overwrite_completefunc = 1


"设置error和warning的提示符，如果没有设置，ycm会以syntastic的  
"" g:syntastic_warning_symbol 和 g:syntastic_error_symbol 这两个为准  
let g:ycm_error_symbol='>>'  
let g:ycm_warning_symbol='>*'

"设置跳转的快捷键，可以跳转到definition和declaration  
nnoremap <leader>gc :YcmCompleter GoToDeclaration<CR>  
nnoremap <leader>gf :YcmCompleter GoToDefinition<CR>  
nnoremap <leader>gg :YcmCompleter GoToDefinitionElseDeclaration<CR>  
"nmap <F4> :YcmDiags<CR>  





"设置全局配置文件的路径  
"let g:ycm_global_ycm_extra_conf ='~/.vim/bundle/YouCompleteMe/cpp/ycm/.ycm_extra_conf.py'+
"'~/.vim/bundle/YouCompleteMe/cpp/ycm/.ycm_extra_conf.py'  
"开启基于tag的补全，可以在这之后添加需要的标签路径  
let g:ycm_collect_identifiers_from_tags_files = 1  
"开启语义补全  
let g:ycm_seed_identifiers_with_syntax = 1  
"在接受补全后不分裂出一个窗口显示接受的项  
set completeopt-=preview  
"不显示开启vim时检查ycm_extra_conf文件的信息  
let g:ycm_confirm_extra_conf=0  
"每次重新生成匹配项，禁止缓存匹配项  
let g:ycm_cache_omnifunc=0  
"在注释中也可以补全  
let g:ycm_complete_in_comments=1  
"输入第一个字符就开始补全  
let g:ycm_min_num_of_chars_for_completion=1  
"不查询ultisnips提供的代码模板补全，如果需要，设置成1即可  
let g:ycm_use_ultisnips_completer=0  




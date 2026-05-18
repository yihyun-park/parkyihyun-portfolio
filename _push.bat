@echo off
chcp 65001 > nul
cd /d "C:\Users\마리맘\Downloads\claude\portfolio"

echo ============================================
echo  Portfolio -^> GitHub push
echo ============================================
echo.

git --version
if errorlevel 1 (
  echo [ERROR] git not found in PATH
  pause
  exit /b 1
)

if not exist .git (
  echo [1/5] git init
  git init
  echo [2/5] add remote
  git remote add origin https://github.com/yihyun-park/parkyihyun-portfolio.git
) else (
  echo [1/5] .git exists - skip init
  echo [2/5] ensure remote
  git remote remove origin 2>nul
  git remote add origin https://github.com/yihyun-park/parkyihyun-portfolio.git
)

echo [3/5] stage all
git add -A

echo [4/5] commit
git -c user.email="ihyeonp1103@gmail.com" -c user.name="Park Yihyun" commit -m "Add images folder + full portfolio site"

echo [5/5] push (force, branch main)
git branch -M main
git push -u origin main --force

echo.
echo ============================================
echo  DONE - check above for errors
echo ============================================
pause

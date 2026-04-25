function git-save {
    param([string]$msg = "update: auto-save changes")
    git add -A
    git commit -m $msg
    git push origin main
}
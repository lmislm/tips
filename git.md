## 1.  Failed to connect to github.com port 443:connection timed out

> git config --global http.proxy http://127.0.0.1:1080
 
> git config --global --unset http.proxy

## 2. Git 命令行 获取 Tag

# The command finds the most recent tag that is reachable from a commit.
# If the tag points to the commit, then only the tag is shown.
# Otherwise, it suffixes the tag name with the number of additional commits on top of the tagged object 
# and the abbreviated object name of the most recent commit.
> git describe

# With --abbrev set to 0, the command can be used to find the closest tagname without any suffix:
> git describe --abbrev=0

# other examples
> git describe --abbrev=0 --tags # gets tag from current branch
# gets tags across all branches, not just the current branch
> git describe --tags `git rev-list --tags --max-count=1`

# what about this :

git log --pretty="%h %cD %cn %s"  
it shows someting like :

674cd0d Wed, 20 Nov 2019 12:15:38 +0000 Bob commit message


## 3. 获取commit Id最后提交

> git rev-parse --short=11 HEAD 获取当前分支11位的最后提交（非merge的点）
> git log --branches -1 --pretty=format:"%H" 获取最后的commitId（跨git分支）

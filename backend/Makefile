# Env stuff
.PHONY: build-env
build-env:
	python3 -m venv .venv
	poetry run pip install --upgrade pip
	poetry run poetry install

# Passive linters
.PHONY: black
black:
	poetry run black finances --check

.PHONY: flake8
flake8:
	poetry run flake8 finances

.PHONY: isort
isort:
	poetry run isort finances --profile=black --check

.PHONY: pylint
pylint:
	poetry run pylint finances

.PHONY: mypy
mypy:
	poetry run mypy finances

# Aggresive linters
.PHONY: black!
black!:
	poetry run black finances

.PHONY: isort!
isort!:
	poetry run isort finances --profile=black

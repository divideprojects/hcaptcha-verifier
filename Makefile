test:
	@pre-commit run --all-files

run:
	@uvicorn main:app --reload

clean:
	@pyclean .

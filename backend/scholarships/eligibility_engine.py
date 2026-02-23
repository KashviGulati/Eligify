from .models import Scholarship


def normalize_education(level):
    level = level.lower()

    if any(x in level for x in ["btech", "b.tech", "undergraduate", "ug"]):
        return "undergraduate"

    if any(x in level for x in ["postgraduate", "pg", "mtech", "m.tech"]):
        return "postgraduate"

    if "phd" in level:
        return "phd"

    return level

def check_eligibility(profile, scholarship):
    reasons = []

    weights = {
        "age": 1,
        "income": 2,
        "category": 2,
        "education": 1
    }

    score = 0
    max_score = sum(weights.values())

    # AGE
    if scholarship.min_age is None or scholarship.max_age is None:
        score += weights["age"]
    elif scholarship.min_age <= profile.age <= scholarship.max_age:
        score += weights["age"]
    else:
        reasons.append("Your age is outside the eligible range")

    # INCOME
    if scholarship.min_income is None or scholarship.max_income is None:
        score += weights["income"]
    elif scholarship.min_income <= profile.annual_income <= scholarship.max_income:
        score += weights["income"]
    else:
        reasons.append("Your income exceeds the allowed limit")

    # CATEGORY
    if scholarship.category == "ALL" or scholarship.category == profile.category:
        score += weights["category"]
    else:
        reasons.append("Your category does not match this scheme")

    # EDUCATION
    if scholarship.education_level is None:
        score += weights["education"]
    elif normalize_education(scholarship.education_level) == normalize_education(profile.education_level):
        score += weights["education"]
    else:
        reasons.append("Education criteria not satisfied")

    confidence = int((score / max_score) * 100)

    return {
        "eligible": score == max_score,  # ✅ FIXED
        "confidence": confidence,
        "reasons": reasons,
        "breakdown": {
            "age": "pass" if "Your age is outside the eligible range" not in reasons else "fail",
            "income": "pass" if "Your income exceeds the allowed limit" not in reasons else "fail",
            "category": "pass" if "Your category does not match this scheme" not in reasons else "fail",
            "education": "pass" if "Education criteria not satisfied" not in reasons else "fail",
        }
    }

def get_eligible_scholarships(profile):
    scholarships = Scholarship.objects.all()

    full_matches = []
    partial_matches = []

    for sch in scholarships:
        result = check_eligibility(profile, sch)

        data = {
            "id": sch.id,
            "name": sch.name,
            "ministry": sch.ministry,
            "amount": sch.amount,
            "confidence": result["confidence"],
            "eligible": result["eligible"],
            "reasons": result["reasons"],
            "breakdown": result["breakdown"]
        }

        if result["eligible"]:
            full_matches.append(data)
        else:
            partial_matches.append(data)

    # sort BOTH lists (important)
    full_matches.sort(key=lambda x: x["confidence"], reverse=True)
    partial_matches.sort(key=lambda x: x["confidence"], reverse=True)

    return {
        "summary": {
            "total_schemes": scholarships.count(),
            "full_matches": len(full_matches),
            "partial_matches": len(partial_matches)
        },
        "full_matches": full_matches,
        "partial_matches": partial_matches
    }